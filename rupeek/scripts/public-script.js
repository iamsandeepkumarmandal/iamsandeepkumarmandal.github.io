jQuery(document).ready(function(){
    $(document).on('click','.hamburger-menu_js',function(){
        $(this).toggleClass('active');
    });

    function initializeOwl(largeDevicesItems,mediumDevicesItems,tabletItems,showDotsFlagForDesktop,infiniteLoopDesktop){
      return owlCarouselOptions = {
        loop: false,
        autoplay: false,
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
            loop: false
          },
          480: {
            items: 1,
            loop: false,
            dots: false,
            nav: true
          },
          640: {
            items: 1,
            loop: false,
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
            dots: showDotsFlagForDesktop
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