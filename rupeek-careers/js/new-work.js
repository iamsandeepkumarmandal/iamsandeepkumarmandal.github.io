
$(document).ready(function () {
    $('#header-nav').on('click', function () {
        $(this).toggleClass('open1');
    });
});

$(document).ready(function() {
     $(".accordion-desc").fadeOut(0);
     $(".accordion").click(function() {
          $(".accordion-desc").not($(this).next()).slideUp(400);
          $(this).next().slideToggle(400);
     });
});

$('.accordion a').click( function(){
    if ( jQuery(this).hasClass('current-new') ) {
        jQuery(this).removeClass('current-new');
    } else {
        jQuery('.accordion a.current-new').removeClass('current-new');
        jQuery(this).addClass('current-new');    
    }
});
