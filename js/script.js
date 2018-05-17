$('document').ready(function () {

  var nav = $('.main-header__nav');

  $(window).scroll(function () {
    if ($(this).scrollTop() > 40) {
      nav.addClass("main-header__nav--fixed-js");
    } else {
      nav.removeClass("main-header__nav--fixed-js");
    }
  });
});

$(document).ready(function () {
  $('.main-header__nav-link').click(function () {
    var scroll_id = $(this).attr('href');
    if ($(scroll_id).length != 0) {
      $('html, body').animate({
        scrollTop: $(scroll_id).offset().top
      }, 500);
    }
    return false;
  });
});