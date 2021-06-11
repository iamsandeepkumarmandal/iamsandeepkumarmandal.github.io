$(document).keydown(function(event){
    if(event.keyCode==123){
        return false;
    }
    else if (event.ctrlKey && event.shiftKey && event.keyCode==73){        
             return false;
    }
    var pressedKey = String.fromCharCode(event.keyCode).toLowerCase();

    if (event.ctrlKey && (pressedKey == "c" || pressedKey == "u")) {
      //  alert('Sorry, This Functionality Has Been Disabled!'); 
        //disable key press porcessing
        return false; 
    }
});

$(document).on("contextmenu", function (e) {
     e.preventDefault();
});


jQuery(document).ready(function () {
    $(document).on('click', '.get_product_details_js', function () {
        $('.get-order-details-popup-wrapper').addClass('active');
        var productName = $(this).attr('data-product');
        var productImage = $(this).attr('data-image-url');
        $('.selected_product_name_js').text(productName);
        $('.selected_product_image_js').attr('src',productImage);
    })
    $(document).on('click', '.close_get_quote_js', function () {
        $('.get-order-details-popup-wrapper').removeClass('active');
        //$('.selected_product_name_js').text('');
        //$('.selected_product_image_js').attr('src','');
    })
});

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

