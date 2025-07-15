$(".v-box").on("click",function () {
    var newModal = dialog({
        id: "video9", //给声明的特定的弹框修改个别样式
        title:' ',
        content: $('.video9'), //弹框内容
        width: '1200',  // 弹框中间内容的宽度，不配置会自适应
        height: '400',
        drag: false,
        fixed: true,
        cancelValue: '关闭', //取消按钮的文本名字
        quickClose:  false, //  点击空白处快速关闭
        cancel: function () {  //取消回调，配置了对应的回调函数才会显示对应的按钮。
            videojs("video9").ready(function () {

                this.pause();
            });
        }
    });

    newModal.showModal(); /*点showModal是带固定效果和阴影的展示。*/
    videojs("video9").ready(function () {

        this.play();
    });
});






// /**
//  *  移动轮播效果
//  *  参考index_m.html首页轮播html结构 或者 产品详情页 产品图片轮播效果
//  */
// swiperAlone(".picshow");
if($(".picshow").length){
    swiperAlone(".picshow");
}
// 移动的图片或内容的父级记得添加css样式position:relative;
// boxW01轮播最外层的类名
function swiperAlone(boxW01){
    var detail_ban=$(boxW01+" .picshowList");
    var detail_ban_li=$(boxW01+" .picshowitem");
    var boxW=$(boxW01).width();
    var arrowLeft = $(boxW01+"  .picp");
    var arrowRight = $(boxW01+" .picn");
    var numLi = boxW01+" .picshowControl";
    var len=detail_ban_li.length+1;
    function startMove(){
        var i=0;
        var timer=null;
        detail_ban.css({width:len*boxW+10});//设置ban宽度
        for (var j = 0; j < len-1; j++) {  //创建圆点
            $(numLi).append('<li></li>')
        }
        $(numLi+" li").first().addClass('active'); //给第一个圆点添加样式
        var firstimg=detail_ban_li.first().clone(); //复制第一张图片
        detail_ban.append(firstimg); //将第一张图片放到最后一张图片后，设置ul的宽度为图片张数*图片宽度
        //判断左右滑动切换
        detail_ban.on("touchstart", function(e) {
            startX = e.originalEvent.changedTouches[0].pageX;
        });
        detail_ban.on("touchend", function(e) {
            moveEndX = e.originalEvent.changedTouches[0].pageX;
            
            X = moveEndX - startX;

            if ( X > 0 ) {
                leftMove()
            }
            else if ( X < 0 ) {
                rightMove()
            }

        });

        $(numLi).on("click","li",function (e) {
            e.stopPropagation();
            clearInterval(timer);
            $(this).addClass('active').siblings().removeClass('active');
            i = $(this).index();
            detail_ban.stop().animate({left:-i*boxW},300);
            timer=setInterval(function(){
                autoMove();
            },3500);
        });

        function leftMove(){

            clearInterval(timer);
            i--;
            if (i==-1) {
                i=detail_ban_li.length-1;
                detail_ban.css({left:-(len-1)*boxW});
            }
            detail_ban.stop().animate({left:-i*boxW},300);
            $(numLi+" li").eq(i).addClass('active').siblings().removeClass('active');
            timer=setInterval(function(){
                autoMove();
            },3000);
        }

        function rightMove(){
            clearInterval(timer);
            i++;
            if (i==len) {
                i=1; //这里不是i=0
                detail_ban.css({left:0}); //保证无缝轮播，设置left值
            };
            detail_ban.stop().animate({left:-i*boxW},300);
            if (i==len-1) {   //设置小圆点指示
                $(numLi+" li").eq(0).addClass('active').siblings().removeClass('active');
            }else{
                $(numLi+" li").eq(i).addClass('active').siblings().removeClass('active');
            }
            timer=setInterval(function(){
                autoMove();
            },3000);
        }


        $(arrowLeft).on("click",function (event) {
            event.stopPropagation();
            leftMove()
        });
        $(arrowRight).on("click",function (event) {
            event.stopPropagation();
            rightMove()

        });


        //定时器自动播放
        timer=setInterval(function(){
            autoMove();
        },2500);
        function autoMove(){
            i++;
            if (i==len) {
                i=1;
                detail_ban.css({left:0});
            };
            detail_ban.stop().animate({left:-i*boxW},300);
            if (i==len-1) {
                $(numLi+" li").eq(0).addClass('active').siblings().removeClass('active');
            }else{
                $(numLi+" li").eq(i).addClass('active').siblings().removeClass('active');
            }
        }
    }

    startMove();//启动js



}



// /**
//  * 荣誉资质类，图片超过会展示点击右边移动没有超过不展示
//  */

if($(".overScroll").length){
   
    LRclick(".overScroll",5);
}


// 移动端设置的时候尽量用整数不然会有一些误差不要用（0.15rem，3.75rem）这种；
// 移动的图片或内容的父级记得添加css样式position:relative;
// tabView01 最外层包裹着图片的父级类名；
// margin，设置图片之间的间距统一用margin-right，移动端需要计算下，图片间的距离,计算公式；
function LRclick(tabView01,margin) {
    var tabView = $(tabView01);
    var arrowLeft = $(tabView01+"  .navPrev");
    var arrowRight = $(tabView01+" .navNext");
    var choiceContent = tabView01+" .overMain";
    var list01 = tabView01+" .os-item";
    $(choiceContent).css("width",($(list01).eq(0).outerWidth()+margin)*$(list01).length);

    if(($(list01).eq(0).outerWidth()+margin)*$(list01).length > tabView.outerWidth()){
        arrowRight.show()
    }
    if($(choiceContent).position().left < 0 ){
        arrowLeft.show()
    }
    if( Math.abs($(choiceContent).position().left) >= ($(list01).eq(0).outerWidth()+margin)*$(list01).length-tabView.outerWidth()-margin){
        arrowRight.hide();
    }
    arrowRight.on("click",function (event) {
        event.stopPropagation();
        arrowLeft.show();
        var animateOffLeft = Math.abs($(choiceContent).position().left)+$(list01).eq(0).outerWidth()+margin;
        if( Math.abs($(choiceContent).position().left) < ($(list01).eq(0).outerWidth()+margin)*$(list01).length-tabView.outerWidth()-margin){
            if(!$(choiceContent).is(":animated")){
                $(choiceContent).animate({"left":-animateOffLeft+"px"},function () {
                    if( Math.abs($(choiceContent).position().left) >= ($(list01).eq(0).outerWidth()+margin)*$(list01).length-tabView.outerWidth()-margin){
                        arrowRight.hide();
                    }
                });
            }
        }

    });
    arrowLeft.on("click",function (event) {
        event.stopPropagation();
        arrowRight.show();
        var animateOffleft = ($(choiceContent).position().left+$(list01).outerWidth()+margin);
        if( $(choiceContent).position().left < 0){
            if(!$(choiceContent).is(":animated")){
                $(choiceContent).animate({"left":animateOffleft+"px"},function () {
                    if($(choiceContent).position().left >= 0){
                        arrowLeft.hide()
                    }
                });
            }

        }
    });
}



// album detail 

if ($('.albumShowListCon').length) {
    simpleSwiper(
        '.albumShowListCon li',
        '.albumShowListCon',
        '.albumShowListCon ul',
        '.albumShowListn',
        '.albumShowListp',
        5,
        'albumShowimgp',
        'albumShowimgn',
        5
    )
}


function simpleSwiper(albumShowListli,albumShowListCon,albumShowListUl,albumShowListn,albumShowListp,margin,arrowLeft,arrowRight,number) {
    var Lis = $(albumShowListli);
    var pView = $(albumShowListCon);
    var ViewUl = $(albumShowListUl);
    var lisWidth = (pView.outerWidth()-(number-1)*margin)/number;
    lisWidth = Math.floor(lisWidth);
    Lis.width(lisWidth);
    var tabLIWidth =  Lis.length *  (Lis.eq(0).outerWidth()+margin);
    ViewUl.css("width",tabLIWidth);
    if( Lis.hasClass("active")){
        if($( albumShowListli+".active")[0].offsetLeft -  pView.outerWidth() + $( albumShowListli+".active").outerWidth() > 0){
            var activeLeft =  $(albumShowListli+".active")[0].offsetLeft -  pView.outerWidth() + $( albumShowListli+".active").outerWidth();
            var activeLefts = activeLeft +($( albumShowListli).outerWidth()+margin)*2;
            if(!(activeLefts >= ViewUl.outerWidth() - pView.outerWidth())){
                activeLeft = activeLefts
            }
            if($(albumShowListli+".active").index() === $(albumShowListli).length-2){
                activeLeft = $(albumShowListli).eq($(albumShowListli).length-1)[0].offsetLeft  -  pView.outerWidth() + $( albumShowListli+".active").outerWidth();
            }
            ViewUl[0].style.left = -activeLeft +"px"
        }
        if( Math.abs(ViewUl.position().left) >= tabLIWidth - pView.outerWidth()-margin){
            $(albumShowListn).addClass("active");
        }
        if(ViewUl.position().left >= 0){
            $(albumShowListp).addClass("active");
        }
    }

    $(window).resize(function () {
        Lis = $(albumShowListli);
        pView = $(albumShowListCon);
        ViewUl = $(albumShowListUl);
        lisWidth = (pView.outerWidth()-(number-1)*margin)/number;
        lisWidth = Math.floor(lisWidth);
        Lis.width(lisWidth);
        tabLIWidth =  Lis.length *  (Lis.eq(0).outerWidth()+margin);
        ViewUl.css("width",tabLIWidth);
        if( Lis.hasClass("active")){
            if($( albumShowListli+".active")[0].offsetLeft -  pView.outerWidth() + $( albumShowListli+".active").outerWidth() > 0){
                var activeLeft =  $(albumShowListli+".active")[0].offsetLeft -  pView.outerWidth() + $( albumShowListli+".active").outerWidth();
                var activeLefts = activeLeft +($( albumShowListli).outerWidth()+margin)*2;
                if(!(activeLefts >= ViewUl.outerWidth() - pView.outerWidth())){
                    activeLeft = activeLefts
                }
                if($(albumShowListli+".active").index() === $(albumShowListli).length-2){
                    activeLeft = $(albumShowListli).eq($(albumShowListli).length-1)[0].offsetLeft  -  pView.outerWidth() + $( albumShowListli+".active").outerWidth();
                }
                ViewUl[0].style.left = -activeLeft +"px"
            }
            if( Math.abs(ViewUl.position().left) >= tabLIWidth - pView.outerWidth()-margin){
                $(albumShowListn).addClass("active");
            }
            if(ViewUl.position().left >= 0){
                $(albumShowListp).addClass("active");
            }
        }
    });
    $(document).on("click",albumShowListn,function () {
        var animateOffLeft = Math.abs(ViewUl.position().left)+Lis.eq(0).outerWidth();
        if( Math.abs(ViewUl.position().left) < tabLIWidth - pView.outerWidth()-margin){
            $(albumShowListp).removeClass("active");
            if(!ViewUl.is(":animated")){
                ViewUl.animate({"left":-(animateOffLeft+margin)+"px"},function () {
                    if( Math.abs(ViewUl.position().left) >= tabLIWidth - pView.outerWidth()-margin){
                        $(albumShowListn).addClass("active");
                    }
                });
            }
        }

    });
    $(document).on("click",albumShowListp,function () {
        var animateOffleft01 = (ViewUl.position().left+Lis.eq(0).outerWidth());
        if( ViewUl.position().left < -5){
            $(albumShowListn).removeClass("active");
            if(!ViewUl.is(":animated")){
                ViewUl.animate({"left":animateOffleft01+margin+"px"},function () {
                    if(ViewUl.position().left >= 0){
                        $(albumShowListp).addClass("active");
                    }
                });
            }

        }
    });
    $(document).on("keydown",function (e) {
        if(e.keyCode==37){
            if($("."+arrowLeft).length){
                var src = $("."+arrowLeft).attr("href");
                window.location.href =  src
            }
        } else if(e.keyCode==39) {
            if(($("."+arrowRight).length)){
                var src = $("."+arrowRight).attr("href");
                window.location.href =  src
            }
        }

    });
}



/**
 * Tcplayer 视频播放组件
 * 
 * 注意事项：
 * 
 *  直接用本地网页是调试不了的，因为腾讯云Web播放器处理不了这种情况下的跨域问题。
 *  封面在 ios10 暂时无法生效。
 * 
 *  结构参考视频模型详情页
 * 
 * 可参考文档：https://www.cnblogs.com/stnlcd/p/7262034.html
 */
if($("#video-container").length){
(function(){
    function getParams(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    }
    var rtmp = getParams('rtmp'),
        m3u8 = getParams('m3u8'),
        mp4  = getParams('mp4'),
        live = (getParams('live') == 'true' ? true : false),
        coverpic = getParams('coverpic'),
        width = getParams('width'),
        height = getParams('height'),
        volume = getParams('volume'),
        flash = (getParams('flash') == 'true' ? true : false),
        h5_flv =  (getParams('h5_flv') == 'true' ? true : false),
        autoplay = (getParams('autoplay') == 'true' ? true : false),
        log = getParams('log');

    /**
     * 视频类型播放优先级
     * mobile ：m3u8>mp4
     * PC ：RTMP>flv>m3u8>mp4
     */
    var srl1 = $('.video1').attr('href');
    var srl2 = $('.video2').attr('href');
    var srl3 = $('.video3').attr('href');
    var poster = $('#video-container').attr('data-poster');
    
    var options = {
        mp4 : srl1,
        mp4_hd : srl2,
        mp4_sd : srl3,
        clarity: 'sd',
        clarityLabel:{
            sd: '高清',
            od: '流畅',
            hd: '标清'
        },
        "wording": {
            2032: "请求视频失败，请检查网络",
            2048: "请求m3u8文件失败，可能是网络错误或者跨域问题"
        },
        coverpic : coverpic || {"style":"stretch", "src":poster},
        autoplay: autoplay ? true : false,
        live: live,
        width : width || '100%',
        height : height || '100%',
        volume : volume || 0.5,
        flash : flash,
        listener: function (msg) {
            if(msg.type=='ended'){
                $('.pause_ico').show();
            }
            if(msg.type=='pause'){
                $('.vcp-poster-pic').hide();
            }
        }
    };
   
    var player = new TcPlayer('video-container', options);
    window.tcplayer  = player;
    $('.vcp-playtoggle').click (function () {
        $(".pause_ico").toggle();
    })
    $('.vcp-bigplay').click (function () {
        $(".pause_ico").toggle();
        if($(".pause_ico").css("display") == "block"){
            player.pause();
        }else{
            player.play();
        }
        
    })
    $('.pause_ico').click(function () {
        player.play();
        $(this).hide();
    })
})();
}





 // 1. 引入swiper.js和swiper.css和上面的css(注意swiper需要是4版本以上的，可以用最新的,上面的样式可以根据需求自己更改).
    // 2. 给需要点击图片弹出模态框的图片的父级添加类名imgScale(这样这个类名里的img都会添加双击后显示出来对应的大图并且可切换缩放)
    // 3. 把下面的函数js 放入自己的js里即可，无需配置。
    // 4. 当前是遍历imgScale下的img的src，把它们的地址赋予弹框里，需要其他方式可以根据需求改
    if($(".imgScale").length){
        dialogImg();
    }
function dialogImg() {
    if($(".imgScale").length){
        var oldTime = new Date().getTime();
        var swiperHtml = '<div class="swiper-container " id="imgModal">'+
            '<div class="swiper-wrapper"></div>'+
            '<div class="swiper-pagination "></div>'+
            '</div>';
        $("body").append(swiperHtml);
        var swiper = new Swiper('#imgModal',{
            zoom:true,
            width: window.innerWidth,
            virtual: true,
            spaceBetween:20,
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
            },
        });

        $('.imgScale img').click(function(){
            if(new Date().getTime() - oldTime < 200){
                var _this = this;
                var imgs = $(this).parents(".imgScale").find("img");
                var clickIndex= indexVf (imgs);
                function indexVf (imgs){
                    for(var i=0;i<imgs.length;i++){
                        if(imgs[i]== _this){
                            console.log(i);
                            return i;
                        }

                    }
                }
                for(var i=0;i<imgs.length;i++){
                    var imgSrc = $(imgs)[i];
                    swiper.virtual.appendSlide('<div class="swiper-zoom-container"><img src="'+$(imgSrc).attr("src")+'" /></div>');
                }
                swiper.slideTo(clickIndex);
                $('#imgModal').fadeIn('fast');
            }else {
                oldTime = new Date().getTime();
            }

        });
        $(document).on("click","#imgModal img",function (event) {
            event.stopPropagation();
        });
        $(document).on("click","#imgModal .swiper-slide",function () {
            $('#imgModal').fadeOut('fast');
            swiper.virtual.slides.length=0;
            swiper.virtual.cache=[];
        });
    }
}
