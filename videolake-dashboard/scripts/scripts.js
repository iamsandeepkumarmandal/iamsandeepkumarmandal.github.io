$(document).ready(function() {
    $('.search-videos-js').click(function() {
        $('.search-slide-popup_js').addClass('active');
    });

    $('.close-search-slide-popup_js').click(function() {
        $('.search-slide-popup_js').removeClass('active');  
    });
});