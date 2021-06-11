jQuery(document).ready(function () {
    var getlocation = window.location.href;
    var $root = $('html, body');
    $('.smoothScroll').click(function () {
        $root.animate({
            scrollTop: $($.attr(this, 'data-target')).offset().top - 180
        }, 500);
        return false;
    });

    $('.smoothScroll[href^="#"]').click(function (e) {
        e.preventDefault();
        var target = this.hash;
        var $target = jQuery(target);
        jQuery('html, body').stop().animate({
            'scrollTop': $target.offset().top - 0
        }, 500, 'swing', function () {});
    });

    $(".menu_js").click(function(){
        $(".navigation-menu-wrapper").addClass("active");

    });
    $(".close_menu_js").click(function(){
        $(".navigation-menu-wrapper").removeClass("active");
    })
    $(window).scroll(function () {
        let getscrollValue = $(window).scrollTop();
        let productDetails = $('#product-details').position().top;
        if (getscrollValue >= productDetails) {
            $(".header").addClass("active");
        } else {
            $(".header").removeClass("active");
        }
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
        pagerCustom: '#bx-pager',
        controls: false,
        autoStart: true,
        auto: true
    });
    
    $(".product-specifications-wrapper .bx-controls-direction .bx-prev").html('<i class="fa fa-angle-left margin-auto theme-color boldfont"></i>');
    $(".product-specifications-wrapper .bx-controls-direction .bx-next").html('<i class="fa fa-angle-right margin-auto theme-color boldfont"></i>');
    $(".get_product_desc_js").click(function () {
        $(".get_product_desc_js").removeClass("active");
        $(this).addClass("active");
        var description = $(this).attr("data-description");
        var heading = $(this).attr("data-heading");
        var link_text = $(this).attr("data-linkText");
        var link = $(this).attr("data-link");
        console.log(heading);
        if(description == ""){
            $(".show_product_data_js").html("");
        }
        else{
            $(".show_product_data_js").html(description);
        }
        if(heading == ""){
            
            $(".show_product_title_js").html("");
        }
        else{
            $(".show_product_title_js").html(heading);
        }
        
        $(".show_product_link_js").html(link_text);
        $(".show_product_link_js").attr('href',link);
    });
});

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode > 31 &&
        (charCode < 48 || charCode > 57))
        return false;

    return true;
}