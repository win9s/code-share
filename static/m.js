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


/*$(".search-form input").focus(function(){
    var val = $(this).val();
    $(this).attr("data-value",val);
    $(this).val("");
})
$(".search-form input").blur(function(){
    var val = $(this).attr("data-value");
    if($(this).val() == ''){
        $(this).val(val);
    }

})*/


$(function () {
    var $doc = $(document),
        obj = {
            init: function () {
                this.event()
                this.form()
                this.owlEvent()
            },
            event: function () {
                $(' .top-menu').on('click', function (e) {
                    $('.wsc-TopBar').animate({ right: 0 }, 300)
                })
                $(' .top-tit').on('click', function (e) {
                    $('.wsc-TopBar').animate({ right: 0 }, 300)
                })
                $('.top-close').on('click', function (e) {
                    $('.wsc-TopBar').animate({ right: '-100%' }, 300)
                })
                $('.hn-arr').on('click', function (e) {
                    $(this).parents('.hn-item').addClass('active').siblings().removeClass('active');
                    $(this).parents('.hn-text').siblings('.hn-drop').slideToggle();
                    $(this).find('span').toggleClass('rotate180');
                    $(this).parents('.hn-item').siblings().find('span').removeClass('rotate180');
                    $(this).parents('.hn-item').siblings().find('.hn-drop').slideUp();
                })

                $('.fn-text').on('click', function (e) {
                    $(this).siblings('.fn-list').slideToggle();
                    $(this).find('span').toggleClass('clicking');
                    $(this).parent('.fn-item').siblings().find('span').removeClass('clicking');
                    $(this).parent('.fn-item').siblings().find('.fn-list').slideUp();
                })

                if($(".wsc-class2").length){
                    if($(".wsc-class2 .active").prev().length){
                        l = $(".wsc-class2 .active").position().left;
                        console.log(l)
                        pl=$(".wsc-class2 .active").prev().position().left;
                        $(".wsc-classCon2").scrollLeft(pl+50);
                    }
                }
                $(".fb-top").click(function(){$('html,body').animate({'scrollTop': 0})});


                $('.wb-fil').on('click', function (e) {
                    $(this).find('.wb-fil-box').slideToggle();
                    $(this).find('span').toggleClass('rotate180');
                    $(this).find('span').toggleClass('clicking');
                });
                $doc.on("click",".wsc-botfix .item3",function(){
                    $(".botfix-dialog").fadeToggle(0);
                    $(".botfix-lxway").fadeToggle(0);
                    $(this).toggleClass("active");
                    if($(this).hasClass("active")){
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
                $(".botfix-dialog").click(function(){

                    $(".botfix-lxway").fadeOut(0);
                    $(".botfix-dialog").fadeOut(0);
                    $(".wsc-botfix .item3").removeClass("active");
                    // obj.bodyfree();
                    $('body').css({
                        "overflow-x":"auto",
                        "overflow-y":"auto"
                    });
                })

            },
            owlEvent: function () {},

            form:function(){
                $('.wsc-form .sel-head').click(function (event) {
                    event.stopPropagation();
                    $(this).toggleClass('clicking')
                    $(this)
                        .find('.sel-arr')
                        .toggleClass('rotate180')
                    $(this)
                        .siblings('.sel-list')
                        .slideToggle()
                })
                $(document).on('click',":not(.fm-sel),:not(.sel-head)",function () {
                    $('.sel-list').slideUp();
                    $('.sel-arr').removeClass('rotate180');
                    $(".sel-head").removeClass('clicking');
                })
                $('.wsc-form .sel-list li').click(function (event) {
                    event.stopPropagation();
                    $(this).parents('.sel-list').slideToggle()
                    $(this).parents('.fm-sel').find('.sel-arr').toggleClass('rotate180')
                    $(this).parents('.fm-sel').find('.sel-head').toggleClass('clicking')
                    $(this).parents('.fm-sel').find("input[name='product']").val($(this).text())
                    $(this).parents('.fm-sel')
                        .find('.tit')
                        .text($(this).text())
                })
                $('.rfm-row input').focus(function () {
                    $(this)
                        .parent('.fm-item')
                        .siblings('sup')
                        .fadeOut()
                })
                $('.rfm-row  input').blur(function () {
                    if ($(this).val() == '') {
                        $(this)
                            .parents('.fm-item')
                            .siblings('sup')
                            .fadeIn()
                    } else {
                        $(this)
                            .parents('.fm-item')
                            .siblings('sup')
                            .fadeOut()
                    }
                })
                if ($('.form-body').length){
                    $('.form-body').validator({
                        fields: {
                            tel: {
                                rule: 'required,tel',
                                msg: {
                                    required: '请输入您的联系方式'
                                }
                            }
                        },
                        rules: {
                            tel: [
                                /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,13}$/,
                                '请输入正确格式的联系方式'
                            ]
                        }
                    })
                    $('.yy-form').validator({
                        fields: {
                            tel: {
                                rule: 'required,tel',
                                msg: {
                                    required: '请输入您的联系方式'
                                }
                            },
                            time: {
                                rule: 'required',
                                msg: {
                                    required: '请输入您的来访时间'
                                }
                            }
                        },
                        rules: {
                            tel: [
                                /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,13}$/,
                                '请输入正确格式的联系方式'
                            ]
                        }
                    });

                    $('.form-body').on('valid.form', function (e) {
                        e.preventDefault()
                        var $form = $(this)
                        var url = $form.attr('action')
                        var data = $form.serialize()
                        $.ajax({
                            //防止服务器拿不到数据
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            url: url,
                            data: data,
                            type: 'POST',
                            success: function (res) {
                                if (res.status) {
                                    $('.form-body input[type="text"]').val('')
                                    $('.form-body textarea').val('')
                                    $('.form-body select').val('')
                                    window.location.href = '/addes/'
                                } else {
                                    alert('FAIL!')
                                }
                                var $token = $form.find('#token')
                                $token.attr('name', res.token.key)
                                $token.val(res.token.value)
                            }
                        })
                    })
                }


            }
        }
    obj.init()
    if ($('.pd-main').length && $('.det-point').length) {
        $('.pd-main').posfixed({
            top: '0',
            left: '',
            right: '0',
            zIndex: '',
            scrollLI: '.det-point', // 每个选项
            rightName: '', //右边跟随的盒子
            pdBoxInclusion: '.pd-main', // 包裹头部和内容的父级
            padtabBox: '.pdTab-box', // 头部父级
            fixedTop: $(".wsc-Top").outerHeight(), // 1.fixedTop: $(".pdTab-box").outerHeight()  配置右边盒子的在跟随滚动时距离顶部的距离，不配置则是0。
            Mheader:".wsc-Top"
        })
    }

    if($(".index-banner .picshow").length){
        productSwiper(".index-banner .picshow",".index-banner .picshowsmallList",false);
    }
})
