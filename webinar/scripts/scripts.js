jQuery(document).ready(function () {
  $('.scroll-to-register-form_js').click(function() {
    $('html, body').animate({
      scrollTop: $('#registerForWebinar').offset().top - 0
    });
  });
});
