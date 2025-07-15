$(function () {
$(document).on("click",".report1-quest",function(){
    $(".botfix-dialog1").fadeToggle(0);
    $(".botfix-lxway1").fadeToggle(0);
    $(this).toggleClass("clicking");
    if($(this).hasClass("clicking")){
        $('body').css({
            "overflow-x":"hidden",
            "overflow-y":"hidden"
        });

    }else{
        $('body').css({
            "overflow-x":"auto",
            "overflow-y":"auto"
        });
    }

})
$(".botfix-dialog1").click(function(){
    $('.report1-quest').toggleClass("clicking");
        $('body').css({
            "overflow-x":"auto",
            "overflow-y":"auto"
        });
  
    $(".botfix-lxway1").fadeOut(0);
    $(".botfix-dialog1").fadeOut(0);
})

 
  if ($('.effb2-cont').length) {
    var mySwiper6 = new Swiper('.effb2-cont .swiper-container', {
        autoplay: 5000,
        slide:1,
        grabCursor: true,
        pagination : '.pagination5',
        paginationClickable :true,
        loop: true,
        autoplayDisableOnInteraction: false
    })
    $('.arrow-left').on('click', function(e){
        e.preventDefault()
        mySwiper6.swipePrev()
    })
    $('.arrow-right').on('click', function(e){
        e.preventDefault()
        mySwiper6.swipeNext()
    })
}
$(".net2-item").first().find('.net-info').show();
$(".net2-item").first().find('.net-more').toggleClass('rotate180');
if ($('.net2-item').length) {
    $(".net2-item .net-header").click(function(){
        $(this).siblings('.net-info').slideToggle();
        $(this).find('.net-more').toggleClass('rotate180');
        $(this).parents('.net2-item').siblings().find('.net-more').removeClass('rotate180');
        $(this).parents('.net2-item').siblings().find('.net-info').slideUp();
    });
}
if ($('.teamb1-main').length) {
    $(".teamb1-nav li").mouseenter(function(){
        var i = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".teamb1-box").eq(i).addClass("active").siblings().removeClass("active");
    });
}
if ($('.sbb1-main').length) {
    $(".sbb1-head li").click(function(){
        var i = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".sbb1-def").eq(i).addClass("active").siblings().removeClass("active");
    });
}
if ($('.hisb1-main').length) {
    $(".hisb1-nav li").click(function(){
        var i = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".hisb1-box").eq(i).addClass("active").siblings().removeClass("active");
    });
}
})
