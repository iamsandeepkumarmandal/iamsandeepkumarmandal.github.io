// $(document).keydown(function(event){
//     if(event.keyCode==123){
//         return false;
//     }
//     else if (event.ctrlKey && event.shiftKey && event.keyCode==73){        
//              return false;
//     }
//     var pressedKey = String.fromCharCode(event.keyCode).toLowerCase();

//     if (event.ctrlKey && (pressedKey == "c" || pressedKey == "u")) {
//         alert('Sorry, This Functionality Has Been Disabled!'); 
//         //disable key press porcessing
//         return false; 
//     }
// });

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode > 31 &&
        (charCode < 48 || charCode > 57))
        return false;

    return true;
}
// $(document).on("contextmenu",function(e){        
//  //  e.preventDefault();
// });
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
}
$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if (scroll > 1) {
        $(".header").addClass("active");
    } else {
        $(".header").removeClass("active");
    }
});

var textArray = ["Faster, Better Inventory Decisions", "Start your planning Journey today ", "Achieve higher service with lower inventories and fewer expediates", "Increase the flow of relevant materials and information", "Unlock your teams potential with formal supply chain planning training "];
var index = 0;
setInterval(function () {
    $("#headerText_js").animate({
        opacity: 0
    }, function () {
        if (textArray.length > index) {
            $(this).text(textArray[index]).animate({
                opacity: 1
            })
            index++;
        } else index = 0;
    });
}, 4000);


jQuery(document).ready(function () {
    includeHTML();
    var getWidth = $(window).width();
    var customerPraiseOptions = {
        pagerCustom: '#bx-pager',
        controls: false,
        autoStart: true,
        auto: true,
    };
    if (getWidth <= 480) {
        customerPraiseOptions.adaptiveHeight = true;
    }
    $('.bxslider').bxSlider(customerPraiseOptions);
    $(".banner_slider_js").bxSlider({
        controls: false,
        autoStart: true,
        auto: true,
        mode: 'fade',
        speed: 1500,
        pager: false
    });
    $(".main_banner_js").bxSlider({
        controls: false,
        autoStart: true,
        auto: true,
        speed: 1500,
        pager: true
    });
    var clientsSliderOptions = {
        minSlides: 8,
        maxSlides: 8,
        slideWidth: 150,
        slideMargin: 10,
        responsive: true,
        pager: false,
    };
    if (getWidth <= 480) {
        clientsSliderOptions.minSlides = 1;
        clientsSliderOptions.maxSlides = 1;
    }
    if (getWidth > 480 && getWidth <= 640) {
        clientsSliderOptions.minSlides = 2;
        clientsSliderOptions.maxSlides = 2;
    }
    if (getWidth > 640 && getWidth <= 768) {
        clientsSliderOptions.minSlides = 4;
        clientsSliderOptions.maxSlides = 4;
    }
    if (getWidth > 768 && getWidth <= 992) {
        clientsSliderOptions.minSlides = 5;
        clientsSliderOptions.maxSlides = 5;
    }
    if (getWidth > 992 && getWidth <= 1199) {
        clientsSliderOptions.minSlides = 6;
        clientsSliderOptions.maxSlides = 6;
    }

    $(".clients_slider_js").bxSlider(clientsSliderOptions);

    $(".trigger_menu_js").click(function () {
        $(".main-menu").addClass("active");
    });
    $(".close_menu_js").click(function () {
        $(".main-menu").removeClass("active");
    });
    var owl = $('.owl-carousel.customer_slider_js');
    owl.owlCarousel({
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            768: {
                margin: 5,
                items: 3
            },
            1000: {
                margin: 5,
                items: 5
            }
        }
    });
    var partnersSlider = $(".owl-carousel.partners_js");
    partnersSlider.owlCarousel({
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            640: {
                margin: 5,
                items: 3
            },
            768: {
                margin: 5,
                items: 3
            },
            1000: {
                margin: 5,
                items: 3
            }
        }
    });
    $(document).on('click', '.trigger_contact_js', function () {
        $(".request-demo-wrapper").addClass("active");
    })
    $(document).on('click', '.close_contact_us_js', function () {
        $(".request-demo-wrapper").removeClass("active");
    });
    $(document).on('click', '.journey-text a', function () {
        var getDetailsId = $(this).attr('data-details-id');
        $(getDetailsId).toggleClass('active');
        if (getWidth < 768) {
            $('html, body').animate({
                scrollTop: $(getDetailsId).offset().top - 50
            }, 1000);
        }
    });
    $(document).on('click', '.slow_scroll_js', function (e) {
        var getId = $(this).attr('href');
        if (getId.split('#')[1] == "") {
            e.preventDefault();
        } else {
            var selector = '#' + getId.split('#')[1];
            $('html, body').animate({
                scrollTop: $(selector).offset().top - 70
            }, 500);
            return false;
        }
    });
});