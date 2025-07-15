if ($('.sn-box').length ) {
    secondNav(".sn-box",".swiper-wrapper",".swiper-slide",".sn-more");
    function secondNav(snBox,swiper,swiperSlide,snMore,) {
        var swiper =document.querySelector(swiper);
        var startX = 0; // 刚触碰到屏幕的时的手指信息
        var centerX = 0; // 用来记录每次触摸时上一次的偏移距离
        var maxUpBounce = 0;
        var maxRight = 0;
        var width = 0;
        for(var i = 0; i < $(swiper).find(swiperSlide).length; i++){
            var widthI =  $(swiper).find(swiperSlide)[i];
            var widths = $(widthI).outerWidth();
            width+=widths
        }
        $(swiper).css("width",width+10+"px");
        if(width> $(window).width()){
            $(snMore).show();
            width = width+$(snMore).outerWidth()*1.3;
            $(swiper).css("width",width+$(snMore).outerWidth()*1.3);

        }
        maxRight = width -$(snBox).outerWidth();
        $(swiper).find(swiperSlide).click(function(event){

            event.stopPropagation();
            var moveX = $(this).position().left;
            var pageX = document.documentElement.clientWidth;//设备的宽度
            var blockWidth = $(this).outerWidth();
            var left = moveX-(pageX/2)+(blockWidth/2);
            if(left < 0){
                centerX = 0;
                left = 0
            }else if(left> Math.abs(maxRight)){
                centerX = -maxRight;
                left = maxRight
            }else {
                centerX = -left
            }
            $(this).parent()[0].style.transform = 'translateX(-' +left + 'px)';
            $(this).addClass("active").siblings().removeClass("active");
        });
        swiper.addEventListener("touchstart",function(e){
            $(this)[0].style.transition = 'none';
            startX= e.targetTouches[0].clientX;

        });
        swiper.addEventListener("touchmove",function(e){
            e.preventDefault();
            var dx = e.changedTouches[0].clientX - startX;
            var tempX = centerX + dx;
            $(this)[0].style.transition = 'none';
            $(this)[0].style.transform = 'translateX(' + tempX + 'px)';
        });
        swiper.addEventListener("touchend",function(e){
            var dy = e.changedTouches[0].clientX - startX;
            centerX = centerX+dy;
            if (centerX > maxUpBounce) {
                centerX = maxUpBounce;
            } else if (centerX < -maxRight) {
                centerX = -maxRight;
            }
            swiper.style.transition = 'transform .5s';
            swiper.style.transform = 'translateX(' + centerX + 'px)'

        });

        $(snMore).on("click",function (e) {   // 回调
            e.stopPropagation();
            scrollDialog()
        });
        $(document).on("click",".close-icon",function () {
            $(this).parents(".sn-drop").hide();
            $(snMore).show()
        });
        function scrollDialog() {
            var dialogInfo =$(swiper).find(swiperSlide);
            var html = "";
            for(var i = 0; i < dialogInfo.length; i++){
                var lis = dialogInfo[i];
                var liChild = $(lis).find("a");
                var src = $(lis).find("a").attr("href");
                var lisText = $(liChild).clone();
                lisText.find(':nth-child(n)').remove();
                var text = $(lisText).html();
                if($(lis).hasClass("active")){
                    html+="<li class='active'><a href='"+src+"'>"+text+"</a></li>"
                }else {
                    html+="<li><a href='"+src+"'>"+text+"</a></li>"
                }

            }
            $(".sn-drop").show();
            $(".sn-drop  ul").html(html);
            $(snMore).hide()
        }
        $(swiper).find( swiperSlide+".active").click()

    };
}
