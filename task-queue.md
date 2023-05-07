# 背景
- 基于项目中某些场景，需要在不影响主线代码执行的情况下，循环执行额外的任务，比如录屏上传、日志上传等。
# 特性
- 独立于主线代码，后台循环进行
- 支持依赖任务（即A任务执行的条件是B任务已经完成）
- 支持多任务并行
- 支持持久化
# 用法
## UBQueueRunner
### 介绍
  任务执行器，任务循环执行的主体类。内部包含了两个队列：
  - _queue：执行队列
  - _pendingQueue：待执行队列（可以通过调用setReady方法将任务转到执行队列中）

  *任务需要添加到哪个队列中，会根据实例化任务的时候进行判断，具体用法可以见下面的任务类*

  ### 代码
```
export class UBQueueRunner extends UBSerializeable {
	private _stop: boolean;
	private _runCompleted: Promise<void>;
	private _signal: Promise<void>;
	private _setSignal = () => {};
	private _retryInterval = 5000;
	private _queue: UBQueueRunnerTask[] = [];
	private _pendingQueue: UBQueueRunnerTask[] = [];
	private _poolSize = 3;
	private _isLooping = false;
	private _name: string;

	constructor(name: string) {
		super();
		this._name = name;
	}

	get retryInterval() {
		return this._retryInterval;
	}
	set retryInterval(value) {
		this._retryInterval = value;
	}

	async start() {
		if (this._runCompleted) {
			throw new UBError( ... );
		}
		this._stop = false;
		this._signal = new Promise((resolve) => (this._setSignal = resolve));
		this._runCompleted = this.run();
	}

	async stop() {
		if (!this._runCompleted) return;
		this._stop = true;
		this._setSignal();
		await this._runCompleted;
		this._runCompleted = null;
	}

	private activePendingTask(task: UBQueueRunnerTask) {
		const index = this._pendingQueue.indexOf(task);
		this._pendingQueue.splice(index, 1);
		this._queue.push(task);
		this._setSignal();
	}

	add(task: UBQueueRunnerTask) {
		/**
		 * 启动策略：
		 * 1、先加入挂起队列（保证序列化）
		 * 2、ready后
		 *  普通任务：马上从挂起队列移动到执行队列
		 *  依赖任务：依赖完成后，从挂起队列移动到执行队列
		 */
		this._pendingQueue.push(task);
		task.waitReady().then(() => {
			if (task instanceof UBQueueRunnerDependencyTask) {
				task.waitDependencies().then(() => {
					this.activePendingTask(task);
				});
			} else {
				this.activePendingTask(task);
			}
		});
	}

	/**
	 * 清除队列以及监听事件
	 */
	async clear() {
		if (this._runCompleted) {
			throw new UBError( ... );
		}
		this._pendingQueue = [];
		this._queue = [];
		this.removeAllListeners();
	}

	setAllReady() {
		this._pendingQueue.forEach((task) => task.setReady());
	}

	deserialize(o: any) {
		if (this._runCompleted) {
			throw new UBError( ... );
		}
		super.deserialize(o);
		// 反序列化后，需要恢复ready和waitDependencies链
		const allTask = [...this._pendingQueue, ...this._queue];
		const dependencyTasks: any[] = allTask.filter((task) => task instanceof UBQueueRunnerDependencyTask);

		dependencyTasks.forEach((data, idx) => {
			const dependency = data as UBQueueRunnerDependencyTask;
			allTask
				.filter((task) => dependency.dependencyIds.includes(task.id))
				.forEach((task) => dependency.addDependency(task));
		});

		this._pendingQueue.forEach((task) => {
			task.waitReady().then(() => {
				if (task instanceof UBQueueRunnerDependencyTask) {
					task.waitDependencies().then(() => {
						this.activePendingTask(task);
					});
				} else {
					this.activePendingTask(task);
				}
			});
		});
	}

	/**
	 * 任务线自己去抢任务，运行完之后会继续拿剩余的任务
	 */
	async processTask() {
		const innerRun = async (task: UBQueueRunnerTask) => {
			let result = UBQueueRunnerTaskResult.failed;
			try {
				task.run();
				result = await task.waitRun();
			} catch (error) {
				this.emit('error', error);
			}
			switch (result) {
				case UBQueueRunnerTaskResult.success: {
					this.emit('task-success', task);
					break;
				}
				case UBQueueRunnerTaskResult.failed: {
					this.emit('task-failed', task);
					break;
				}
				case UBQueueRunnerTaskResult.retry: {
					task.resetReady();
					this.add(task);
					setTimeout(() => !this._stop && task.setReady(), this._retryInterval);
					this.emit('task-retry', task);
					break;
				}
				default: {
					throw new UBError( ... );
				}
			}
			const data = this.serialize();
			this.emit('store', data);
		};

		let task = this._queue.shift();
		while (task) {
			try {
				await innerRun(task);
			} finally {
				task = this._queue.shift();
			}
		}
	}
	/**
	 * _poolSize代表可以同时开启的任务线数量，每条任务线当前任务跑完之后，都会自动从queue里面取下一个任务
	 * @returns
	 */
	async loop() {
		if (this._isLooping) return;
		this._isLooping = true;
		let i = this._poolSize;
		const promises = [];
		while (i--) promises.push(this.processTask());
		await Promise.all(promises);
		this._isLooping = false;
	}

	private async run() {
		while (!this._stop) {
			if (!this._queue.length) {
				// 当没有任务时不需要一直循环，等有任务进来的时候下面await才会等待通过
				await this._signal;
				this._signal = new Promise((resolve) => (this._setSignal = resolve));
				continue;
			}
			await this.loop();
		}
	}
}
```
### 用法
```
//构造函数接收一个name，用于区分执行器
const runner = new UBQueueRunner('log');
//storePath 持久化文件地址
fs.readFile(storePath, 'utf-8', async (err, data) => {
    let configData;
    try {
        data = data.trim();
        configData = data ? JSON.parse(data) : null;
    } catch (error) { ... }
    
    //反序列化数据
    if (configData) {
        runner.deserialize(configData);
    }
    //设置所有任务进入ready状态（这个操作是为了把上次残留的任务放入到执行队列中）
    runner.setAllReady();
    //保存数据到持久化文件中
    runner.on('store', (data) => {
        fs.writeFileSync(storePath, JSON.stringify(data));
    });
    runner.on('task-failed', (task) => {
        app.logger.error(`runner run a task failed`);
    });
    runner.on('error', (error) => {
        app.logger.error(`${type} queue runner has error`);
        app.logger.error(error);
    });
    runner.start();
});

//添加任务
runner.add(task);

//停止（暂停）执行器
await runner.stop();
//清空执行器的所有数据（包括监听事件）
await runner.clear();
```

## UBQueueRunnerTask
### 介绍
队列中的任务抽象基类，可以通过继承重写doRun方法，实现业务中需要执行的操作。
任务状态如下：
  - unkown：未知（默认状态）
  - pending：待运行，会进入待运行队列，等待状态变为ready
  - ready：准备运行，进入运行队列，排队等待运行
  - retrying：重新运行，添加到队尾，等待下一次运行
  - runing：运行中
  - failed：运行失败
  - success：运行成功
构造函数支持传入isPending和id，均不是必传，isPending默认是false，实例化之后会根据isPending的值（true / false），将任务的状态设置为pending和ready。
### 代码
略
### 用法
```
class UBTestTask extends UBQueueRunnerTask {
    //可以通过重写构造函数或者其他方式，传入需要用到的参数
    constructor(params: object, isPending?: boolean) {
        super(isPending);
    }
   async doRun {
        // rewrite
        // do something specific, such as upload
       if (success) {
           return UBQueueRunnerTaskResult.success
       } else if (failed) {
           return UBQueueRunnerTaskResult.failed
       } else if (retry) {
           return UBQueueRunnerTaskResult.retry
       }
   }
}

const task = new UBTestTask({ name: 'test' });
runner.add(task);
```

## UBQueueRunnerDependencyTask
### 介绍
基于UBQueueRunnerTask的一个扩展类，赋予了支持任务依赖的功能，可以通过addDependency方法添加任务依赖，当任务进入ready状态时，还需要等待依赖任务都完成了才会进入执行队列。
### 代码
略
### 用法
```
class UBTestDependencyTask extends UBQueueRunnerDependencyTask {
    constructor(params?: object, isPending?: boolean) {
        ...
    }
    
    async doRun {
        // rewrite
        // do something specific, such as upload
       if (success) {
           return UBQueueRunnerTaskResult.success
       } else if (failed) {
           return UBQueueRunnerTaskResult.failed
       } else if (retry) {
           return UBQueueRunnerTaskResult.retry
       }
   }
}

const dependencyTask = new UBTestDependencyTask(options, true);
runner.add(dependencyTask);

dependencyTask.addDependency(task1);
dependencyTask.addDependency(task2);
dependencyTask.addDependency(task3);

dependencyTask.setReady();

```