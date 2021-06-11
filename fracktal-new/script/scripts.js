jQuery(document).ready(function () {
    //     var getbaseurl = $("#getbaseurl").val();
    var getbaseurl = "http://bigappcompany.in/demos/Fracktal/";
    var getlocation = window.location.href;


    $('a.smoothScroll[href^="#"]').click(function (e) {
        e.preventDefault();
        var target = this.hash;
        var $target = jQuery(target);
        jQuery('html, body').stop().animate({
            'scrollTop': $target.offset().top - 0
        }, 500, 'swing', function () {});
    });


    var getdevicewidth = $(window).width()
    if (getdevicewidth < 768) {
        $('.mobilemenu_js').click(function () {
            $(".logoandmenudiv").slideToggle(400, function () {
                $(".logoandmenudiv").toggleClass("active");
                $(".mobilemenu_js").children().toggleClass("fa-close fa-bars");

            });
        });
    }
    $('.bxslider').bxSlider({
        pagerCustom: '#bx-pager'
    });
    $(".product-specifications-wrapper .bx-controls-direction .bx-prev").html('<i class="fa fa-angle-left margin-auto theme-color boldfont"></i>');
    $(".product-specifications-wrapper .bx-controls-direction .bx-next").html('<i class="fa fa-angle-right margin-auto theme-color boldfont"></i>');

});

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode > 31 &&
        (charCode < 48 || charCode > 57))
        return false;

    return true;
}
