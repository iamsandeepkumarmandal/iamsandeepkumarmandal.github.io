const deviceWidth =  $(window).outerWidth();
if(deviceWidth < 768) {
    $('.mobile-menu_js').click(function(){
        $('.header').addClass('active');
    });
    
    $('.close-mobile-menu_js').click(function(){
        $('.header').removeClass('active');
    });
    
    $('.quick-links h4').click(function(){
        $('.quick-links h4').removeClass('active');
        $('.quick-links ul').slideUp(400);  
        $(this).addClass('active').next().slideDown(400);
    });
}
