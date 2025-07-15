/**
 * create by xh
 */

(function ($) {
    $.extend($.fn, {
        posfixed: function (configSettings) {
            var settings = {
                direction: "top",
                type: "while",
                hide: false,
                distance: 0,
                left: 0,
                fixedTop: "0",
                rightName: ".pd-bar",
                barFixedTop:0
            };
            $.extend(settings, configSettings);
            var _this = $(this);
            var pic_wrap = _this.offset().top;

            var tabContent = $(settings.pdBoxInclusion).outerHeight();
            var headerTop = $(settings.padtabBox).offset().top;
            if($(settings.rightName).length > 0){
                var obj = $(settings.rightName);
                var initPos = $(obj).offset().top;
                var left = (document.body.clientWidth - _this.outerWidth()) / 2 +  $(settings.pdBoxInclusion).outerWidth() + (_this.outerWidth() - $(settings.pdBoxInclusion).outerWidth() - $(obj).outerWidth());
            }
            window.onresize = function () {
                if($(settings.rightName).length > 0){
                    left = (document.body.clientWidth - _this.outerWidth()) / 2 +  $(settings.pdBoxInclusion).outerWidth() + (_this.outerWidth() -  $(settings.pdBoxInclusion).outerWidth() - $(obj).outerWidth());
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    if (scrollTop >= initPos && scrollTop < pic_wrap + tabContent - $(obj).outerHeight() - 10) {
                        if (document.body.clientWidth -_this.outerWidth() <= 0) {
                            $(obj).css({
                                "left": (_this.outerWidth() -  $(settings.pdBoxInclusion).outerWidth() - $(obj).outerWidth()) +  $(settings.pdBoxInclusion).outerWidth()
                            });

                        } else {
                            $(obj).css({
                                "left": left
                            });
                        }
                    } else if (scrollTop >= pic_wrap + tabContent - $(obj).outerHeight() - 10) {
                        $(obj).css({
                            "left": left - (document.body.clientWidth - _this.outerWidth()) / 2
                        });

                    } else {
                        $(obj).css({
                            "left": left - (document.body.clientWidth - _this.outerWidth()) / 2
                        });
                    }
                }
            };
            $(window).scroll(function () {
                var tabContent =  $(settings.pdBoxInclusion).outerHeight();
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if ($(settings.rightName).length > 0 && $(settings.rightName).outerHeight() < _this.outerHeight()) {
                    if (scrollTop >= initPos && scrollTop < pic_wrap + tabContent - $(obj).outerHeight() - 10) {
                        $(obj).css({
                            "position": "fixed",
                            "top":  settings.barFixedTop,
                            "zIndex": settings.zIndex || "",
                            "left": left
                        });
                    } else if (scrollTop >= pic_wrap + tabContent - $(obj).outerHeight() - 10) {
                        $(obj).css({
                            "position": "absolute",
                            "top": tabContent - $(obj).outerHeight(),
                            "zIndex": settings.zIndex || "",
                            "left": left - (document.body.clientWidth - _this.outerWidth()) / 2

                        })
                    } else {
                        $(obj).css({
                            "position": "absolute",
                            "top": "0",
                            "left": left - (document.body.clientWidth - _this.outerWidth()) / 2

                        })
                    }
                }   //右边跟随

                // tab 头部
                // && scrollTop <= headerTop  + $(".pd-box").outerHeight() - 5
                if (scrollTop >=  headerTop  + $(settings.padtabBox).outerHeight()) {
                    $(settings.padtabBox).css({
                        "position": "fixed",
                        "top": settings.fixedTop || "0",
                        "zIndex": settings.zIndex || ""
                    })

                } else {
                    $(settings.padtabBox).css({"position": "absolute",top:"0"})
                }

                if( $(settings.scrollLI).length){
                    for(var i = 0; i < $(settings.padtabBox).find("li").length;i++){
                        if(i === 0){
                            if (scrollTop <= $(settings.scrollLI).eq(1).offset().top- $(settings.padtabBox).outerHeight()) {
                                $(settings.padtabBox).find("li").eq(0).addClass("active").siblings().removeClass("active")

                            }
                        }else if(i > 0 && i <=  $(settings.padtabBox).find("li").length-2){
                            if (scrollTop >= $(settings.scrollLI).eq(i).offset().top- $(settings.padtabBox).outerHeight()-2-($(settings.Mheader).outerHeight()|| 0) && scrollTop < $(settings.scrollLI).eq(i+1).offset().top- $(settings.padtabBox).outerHeight()+($(settings.Mheader).outerHeight()|| 0)) {
                                $(settings.padtabBox).find("li").eq(i).addClass("active").siblings().removeClass("active")
                            }
                        }else {
                            if ( scrollTop >= $(settings.scrollLI).eq($(settings.padtabBox).find("li").length-1).offset().top- $(settings.padtabBox).outerHeight()-2-($(settings.Mheader).outerHeight()|| 0)) {
                                $(settings.padtabBox).find("li").eq($(settings.padtabBox).find("li").length-1).addClass("active").siblings().removeClass("active")
                            }
                        }

                    }
                }

            });

            $(settings.padtabBox).on("click","li",function (e) {
                e.stopPropagation();
                var index = $(this).index();
                var ScrollDistance = $(settings.scrollLI).eq(index).offset().top;
                if(index === 0){
                    $('html,body').animate({'scrollTop':ScrollDistance- $(settings.padtabBox).outerHeight()},200);  //滚动到标题位置
                }else {
                    $('html,body').animate({'scrollTop':ScrollDistance- $(settings.padtabBox).outerHeight()-($(settings.Mheader).outerHeight()|| 0)},200);  //滚动到标题位置
                }
            })

        }
    });


})(jQuery);
// $('.pd-main') 产品包裹最外层 类名可替换

// $('.pd-main').posfixed({
//     top : "0",
//     left:"",
//     right:"0",
//     zIndex:"",
//     scrollLI:".pd-edit",  // 每个选项
//     rightName:".pd-bar01",  //右边跟随的盒子
//     pdBoxInclusion:".pd-box", // 包裹头部和内容的父级
//     padtabBox:".pdTab-box", // 头部父级
//     barFixedTop:$(".pdTab-box").outerHeight(),//1.barFixedTop: $(".pdTab-box").outerHeight()  配置右边盒子的在跟随滚动时距离顶部的距离，不配置则是0。
//     // fixedTop: $(".pdTab-box").outerHeight() // 1.fixedTop: $(".pdTab-box").outerHeight()  配置头部跟随滚动时距离顶部的距离，不配置则是0，配置头部的话,需要配置头部在哪个元素下的类名。
//     // Mheader:".aaaaa"  跟配置头部连着用，如果头部没有配置距离，则此配置无需配置，如果配置了，头部的距离，且大于0时，需要在这里写上在头部上方的元素的类名，否则移动时会挡住一些标题。
// });


// 2.如果需要个别不在整个结构里的内容。单独给在结构外的内容添加类名。
// 3.如果只使用右边的盒子跟随功能，结构里的头部和各个对应的内容不写，最外层的 pd-main pd-box 需要写。