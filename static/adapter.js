/* 
Adapter v3.0.0
手机wap页面retina适配，基于rem,使用方法：设计稿如果是750 不需要更改。如果是其他尺寸的设计稿，改动设计稿的宽度即可。
www.q-ui.cn
2017.07.05
*/
function baseFont(){
	var designWidth = 750;//设计稿宽度,可以自由更改
	var baseNum = designWidth / 100;
	var docEl = document.documentElement;
	
	var dpr = window.devicePixelRatio || 1;
	var scale = 1 / dpr;
	var innerWidth = document.documentElement.getBoundingClientRect().width || window.innerWidth;
	if(innerWidth / dpr > designWidth){innerWidth = designWidth * dpr}//开发模式下电脑端显示750px
	
	if(docEl.className == 'noRetina'){//不需要高清适配的地方不适配（在不需要适配页面的html标签上加 class="noRetina"）
		docEl.style.fontSize =(innerWidth / baseNum)+'px';
	}else{
		docEl.style.fontSize =(innerWidth * dpr / baseNum)+'px';
		docEl.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale='+ scale +',width=device-width,maximum-scale='+ scale +',user-scalable=no');
	}
};
baseFont();