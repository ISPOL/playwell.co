$(function(){
  resizeHeader();
  scrollToNav();
  modalPopUp();
  scrollToTop();
  stickyNav();

  // setTimeout(function () {$('#myModal').modal('show')}, 5000);
  $('section.seventh .toggle-description').on('click', function(e){
    e.preventDefault();
    var name = $(this).data('name')
    $('section.seventh .team-description').slideDown( "medium" );
    $('.collin, .cameron, .jana, .mikkel').hide();
    $('section.seventh .team-description .' + name).show();
    // $(this).addClass('active');
    // var name = $(this).find('b');
    // $(name).css('color', '#EB6057 !important');

  });


  $('section.seventh .team-description .description-close').on('click', function(e){
    e.preventDefault();
    $('section.seventh .team-description').slideUp( "medium" );

  });
  $('.more-info').on('click', function(e){
    e.preventDefault();
    $(this).parent().parent().slideUp( "fast" );

  });
  $('.close-info').on('click', function(e){
    e.preventDefault();
    $(this).parent().parent().find('.overview').slideDown('fast')
  });
  $('a.raised.mobile-application').on('click', function(e){
    e.preventDefault();
    window.location.href = "https://camerobarker.typeform.com/to/QdTaTP";
  });
  $('.stickynav.mobile a').on('click', function(e){
    $(".btn-navbar").click(); //bootstrap 2.x
    $(".navbar-toggle").click() //bootstrap 3.x by Richard
  });
  $('.raised').on('click', function(e){
    e.preventDefault();
  });

  $( ".toggle-description" ).hover(
    function() {
      $(this).addClass('active');
      var name = $(this).find('b');
      $(name).css('color', '#EB6057');
    }, function() {
      var name = $(this).find('b');
      $(name).css('color', 'black');
      $(this).removeClass('active');
    }
  );
});


function resizeHeader(){
  var window_height = $(window).height();
  $('header').height(window_height);

  $( window ).resize(function() {
    $('header').height(window_height);
  });
}

function stickyNav(){

  $(window).scroll($.throttle(10, function() {
    var scrollTop     = $(window).scrollTop(),
        elementOffset = $('.third').offset().top + 560,
        windowWidth = $(window).width(),
        distance      = (elementOffset - scrollTop);

    var edge = $(window).scrollTop();
    if(windowWidth > 760){
      if (distance <= edge){
        $('.stickynav').fadeIn('fast');
        // $('.container-fluid').addClass('fixed');
      }else{
        $('.stickynav').fadeOut('fast');
        // $('.second').removeClass('fixed');
        // $('.container-fluid').removeClass('fixed');
      }
    }
  }));
}

function scrollToNav(){
  $('.scrollable a').on('click', function(){
    var data = $(this).data('id')
    var $el = $('#' + data);
    var windowWidth = $(window).width();
    var toppadding = $el.css('top-padding');
    // if(data == "courses"){var offset = $el.offset().top - 60;}
    if(windowWidth > 760){
      var offset = $el.offset().top - 40;
    }else{
      var offset = $el.offset().top - 40;
    }
    $('html, body').animate({
     scrollTop: offset
   }, 1000);
    return false;
  });
}
function scrollToTop(){
  $('.scroll-to-top').on('click', function(){
    $('html, body').animate({
     scrollTop: 0
   }, 1000);
    return false;
  });
}

function modalPopUp(){
  $('#myModal').modal({
    show:     false
  });
}
