$(document).ready(function() {
    // アコーディオン機能
    $('.accordion-area .title').click(function() {
        $(this).toggleClass('close');
        $(this).next('.box').slideToggle();
    });

    // スムーズスクロール
    $('a[href^="#"]').click(function() {
        var speed = 500;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top - 70; // ヘッダーの高さ分を引く
        $('body,html').animate({scrollTop:position}, speed, 'swing');
        return false;
    });

    // ギャラリーモーダル
    $(".gallery-list").modaal({
        fullscreen: true,
        before_open: function(){
            $('html').css('overflow-y','hidden');
        },
        after_close: function(){
            $('html').css('overflow-y','scroll');
        }
    });

    // スクロール時のナビゲーション更新
    $(window).scroll(function() {
        $('.scroll-point').each(function() {
            var position = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > position - windowHeight + 200) {
                var id = $(this).attr('id');
                $('.desktop-nav li').removeClass('current');
                $('.desktop-nav li a[href="#' + id + '"]').parent().addClass('current');
                $('.mobile-nav .nav-item').removeClass('current');
                $('.mobile-nav .nav-item[href="#' + id + '"]').addClass('current');
            }
        });
    });
});

// 現在の位置を取得する関数
function getCurrentPosition() {
    var scrollPosition = $(window).scrollTop();
    $('.scroll-point').each(function() {
        var target = $(this).offset().top;
        var id = $(this).attr('id');
        if (scrollPosition >= target - 71) { // ヘッダーの高さ+1px
            $('.desktop-nav li').removeClass('current');
            $('.desktop-nav li a[href="#' + id + '"]').parent().addClass('current');
            $('.mobile-nav .nav-item').removeClass('current');
            $('.mobile-nav .nav-item[href="#' + id + '"]').addClass('current');
        }
    });
}

// ページ読み込み時と画面サイズ変更時に現在位置を更新
$(window).on('load resize', function() {
    getCurrentPosition();
});

// スクロール時に現在位置を更新
$(window).scroll(function() {
    getCurrentPosition();
});
