$(document).ready(function() {
    $('.search-videos-js').click(function() {
        $('.search-slide-popup_js').addClass('active');
    });

    $('.close-search-slide-popup_js').click(function() {
        $('.search-slide-popup_js').removeClass('active');  
    });
    $.ajax({
        url: 'https://stage-edit.videoken.com/flask_restful/todo/api/v1.0/tasks',
        method: 'get',
        success: function(response) {
          console.log(response);
        },
        error: function(error) {
          console.log(error);
        },
    })
});