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
$('.show-transaction-details_js').click(function(){
    let getId = $(this).attr('data-target-body');
    $(this).toggleClass('active');
    $(getId).slideToggle(400);
});

$(".customer-tabs__links-wrapper li a").on('click', function(event) {

    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    } // End if
  });
