require.config(
    {
        paths: {
            'jquery': 'lib/jquery'
        }
    }
);
require(['jquery'],function ($) {
    // some codes
    (function($) {
        var sw = true;
        $.fn.barrager = function(barrage) {
            sw = !sw;
            barrage = $.extend({
                close:true,
                bottom: 0,
                max: 10,
                speed: 8,
                color: '#fff',
                old_ie_color : '#000000'
            }, barrage || {});
            // 获取时间戳作为唯一id
            var time = new Date().getTime();
            var barrager_id = 'barrage_' + time;
            var id = '#' + barrager_id;
            // 弹幕盒子
            var div_barrager = $("<div class='barrage' id='" + barrager_id + "'></div>").appendTo($(this));
            // 元素高度
            var this_height =  this.height();
            var window_width = $(window).width() + 500;
            var this_width =  (window_width > this.width()) ? this.width() : window_width;
            // 随机位置
            // var bottom = (barrage.bottom == 0) ? Math.floor(Math.random() * this_height + 40) : barrage.bottom;
            // 平行位置
            if (sw) {
                var bottom = 70;
            }else {
                var bottom = 0;                
            }
            div_barrager.css("bottom", bottom + "px");
            div_barrager_box = $("<div class='barrage_box cl'></div>").appendTo(div_barrager);
            // 判断是否有图片
            if(barrage.img){
                div_barrager_box.append("<a class='portrait z' href='javascript:;'></a>");
                var img = $("<img src='' >").appendTo(id + " .barrage_box .portrait");
                img.attr('src', barrage.img);
            }
            div_barrager_box.append(" <div class='z p'></div>");
            if(barrage.close){
                div_barrager_box.append(" <div class='close z'></div>");
            }
            // 内容
            var content = $("<a title='' href='' target='_blank'></a>").appendTo(id + " .barrage_box .p");
            content.attr({
                'href': barrage.href,
                'id': barrage.id
            }).empty().append(barrage.info);
            // 判断是否为ie 6 7 8
            if(navigator.userAgent.indexOf("MSIE 6.0")>0  ||  navigator.userAgent.indexOf("MSIE 7.0")>0 ||  navigator.userAgent.indexOf("MSIE 8.0")>0  ){
                content.css('color', barrage.old_ie_color);
            }else{
                content.css('color', barrage.color);
            }
            div_barrager.css('margin-right', 0);
            // 运动结束后移除元素
            $(id).animate({right:this_width}, barrage.speed*1000, function(){

                $(id).remove();
            });
            // 鼠标移入停止移动
            div_barrager_box.mouseover(function() {
                $(id).stop(true);
            });
            // 鼠标移出后继续移动            
            div_barrager_box.mouseout(function() {

                $(id).animate({right:this_width},barrage.speed*1000,function(){

                    $(id).remove();
                });

            });
            // 点击关闭移除弹幕
            $(id+'.barrage .barrage_box .close').click(function(){

                $(id).remove();

            })

        }
        // 移除说有弹幕
        $.fn.barrager.removeAll=function(){
            $('.barrage').remove();
        }

    })(jQuery);
    $('.btn').on('click', function () {
        if($('.inp').val()) {
            $('.box').barrager({
                "info": $('.inp').val()
            })
        }else {
            alert('弹幕为空')
        }

    })
});