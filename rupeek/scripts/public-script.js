jQuery(document).ready(function(){
    $(document).on('click','.hamburger-menu_js',function(){
        $(this).toggleClass('active');
    });

    function initializeOwl(largeDevicesItems,mediumDevicesItems,tabletItems,showDotsFlagForDesktop,infiniteLoopDesktop){
      return owlCarouselOptions = {
        loop: false,
        autoplay: true,
        autoplayTimeout: 4000,
        nav: false,
        dots: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
            dots: false,
            nav: true,
            loop: true
          },
          480: {
            items: 1,
            loop: true,
            dots: false,
            nav: true
          },
          640: {
            items: 1,
            loop: true,
            dots: false,
            nav: true,
          },
          768: {
            items: tabletItems,
            loop: false,
            dots: false,
            nav: true,
          },
          992: {
            items: mediumDevicesItems,
            loop: false
          },
          1000: {
            items: largeDevicesItems,
            loop: infiniteLoopDesktop,
            dots: showDotsFlagForDesktop,
            mouseDrag : false
          }
        }
      };
    };

    var mediaSlider = $('.rupeek-in-media_js');
    let rupeekInMedeiaOptions= initializeOwl(4,3,2,true,false);
    mediaSlider.owlCarousel(rupeekInMedeiaOptions);

    var testimonialsSlider = $('.testimonials-slider_js');
    let testimonialsSliderOptions = initializeOwl(3,3,2,true,false);
    testimonialsSlider.owlCarousel(testimonialsSliderOptions);
    
    var schemesSlider = $('.schemes-slider_js');
    let schemesSliderOptions = initializeOwl(3,3,2,true,false);
    schemesSlider.owlCarousel(schemesSliderOptions);
      

      var locationsSlider = $('.serving-locations-slider_js');
      let locationsSliderOptions = initializeOwl(1,1,1,false,true);
      locationsSlider.owlCarousel(locationsSliderOptions);

      $('#faq-1').show();
      $(document).on('click','.faqs_js',function(){
        var getTargetId = $(this).attr('data-href');
        $('.faqs_js').removeClass('active');
          $(this).addClass('active');      
        $('.faq-body').slideUp(300,function(){
          $(getTargetId).slideDown();
          
        });
      })
});

var getDeviceWidth = $(window).width();
if(getDeviceWidth < 768){
  $(document).scroll(function(){
    var scrollTop = $(window).scrollTop();
    var getPositionToOpenFixedFooter = $('main').offset().top;
    if(scrollTop > getPositionToOpenFixedFooter){
      $('.trigger_fixed_footer_js').addClass('active');
    }else{
      $('.trigger_fixed_footer_js').removeClass('active');
    }
  })
}
