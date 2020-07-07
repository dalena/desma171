$(document).ready(function () {

  var elementX = 0,
    elementY = 0,
    elementW = 0,
    elementH = 0,
    mouseX = 0,
    mouseY = 0;

  $(document).mousemove(function (e) {

    var position = $(".parallax").offset(),
      obj = $(".parallax");
    elementX = position.left;
    elementY = position.top;

    elementW = obj.width();
    elementH = obj.height();

    var halfW = elementW / 2;
    var halfH = elementH / 2;

    mouseX = (e.pageX - elementX - halfW) / halfW;
    mouseY = (e.pageY - elementY - halfH) / halfH;
    mouseX = Math.round(mouseX * 100) / 100;
    mouseY = Math.round(mouseY * 100) / 100;

    // console.log(elementX+" "+elementY+" "+halfW+" "+halfH);

    $(".parallax").css("transform", "rotateX(" + mouseY * -10 + "deg) rotateY(" + mouseX * 10 + "deg)");

    $(".parallax2").css("transform", "translateX(" + mouseX * 10 + "px) translateY(" + mouseY * 10 + "px)");

    $(".parallax3").css("transform", "translateX(" + mouseX * 30 + "px) translateY(" + mouseY * 30 + "px)");

    var $allVideos = $('video');

    $('video').on('play', function (e) {
      $allVideos.not(this).each(function () {
        this.pause()
      })
    });
  });
  var hash = window.location.hash;
  if (hash && $(hash).length) {
    openSection(hash);
  }

  $.get('date.json', function (data) {
    $('#updated_date').html(data.date);
  });

  $('#links .button').click(function () {
    var selected = '#' + $(this).data('id');
    openSection(selected);
  });
  $('#schedule h3').click(function () {
    var selected = $(this).attr('id');
    openSection('#schedule', selected);
  });
  $('#projects h3').click(function () {
    var selected = $(this).attr('id');
    openSection('#projects', selected);
  });
  $('#final h3').click(function () {
    var selected = $(this).attr('id');
    openSection('#final', selected);
  });

});

function openSection(id, heading) {
  if (open && open === heading) closeSection(heading);
  else {
    $('.block').hide();
    if (heading) $('.toggle').hide();
    $(id).show();

    if (heading) {
      $('#' + heading + '-content').show();
      if ($(id + ' div.toggle:visible')[0]) {
        open = $(id + ' div.toggle:visible')[0].id.substring(0, 2);
      }
    }
    // window.location.hash = id.substring(1);
    // if (!heading) {
    //   $(window).scrollTop();
    // }
  }
}

function closeSection(heading) {
  $('.toggle').hide();
  open = null;
}