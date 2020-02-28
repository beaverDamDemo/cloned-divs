$(document).ready(function() {
  "use strict";

  $('#itemsWrapper').append("<div class='item item-0 clonable' data-item='item-0' id='item_0'></div>");
  $('#itemsWrapper').append("<div class='item item-1 clonable' data-item='item-1' id='item_1'></div>");
  $('#itemsWrapper').append("<div class='item item-2 clonable' data-item='item-2' id='item_2'></div>");
  $('#itemsWrapper').append("<div class='item item-3 clonable' data-item='item-3' id='item_3'></div>");
  $('#itemsWrapper').append("<div class='item item-4 clonable' data-item='item-4' id='item_4'></div>");
  $('#itemsWrapper').append("<div class='item item-5 clonable' data-item='item-5' id='item_5'></div>");
  $('#itemsWrapper').append("<div class='item item-6 clonable' data-item='item-6' id='item_6'></div>");
  $('#itemsWrapper').append("<div class='item item-7 clonable' data-item='item-7' id='item_7'></div>");
  $('#itemsWrapper').append("<div class='item item-8 clonable' data-item='item-8' id='item_8'></div>");
  $('#itemsWrapper').append("<div class='item item-9 clonable' data-item='item-9' id='item_9'></div>");
  $('#itemsWrapper').append("<div class='item item-10 clonable' data-item='item-10' id='item_10'></div>");
  $('#itemsWrapper').append("<div class='item item-11 clonable' data-item='item-11' id='item_11'></div>");
  $('#itemsWrapper').append("<div class='item item-12 clonable' data-item='item-12' id='item_12'></div>");

  let droppable;
  let arrayOfStars = [];
  let manualPositioning = [{
      'scale': '0.53',
      'left': '276'
    },
    {
      'scale': '0.44',
      'left': '228'
    },
    {
      'scale': '0.3875',
      'left': '203'
    },
    {
      'scale': '0.335',
      'left': '174'
    },
    {
      'scale': '0.308',
      'left': '159'
    },
    {
      'scale': '0.292',
      'left': '151'
    },
    {
      'scale': '0.262',
      'left': '136'
    }
  ]

  function createDraggable(element, b, additionalOffsetBool, wid, additionalLeftOffset, hei, additionalTopOffset) {
    let startX, startY;

    Draggable.create($(element), {
      bounds: b,
      onPress: function(e) {
        if (additionalOffsetBool == true) {
          this.applyBounds({ top: -additionalTopOffset, left: -additionalLeftOffset, width: wid, height: hei });
        }
        droppable = this.target;
        let $data = $(droppable).data('item');
        increaseClonedZIndex($data);
      },
      onDrag: function(e) {
        let $top = $(droppable).position().top;
        let $left = $(droppable).position().left;
        let $data = $(droppable).data('item');

        if ($(droppable).hasClass('clonable')) {
          if (this.hitTest($('#dropAreaTop'))) {
            $(droppable).clone()
              .addClass("cloned foo " + $(droppable).data('item') + "'")
              .removeClass('clonable')
              .appendTo($('#dropAreaBottom'));
            $(droppable).clone()
              .addClass("cloned quux " + $(droppable).data('item') + "'")
              .removeClass('clonable')
              .appendTo($('#dropAreaTop'));

            increaseClonedZIndex($data);

            $(droppable).removeClass('clonable');

            setTimeout(function() {
              let _elSize = $('.cloned[data-item=' + $data + '].quux')[0].getBoundingClientRect();
              createDraggable(
                $('.cloned[data-item=' + $data + '].quux'),
                '#dropAreaTop',
                true,
                338 + _elSize.width - 8 + _elSize.width / 2,
                _elSize.width / 2,
                260 + _elSize.height * 2 - 16,
                _elSize.height - 8
              );
              Draggable.get($('.cloned[data-item=' + $data + '].quux')).kill();
              createDraggable(
                $('.cloned[data-item=' + $data + '].quux'),
                '#dropAreaTop',
                true,
                338 + _elSize.width - 8 + _elSize.width / 2,
                _elSize.width / 2,
                260 + _elSize.height * 2 - 16,
                _elSize.height - 8
              );
              createDraggable($('.cloned[data-item=' + $data + '].foo'),
                '#dropAreaBottom',
                true,
                338 + _elSize.width - 8 + _elSize.width / 2,
                _elSize.width / 2,
                260 + _elSize.height * 2 - 16,
                _elSize.height - 8
              );
              Draggable.get($('.cloned[data-item=' + $data + '].foo')).kill();
              $('.item[data-item=' + $data + ']').not('.cloned').hide();
            }, 16)
            moveOriginal($data, $left, $top);
          } //dropareatop hittest
        } //movoing clonable end
        else if ($(droppable).hasClass('cloned')) {
          if (this.hitTest($('#itemsWrapper'), '45%')) {
            // changing classes for item in order for it being like it was at page load, default
            $('.' + $(droppable).data('item')).css({
              'display': 'block'
            }).addClass('clonable')
            // and removing the copies of it
            removeClonedFoo($data);
            removeClonedQuux($data);
          } else if (this.hitTest($('#dropAreaTop'), '1%')) {
            moveClonedFoo($data, $left, $top);
            moveClonedQuux($data, $left, $top);
          }
        }
      } //onDrag end
    });
  }

  function copyContentToCircularContainers() {
    for (let j = 3; j <= 9; j++) {
      let ratio = $('.container-' + j).children().width() / 400;
      for (let k = 0; k < $('.container-' + j).children().length; k++) {
        $('.container-' + j + '-' + k).empty();
        $('#dropAreasContainer').clone()
          .addClass('iamcloned')
          .css({
            'transform': 'scale(' + manualPositioning[j - 3].scale + ') rotate(90deg)',
            'transform-origin': '0% 0% 0px',
            'background': 'none',
            'left': manualPositioning[j - 3].left + 'px',
            'top': '0px',
            'position': 'absolute'
          })
          .appendTo($('.container-' + j + '-' + k));
      }
    } //for oute
  }

  function removeClonedFoo(el) {
    $('.cloned[data-item=' + el + ']').remove();
  }

  function removeClonedQuux(el) {
    $('.cloned[data-item=' + el + ']').remove();
  }

  function moveOriginal(el, $left, $top) {
    $('.cloned[data-item=' + el + ']').css({
      'top': '0px',
      'transform': 'translate3d(' + ($left - 400) + 'px, ' + ($top) + 'px, 0px)'
    });
  }

  // this the bottom one
  function moveClonedFoo(el, $left, $top) {
    let newZ = 0;
    $.each($('#dropAreaBottom .item'), function(index, value) {
      if ($(value).css('z-index') > newZ) {
        newZ = $(value).css('z-index');
      }
    })
    $('.foo.cloned[data-item=' + el + ']').css({
      'top': '0px',
      'transform': 'translate3d(' + ($left) + 'px, ' + ($top) + 'px, 0px) scale(1)',
      'z-index': ++newZ
    });
  }

  function increaseClonedZIndex(el) {
    let newZ = 0;
    $.each($('#dropAreaBottom .item'), function(index, value) {
      if ($(value).css('z-index') > newZ) {
        newZ = $(value).css('z-index');
      }
    })
    $('.foo.cloned[data-item=' + el + ']').css({
      'z-index': ++newZ
    });
    $('.quux.cloned[data-item=' + el + ']').css({
      'z-index': ++newZ
    });
  }

  // this the top one
  function moveClonedQuux(el, $left, $top) {
    let newZ = 0;
    $.each($('#dropAreaBottom .item'), function(index, value) {
      // console.log('current zindex: ', $(value).css('z-index'))
      if ($(value).css('z-index') > newZ) {
        newZ = $(value).css('z-index');
      }
    })
    $('.quux.cloned[data-item=' + el + ']').css({
      'top': '0px',
      'transform': 'translate3d(' + ($left) + 'px, ' + ($top) + 'px, 0px) scale(1)',
      'filter': 'contrast(200%)',
      'z-index': ++newZ
    });
  }

  function enableClonable(el) {
    // console.log('el: ', el)
    $('.item[data-item=' + el + ']').addClass('clonable');
  }

  /* entry point*/
  let rnd;
  $.each($('.item'), function(index, value) {
    $(value).css({
      'transform': 'translate(' + (Math.random() * 320) + 'px, ' + (Math.random() * 440) + 'px)'
    });
    createDraggable(value, '#itemsWrapper', false, -999, -999, -999, -999);
  });

  let tempco = 0;
  $(document).on('keypress', function(e) {
    let ky = e.keyCode;
    if (ky == 32) {
      var shown = $('.finalGreeting').hasClass('on');
      $('.finalGreeting').toggleClass('on', !shown).toggleClass('off', shown);
      $('#starsWrapper').removeClass('active');
    } else if (ky == 51) {
      $('main').toggleClass('active');
    } else if (ky == 52) {
      console.log("copyng to copyContentToCircularContainers")
      copyContentToCircularContainers();
    }
  });

  $("#slider").slider({
    orientation: 'vertical',
    value: 7,
    min: 1,
    max: 7,
    step: 1,
    tabindex: 1,
    slide: function(event, ui) {
      $("div[class^='container-']").removeClass('active');
      switch (ui.value) {
        case 1:
          $('.container-9').addClass('active');
          break;
        case 2:
          $('.container-8').addClass('active');
          break;
        case 3:
          $('.container-7').addClass('active');
          break;
        case 4:
          $('.container-6').addClass('active');
          break;
        case 5:
          $('.container-5').addClass('active');
          break;
        case 6:
          $('.container-4').addClass('active');
          break;
        case 7:
          $('.container-3').addClass('active');
          break;
        default:
          console.warn("Unexpected slider value");
      }
    }
  });

  $('#buttonNext').on('click', function() {
    $('main').addClass('active');
    copyContentToCircularContainers();
  });
  $('#buttonPrev').on('click', function() {
    $('main').removeClass('active');
    setTimeout(() => {
      for (let j = 3; j <= 9; j++) {
        for (let k = 0; k < $('.container-' + j).children().length; k++) {
          $('.container-' + j + '-' + k).empty();
        }
      }
    }, 1250)
  });

})