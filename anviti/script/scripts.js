 jQuery(document).ready(function () {
     var getbaseurl = $("#getbaseurl").val();
     var getlocation = window.location.href;
     if (getlocation == getbaseurl || getlocation == getbaseurl + "index.php") {
         //$("body").removeClass("aboutus");
     }
     if (getlocation == getbaseurl + "about-us.php" || getlocation == getbaseurl + "board-of-directors.php" || getlocation == getbaseurl + "key-leaders.php") {
         $("body").addClass("aboutus");
         $(".submenu h5").click(function () {
             $(this).next().slideToggle(500);
             $(this).toggleClass("active");
         });
         setTimeout(function () {
             $(".circle-main-screen").removeClass("active");
         }, 4801);

     }
     $(".loadingprogress").addClass("active");
     setTimeout(function () {
         $('.loader ').fadeOut(400);
         $(".loadingprogress").removeClass("active");
     }, 1500);
     setTimeout(function () {
         $('.bannerfourlayer-wrapper').removeClass("active");
     }, 2000);
     setTimeout(function () {
         $(".video-layer-effects").addClass("active");
     }, 4000);
     setTimeout(function () {
         $(".circle-main-screen").addClass("active");
     }, 4800);
     setTimeout(function () {
         $('.blogdetails-overlay').removeClass('active')
     }, 2500);
     var path = window.location.href;
     // Account for home page with empty path
     if (path == '') {
         path = 'index.php';
     }
     //Header Navigation
     var target = $('.mainnavigation ul li a[href="' + path + '"]');
     var target_submenu = $('nav.submenu ul li a[href="' + path + '"]');

     //Side Dropdown

     // Add active class to target link
     target.addClass('active');
     target_submenu.addClass('active');

     $('a[href^="#"].scrolldown_js').click(function (e) {
         e.preventDefault();
         var target = this.hash;
         var $target = jQuery(target);
         jQuery('html, body').stop().animate({
             'scrollTop': $target.offset().top - 0
         }, 500, 'swing', function () {});
     });
     AOS.init();
     var getwidthofdevice = $(window).width();
     if (getwidthofdevice < 768) {
         $(".triggermenuformobile_js").click(function () {
             $(".mainnavigation").slideToggle(400, function () {
                 $("nav.mainnavigation").toggleClass("active");
                 $(".triggermenuformobile_js").children().toggleClass("fa-close fa-bars");

             });
             $("nav.submenu").toggleClass('hidden');
         });

     }
     $(".scrolltop_js").click(function (e) {
         e.preventDefault();
         $("html, body").animate({
             scrollTop: 0
         }, "slow");
         return false;
     });


 });
 var getbaseurl = $("#getbaseurl").val();
 var getlocation = window.location.href;

 if (getbaseurl == getlocation || getbaseurl == getlocation + "index.php") {
     $(window).scroll(function () {
         let getscrollvalue = $(window).scrollTop();
         let getposition_about = $(".aboutus-wrapper").position().top;
         let getposition_services = $(".services-wrapper").position().top;
         let getposition_footer = $("#footer").position().top;
         if (getscrollvalue > getposition_about) {
             $(".circle-aboutus").addClass("active");
             setTimeout(function () {
                 $(".circle-aboutus").addClass("startanimating");
             }, 1500);
             $(".circle-main-screen").addClass("hidden");

         } else {
             $(".circle-aboutus").removeClass("active");
             $(".circle-aboutus").removeClass("startanimating");
             $(".circle-main-screen").removeClass("hidden");
         }


         if (getscrollvalue > getposition_services) {
             $(".circle-main-screen").removeClass("hidden");
         } else {
             $(".circle-main-screen").addClass("hidden");
         }

         if (getscrollvalue > getposition_footer) {
             $(".circle-aboutus").removeClass("active");
         }

         if (getscrollvalue == 0) {
             $(".circle-main-screen").removeClass("hidden");
         }
     });
 }
