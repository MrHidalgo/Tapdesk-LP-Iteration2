"use strict";

/*
*
* ============================
* ============================
*
* Include lib:
*
* - webFontLoader.js;
* - preventBehavior.js;
* - svg4everybody.js;
*
* ============================
* ============================
* */

/**
 * @name initHamburger
 * @description Init hamburger logic with animated
 */
var initHamburger = function initHamburger() {

  var btn = document.querySelector("[hamburger-js]"),
      hideScrollContainer = document.querySelectorAll("html, body"),
      mobileContainer = document.querySelector("[mobile-block-js]");

  if (btn) {
    btn.addEventListener("click", function (ev) {
      var elem = ev.currentTarget;

      elem.classList.toggle("is-active");
      mobileContainer.classList.toggle("is-open");

      hideScrollContainer.forEach(function (val, idx) {
        val.classList.toggle("is-hideScroll");
      });
    });
  }
};

/**
 * @name initHeaderFixed
 * @description Fixing the site header in the scrolling page.
 */
var initHeaderFixed = function initHeaderFixed() {

  var countScroll = $(window).scrollTop(),
      headerElement = $('.header');

  if (countScroll > 10) {
    headerElement.addClass("header--fixed");
  } else {
    headerElement.removeClass("header--fixed");
  }
};

/**
 *
 */
var initPopups = function initPopups() {

  $('[popup-js]').magnificPopup({
    type: 'iframe',
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'is-show',
    callbacks: {
      beforeOpen: function beforeOpen() {
        this.st.mainClass = this.st.el.attr('data-effect');
      },
      close: function close() {}
    }
  });
};

/**
 * @name initPreventBehavior
 * @description
 */
var initPreventBehavior = function initPreventBehavior() {
  var link = document.querySelectorAll("a");

  link.forEach(function (val, idx) {

    val.addEventListener("click", function (e) {
      if (val.getAttribute("href") === "#") {
        e.preventDefault();
      }
    });
  });
};

/**
 * @name initSmoothScroll
 * @description Smooth transition to anchors to the block.
 */
var initSmoothScroll = function initSmoothScroll() {
  var btnName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "[anchor-js]";
  var animateSpeed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 750;


  $(btnName).on("click", function (e) {
    var linkHref = $(e.currentTarget).attr('href'),
        headerHeight = $(".header").outerHeight() || 0,
        topHeightOffset = $(linkHref).offset().top - headerHeight;

    $('body, html').animate({
      scrollTop: topHeightOffset
    }, animateSpeed);

    var noHashURL = window.location.href.replace(/#.*$/, '');
    window.history.replaceState('', document.title, noHashURL);

    e.preventDefault();
  });
};

/**
 * @name initStellar
 * @description Stellar.js is a jQuery plugin that provides parallax scrolling effects to any scrolling element.
 *
 * Parallax Elements
 * - data-stellar-ratio="1"
 *
 * Parallax Backgrounds
 * - data-stellar-background-ratio="1"
 */
var initStellar = function initStellar() {
  if ($("[parallax-js]").length) {
    $(function () {
      $.stellar({
        // Set scrolling to be in either one or both directions
        horizontalScrolling: false,
        verticalScrolling: true,

        // Set the global alignment offsets
        horizontalOffset: 0,
        verticalOffset: 0,

        // Refreshes parallax content on window load and resize
        responsive: false,

        // Select which property is used to calculate scroll.
        // Choose 'scroll', 'position', 'margin' or 'transform',
        // or write your own 'scrollProperty' plugin.
        scrollProperty: 'scroll',

        // Select which property is used to position elements.
        // Choose between 'position' or 'transform',
        // or write your own 'positionProperty' plugin.
        positionProperty: 'position',

        // Enable or disable the two types of parallax
        parallaxBackgrounds: true,
        parallaxElements: true,

        // Hide parallax elements that move outside the viewport
        hideDistantElements: false

        // Customise how elements are shown and hidden
        // hideElement: function($elem) { $elem.hide(); },
        // showElement: function($elem) { $elem.show(); }
      });
    });
  }
};

/**
 * @name initSvg4everybody()
 * @description SVG for Everybody adds external spritemaps support to otherwise SVG-capable browsers.
 */
var initSvg4everybody = function initSvg4everybody() {

  svg4everybody();
};

/**
 * @name initSwiper
 * @description initialize Swiper
 */
var initSwiper = function initSwiper() {

  /**
   *
   * @returns {{wrapperClass: string, slideClass: string, direction: string, loop: boolean, watchOverflow: boolean, normalizeSlideIndex: boolean, grabCursor: boolean, freeMode: boolean, effect: string, fadeEffect: {crossFade: boolean}, touchMoveStopPropagation: boolean, simulateTouch: boolean, allowSwipeToNext: boolean, allowSwipeToPrev: boolean, allowPageScroll: string, slidesPerView: number, spaceBetween: number, pagination: {el: string, clickable: boolean}, navigation: {nextEl: string, prevEl: string}, on: {init: on.init}}}
   */
  var swiperOption = function swiperOption() {
    var paginationPosition = function paginationPosition(slider) {
      var textContainer = slider.find('.slider__text-wrapper'),
          paginationContainer = slider.find('.slider__pagination');

      var maxHeight = 0;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = $(textContainer)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var el = _step.value;

          if ($(el).outerHeight(true) > maxHeight) {
            maxHeight = $(el).outerHeight(true);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if ($(window).width() > 767) {
        $(paginationContainer).css({
          'bottom': 'auto',
          'top': maxHeight
        });
      } else {
        $(paginationContainer).removeAttr('style');
      }
    };

    return {
      wrapperClass: "swiper-wrapper",
      slideClass: "swiper-slide",
      direction: 'horizontal', // 'horizontal' or 'vertical'
      loop: true,
      watchOverflow: true,
      normalizeSlideIndex: true,

      grabCursor: false,
      freeMode: false,

      effect: 'fade', // "slide", "fade", "cube", "coverflow" or "flip"
      fadeEffect: {
        crossFade: true
      },

      // off touch for destop
      touchMoveStopPropagation: false,
      simulateTouch: false,
      allowSwipeToNext: true,
      allowSwipeToPrev: true,
      allowPageScroll: "auto ",

      slidesPerView: 1,
      spaceBetween: 0,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },

      // Navigation arrows
      navigation: {
        nextEl: '.slider__button-next',
        prevEl: '.slider__button-prev'
      },
      on: {
        init: function init() {
          var slider = this.$el;

          paginationPosition(slider);
        },
        resize: function resize() {
          var slider = this.$el;

          paginationPosition(slider);
        },
        slideChange: function slideChange() {
          var slider = this.$el,
              duplicateSlide = slider.find('.swiper-slide-duplicate .slider__content-left, .swiper-slide-duplicate .slider__content-right');

          duplicateSlide.removeClass('viewport-hide-js');
        }
      }
    };
  };

  /**
   * @name mySwiperFinding
   *
   * @description
   */
  var mySwiperFinding = new Swiper('.swiper-container--finding', swiperOption());

  /**
   * @name mySwiperSave
   *
   * @description
   */
  var mySwiperSave = new Swiper('.swiper-container--save', swiperOption());

  /**
   * @name mySwiperManage
   *
   * @description
   */
  var mySwiperManage = new Swiper('.swiper-container--manage', swiperOption());

  /**
   * @name mySwiperControl
   *
   * @description
   */
  var mySwiperControl = new Swiper('.swiper-container--control', swiperOption());

  var isAnyPartOfElementInViewport = function isAnyPartOfElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;
    var vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
    var horInView = rect.left <= windowWidth + 150 && rect.left + rect.width >= 0;

    return vertInView && horInView;
  };

  var mySwiperIterationOpt = {
    init: false,
    direction: 'horizontal',
    mousewheel: {
      releaseOnEdges: true
    },
    freeMode: true,
    grabCursor: true,
    slidesPerView: 'auto',
    on: {
      'init': function init() {
        $(this.$el).animate({ 'opacity': 1 }, 500);
      },
      'beforeDestroy': function beforeDestroy() {
        $('.swiper-container-iteration, .swiper-container-iteration .swiper-wrapper').attr('style', '');
      }
    }
  };

  var mySwiperIteration = undefined;

  $(window).on('load resize', function (ev) {

    if ($('.iteration').length > 0) {

      if ($(window).width() > 767) {

        mySwiperIteration = new Swiper('.swiper-container-iteration', mySwiperIterationOpt);
        mySwiperIteration.on('init', function () {
          $.each(mySwiperIteration.$wrapperEl.children(), function (idx, val) {
            if (idx === 0) {
              if (isAnyPartOfElementInViewport($(val)[0]) && $(val).hasClass('viewport-hideTimeline-js')) {
                $(val).removeClass('viewport-hideTimeline-js').addClass('viewport-startTimeline-js animated fadeIn');
              }
            }
          });
        });
        mySwiperIteration.on('slideChange slideMove slideChangeTransitionStart', function () {
          $.each(mySwiperIteration.$wrapperEl.children(), function (idx, val) {
            if (isAnyPartOfElementInViewport($(val)[0]) && $(val).hasClass('viewport-hideTimeline-js')) {
              $(val).removeClass('viewport-hideTimeline-js').addClass('viewport-startTimeline-js animated fadeIn');
            }
          });
        });
        mySwiperIteration.init();
      } else {

        if (mySwiperIteration !== undefined) {

          mySwiperIteration.destroy(true, true);
          mySwiperIteration = undefined;
        }
      }
    }
  });
};

/**
 *
 * @param elem
 * @param el
 */
var scrollAnimation = function scrollAnimation(elem, el) {

  $(elem).css({
    'animation-name': $(el).data('animation-name') ? $(el).data('animation-name') + ", fadeIn" : 'slideInUp, fadeIn',
    'animation-delay': $(el).data('animation-delay') || '0.15s',
    'animation-duration': $(el).data('animation-duration') || '1s'
  });
};

/**
 * @name initViewPortChecker
 * @description Detects if an element is in the viewport and adds a class to it
 *
 *
 * You can to add some attribute:
 *
 * <div data-vp-add-class="random"></div>                       > classToAdd
 * <div data-vp-remove-class="random"></div>                    > classToRemove
 * <div data-vp-remove-after-animation="true|false"></div>      > Removes added classes after CSS3 animation has completed
 * <div data-vp-offset="[100 OR 10%]"></div>                    > offset
 * <div data-vp-repeat="true"></div>                            > repeat
 * <div data-vp-scrollHorizontal="false"></div>                 > scrollHorizontal
 */

var initViewPortChecker = function initViewPortChecker() {
  var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "viewport-hide-js";
  var classNameToAdd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "viewport-show-js animated";
  var offsetVal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
  var callbackFunctionName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : scrollAnimation;


  $("." + className).not(".full-visible").each(function (idx, el) {

    $(el).viewportChecker({
      classToAdd: classNameToAdd,
      classToAddForFullView: 'full-visible',
      classToRemove: className,
      removeClassAfterAnimation: true,
      offset: offsetVal,
      repeat: false,
      callbackFunction: function callbackFunction(elem, action) {

        callbackFunctionName(elem, el);
      }
    });
  });
};

var initViewPortCheckerTour = function initViewPortCheckerTour() {
  var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "viewport-hideTimeline-js";
  var classNameToAdd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "viewport-startTimeline-js animated";
  var offsetVal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
  var callbackFunctionName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : scrollAnimation;


  $("." + className).not(".full-visible").each(function (idx, el) {

    if ($(window).width() < 768) {

      $(el).viewportChecker({
        classToAdd: classNameToAdd,
        classToAddForFullView: 'full-visible',
        classToRemove: className,
        removeClassAfterAnimation: true,
        offset: offsetVal,
        repeat: false,
        callbackFunction: function callbackFunction(elem, action) {
          callbackFunctionName(elem, el);
        }

      });
    }
  });
};

/**
 * @description Window on load.
 */
$(window).on("load", function (ev) {
  initHeaderFixed();
});

/**
 * @description Window on resize.
 */
$(window).on("resize", function (ev) {});

/**
 * @description Window on scroll.
 */
$(window).on("scroll", function (ev) {
  initHeaderFixed();
});

/**
 * @description Document DOM ready.
 */
$(document).ready(function (ev) {
  /**
   * =============================================
   * CALLBACK
   * =============================================
   */

  /**
   *
   * @param selector
   */
  var selectReset = function selectReset(selector) {
    if (selector === undefined) {
      var selector = 'select';
    }

    $(selector).each(function () {
      var valOption = $(this).children('option:selected');

      if (valOption.val() !== '0') {
        $(this).prev('span').addClass("is-choose");
      }

      $(this).prev('span').html(valOption.text());
    });
  };
  /**
   *
   * @param selector
   */
  var initSelect = function initSelect(selector) {
    if (selector === undefined) {
      var selector = 'select';
    }

    selectReset(selector);

    $(selector).on('change', function () {
      selectReset(this);
    });
  };

  /**
   *
   */
  var initPipelinesTabs = function initPipelinesTabs() {
    $('.pipelines__tabs').on('click', function (ev) {
      var elem = $(ev.currentTarget),
          elemID = elem.data('tabs-id');

      var tabsBody = $('.pipelines__tabs-body');

      $('.pipelines__tabs').removeClass('is-active');
      elem.addClass('is-active');

      $('.pipelines__slider-item').removeClass('is-show');
      $('.pipelines__slider-item-' + elemID).addClass('is-show');

      $('.pipelines__tabs-body > div').removeClass('is-active');
      $('.pipelines__tabs-body > div[data-tabs-body="' + elemID + '"]').addClass('is-active');
    });
  };

  /**
   *
   */
  var initVideo = function initVideo() {
    var vid = document.getElementById("video");

    if (vid) {
      /**
       *
       */
      vid.ontimeupdate = function () {
        var percentage = vid.currentTime / vid.duration * 100;
        $("[progress-video-js] span").css("width", percentage + "%");

        if (percentage === 100) {
          $("[progress-video-js] span").css("width", "0");
          $('[play-video-js]').fadeIn(300);
        }
      };

      /**
       *
       */
      $("[progress-video-js]").on("click", function (ev) {
        var offset = $(ev.currentTarget).offset(),
            left = ev.pageX - offset.left,
            totalWidth = $("[progress-video-js]").width(),
            percentage = left / totalWidth,
            vidTime = vid.duration * percentage;

        vid.currentTime = vidTime;
      });

      /**
       *
       */
      $('[play-video-js]').on('click', function (ev) {
        var elem = $(ev.currentTarget);

        if (!vid.paused) {
          vid.pause();
        } else {
          vid.play();
          elem.fadeOut(300);
        }
      });

      /**
       *
       */
      $(vid).on('click', function () {
        if (!vid.paused) {
          vid.pause();
          $('[play-video-js]').fadeIn(300);
        }
      });
    }
  };

  var initSupportLogic = function initSupportLogic() {
    var supportBlockBtn = $('[support-btn-js]'),
        supportBackTopicBtn = $('[support-back-topic-js]'),
        supportBackInsideBtn = $('[support-back-inside-js]'),
        supportTopicBtn = $('[support-topic-btn-js]'),
        supportTopicInsideBtn = $('[support-topicInside-btn-js]'),
        supportBackToTop = $('[back-to-top-js]'),
        blockNode = $('.help.help--block'),
        topicNode = $('.help.help--topic'),
        insideNode = $('.help.help--inside'),
        blockElemTitle = blockNode.find('h2'),
        insideElemTitle = insideNode.find('h2'),
        topicElemTitle = topicNode.find('h2');

    $('[support-search-js]').on('keydown', function (ev) {
      if (ev.which === 13) {
        supportBlockBtn.click();
      }
    });

    /**
     * @description support block section - go to topic
     */
    supportBlockBtn.on('click', function (ev) {
      var elem = $(ev.currentTarget),
          elemName = elem.find('p').text();

      supportBlockBtn.removeClass('is-active');
      supportBlockBtn.removeClass('zoomIn').addClass('zoomOut');

      elem.addClass('is-active');

      blockElemTitle.removeClass('fadeIn').addClass('fadeOut');
      topicElemTitle.html(elemName);

      setTimeout(function () {
        blockNode.fadeOut(300);

        topicNode.fadeIn(300);
        topicNode.addClass('is-topic');
      }, 450);
    });

    /**
     * @description support back from topic to block section
     */
    supportBackTopicBtn.on('click', function (ev) {
      topicNode.removeClass('is-topic');

      supportBlockBtn.removeClass('is-active zoomOut');

      blockElemTitle.removeClass('fadeOut');

      setTimeout(function () {
        topicNode.fadeOut(300);

        blockNode.fadeIn(300);
        supportBlockBtn.addClass('zoomIn');
        blockElemTitle.addClass('fadeIn');
      }, 1100);
    });

    /**
     * @description support topic section - go to inside
     */
    supportTopicBtn.on('click', function (ev) {
      var elem = $(ev.currentTarget),
          elemName = elem.find('span').text(),
          topicTitle = topicNode.find('h2').text();

      elem.addClass('is-inside');

      insideNode.find('.help__back span').html(topicTitle);
      insideElemTitle.html(elemName);

      setTimeout(function () {
        elem.removeClass('is-inside');

        topicNode.fadeOut(300);

        insideNode.fadeIn(300).addClass('is-descr');
        insideNode.find('div').addClass('slideInUp');
      }, 400);
    });

    supportTopicInsideBtn.on('click', function (ev) {
      var elem = $(ev.currentTarget),
          elemVal = elem.find('span').text(),
          elemHref = $(ev.currentTarget).attr('href'),
          headerHeight = $(".header").outerHeight() || 0,
          topHeightOffset = $(elemHref).offset().top - headerHeight;

      if (location.pathname.replace(/^\//, '') === ev.currentTarget.pathname.replace(/^\//, '') && location.hostname === ev.currentTarget.hostname) {
        var target = $(ev.currentTarget.hash);

        target = target.length ? target : initSmoothScroll$('[name=' + ev.currentTarget.hash.slice(1) + ']');

        if (target.length) {
          $('body, html').animate({
            scrollTop: topHeightOffset
          }, 1000);

          insideElemTitle.html(elemVal);

          // !!! IMPORTANT !!!
          // ============================
          // ============================
          // del after add real data
          // ============================
          var testVal = insideNode.find('.help__inside > .help__inside-cover > *').clone();
          insideNode.find('.help__inside-cover').append(testVal);
          // ============================
          // ============================
          // !!! IMPORTANT !!!!

          return false;
        }
      }
    });

    /**
     * @description
     */
    supportBackInsideBtn.on('click', function (ev) {
      insideNode.fadeOut(300).removeClass('is-descr');
      insideNode.find('div').removeClass('slideInUp');

      topicNode.fadeIn(300);
      topicNode.addClass('is-topic');
    });

    /**
     * @description
     */
    supportBackToTop.on('click', function (ev) {
      var elemHref = $(ev.currentTarget).attr('href'),
          headerHeight = $(".header").outerHeight() || 0,
          topHeightOffset = $(elemHref).offset().top - headerHeight;

      if (location.pathname.replace(/^\//, '') === ev.currentTarget.pathname.replace(/^\//, '') && location.hostname === ev.currentTarget.hostname) {
        var target = $(ev.currentTarget.hash);

        target = target.length ? target : $('[name=' + ev.currentTarget.hash.slice(1) + ']');

        if (target.length) {
          $('body, html').animate({
            scrollTop: topHeightOffset
          }, 1000);

          return false;
        }
      }
    });
  };

  var pricingTypes = function pricingTypes() {
    var countNum = 0,
        _blockName = '';

    $('[type-btn-js]').on('click', function (ev) {
      var btn = $(ev.currentTarget),
          btnDataAttr = btn.data('types'),
          plansNode = $('.plans__wrapper[data-plans="' + btnDataAttr + '"]');

      _blockName = btnDataAttr;

      $('[type-btn-js]').removeClass('is-active');
      btn.addClass('is-active');

      if (countNum === 0) {
        plansNode.slideDown(500);
        countNum++;
      } else {
        $('.plans__wrapper').hide();
        plansNode.fadeIn(450);
      }

      $('.types__checkbox').fadeIn(450).addClass('is-show');

      if ($('[checkbox-js]').is(':checked')) {
        $('[checkbox-js]').prop('checked', false).change();
      }
    });

    $('[checkbox-js]').on('change', function (ev) {
      var _elem = $(ev.currentTarget),
          _plansNode = $('.plans__wrapper[data-plans="' + _blockName + '"]'),
          _hiddenElem = _plansNode.find('.plans__block-item--hide'),
          _priceChangeElem = _plansNode.find('.plans__block-price');

      if (_elem.is(':checked')) {
        _hiddenElem.addClass('is-hide');

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _priceChangeElem[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var elNew = _step2.value;

            $(elNew).text($(elNew).data('new-price'));
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      } else {
        _hiddenElem.removeClass('is-hide');

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = _priceChangeElem[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var elOrigin = _step3.value;

            $(elOrigin).text($(elOrigin).data('origin-price'));
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    });
  };

  var initResourcesMainBtn = function initResourcesMainBtn() {
    var _masonryGrid = $('.exchequer__block-wrapper');

    $('.r-main__btn').on('click', function (ev) {
      var _btn = $(ev.currentTarget),
          _btnName = _btn.data('name');

      var _resourcesTitle = $('.exchequer__title');

      $('.r-main__btn').removeClass('is-active');
      _btn.addClass('is-active');

      _resourcesTitle.text(_btnName);

      _masonryGrid.masonry({
        itemSelector: '.mix.is-show',
        horizontalOrder: true
      });

      if (_btn.data('filter') === 'all') {
        $('.mix').removeClass('is-hide').addClass('is-show');
      } else {
        $('.mix').removeClass('is-hide is-show').addClass('is-hide');
        $(_btn.data('filter')).removeClass('is-hide').addClass('is-show');
      }

      _masonryGrid.masonry('reloadItems').masonry('layout');
    });

    if (document.querySelector('.exchequer__block-wrapper')) {
      _masonryGrid.masonry({
        itemSelector: '.mix',
        horizontalOrder: true
      });
    }
  };

  var initSearchDrop = function initSearchDrop() {
    var _inputDrop = $('[input-drop-js]'),
        _dropBtn = $('.c-form__dropdown a');

    var showDropFocus = function showDropFocus(ev) {
      if ($(ev).val().length > 0) {
        $(ev).closest('.c-form__field').addClass('is-focus').find('.c-form__dropdown').slideDown(450);
      } else {
        hideDrop(ev.currentTarget);
      }
    };

    var hideDrop = function hideDrop(el) {
      $(el).closest('.c-form__field').removeClass('is-focus').find('.c-form__dropdown').hide();
    };

    _inputDrop.on('focus', function (ev) {
      showDropFocus(ev.currentTarget);
    });
    _inputDrop.on('keyup', function (ev) {
      showDropFocus(ev.currentTarget);

      // if($(ev.currentTarget).val().length === 0) {
      //   hideDrop(ev.currentTarget);
      // }
    });
    // _inputDrop.on('blur', (ev) => {
    //   setTimeout(() => {
    //     hideDrop(ev.currentTarget);
    //   }, 100);
    // });
    _dropBtn.on('click', function (ev) {
      if ($('#help').length > 0) {
        $('.help--block, .help--topic').hide(150);
        $('.help--inside').fadeIn(450).addClass('is-descr');

        var elemHref = $(ev.currentTarget).attr('href'),
            headerHeight = $(".header").outerHeight() || 0,
            topHeightOffset = $(elemHref).offset().top - headerHeight;

        if (location.pathname.replace(/^\//, '') === ev.currentTarget.pathname.replace(/^\//, '') && location.hostname === ev.currentTarget.hostname) {
          var target = $(ev.currentTarget.hash);

          target = target.length ? target : $('[name=' + ev.currentTarget.hash.slice(1) + ']');

          if (target.length) {
            $('body, html').animate({
              scrollTop: topHeightOffset
            }, 1000);

            hideDrop('[input-drop-js]');

            return false;
          }
        }
      }
    });

    $('body').on('click', function (e) {
      var className = ".c-form--r-main, .c-form--assistance";

      if (!$(e.target).closest(className).length) {
        hideDrop('[input-drop-js]');
      }
    });
  };

  var initPricingTabs = function initPricingTabs() {
    if ($('.plan__tabs-bg').length) {
      $(window).on('resize', function (ev) {
        $('.plan__tabs-bg').css({
          'width': $('.plan__tabs-1')[0].clientWidth
        });
      });

      $('.plan__tabs-bg').css({
        'width': $('.plan__tabs-1')[0].clientWidth
      });
    }

    $('.plan__tabs').on('click', function (ev) {
      var _el = $(ev.currentTarget),
          _elID = _el.attr('data-id'),
          _elName = _el.attr('data-name');

      var _bgNode = $('.plan__tabs-bg');

      $('.plan__tabs').removeClass('is-active');
      _el.addClass('is-active');

      if (_elID === '2') {
        $('.plan__tabs-1, .plan__tabs-3').addClass('is-border-hide');
      } else {
        $('.plan__tabs-1, .plan__tabs-3').removeClass('is-border-hide');
      }

      /* animation tabs bg */
      if (_elID === '1') {
        _bgNode.attr('style', 'width:' + _el[0].clientWidth + 'px;transform:translate(0);');
      } else if (_elID === '2') {
        _bgNode.attr('style', 'width:' + _el[0].clientWidth + 'px;transform:translate(' + $('.plan__tabs-1')[0].clientWidth + 'px);');
      } else if (_elID === '3') {
        _bgNode.attr('style', 'width:' + _el[0].clientWidth + 'px;transform:translate(' + ($('.plan__tabs-2')[0].clientWidth + $('.plan__tabs-1')[0].clientWidth) + 'px);');
      }
      /* animation tabs bg :: end */

      $('.plans__header-1, .plans__box-wrapper-1').attr('style', '');

      $('.plans__row').hide();
      $('.plans__row[data-name="' + _elName + '"]').fadeIn(750);
    });

    $('[plans-checkbox-js]').on('change', function (ev) {
      var _elem = $(ev.currentTarget),
          _plansNode = _elem.closest('.plans'),
          _hiddenElem = _plansNode.find('.plans__box--hide'),
          _priceChangeElem = _plansNode.find('.plans__box-price i');

      if (_elem.is(':checked')) {
        _hiddenElem.hide();

        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = _priceChangeElem[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var elNew = _step4.value;

            $(elNew).text($(elNew).attr('data-new-price'));
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      } else {
        _hiddenElem.show();

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = _priceChangeElem[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var elOrigin = _step5.value;

            $(elOrigin).text($(elOrigin).attr('data-origin-price'));
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      }
    });
  };

  var initStickyElem = function initStickyElem() {
    stickybits('#why__title', {
      useStickyClasses: true,
      stickyBitStickyOffset: 80
    });
  };

  var initAffiliate = function initAffiliate() {
    var initCopyToClipboard = function initCopyToClipboard(str) {
      var el = document.createElement('textarea');

      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';

      document.body.appendChild(el);

      var selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;

      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);

      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
    };

    var isAnyPartOfElementInViewport = function isAnyPartOfElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      var windowHeight = window.innerHeight || document.documentElement.clientHeight;
      var windowWidth = window.innerWidth || document.documentElement.clientWidth;
      var vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
      var horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

      return vertInView && horInView;
    };

    $('.affiliate-inside__input-btn').on('click', function (ev) {
      initCopyToClipboard($(ev.currentTarget).prev('input').val());
    });

    $('[modal-viewAgreement-js], [modal-makeWithdrawal-js], [modal-paymentHistory-js], [modal-updateInfo-js]').magnificPopup({
      type: 'inline',
      fixedContentPos: true,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      removalDelay: 300,
      mainClass: 'is-show',
      callbacks: {
        beforeOpen: function beforeOpen() {
          this.st.mainClass = this.st.el.attr('data-effect');
        },
        close: function close() {}
      }
    });
    $('[modal-agreementClose-js]').on('click', function (ev) {
      $.magnificPopup.close();
    });
    $('[modal-updateClose-js]').on('click', function (ev) {
      $.magnificPopup.close();
    });

    $('.c-modal__body-scroll').on('scroll', function (ev) {
      if (isAnyPartOfElementInViewport($('[visible-top-js]')[0])) {
        $(ev.currentTarget).closest('.c-modal').find('.c-modal__header').removeClass('is-shadow');
      } else {
        $(ev.currentTarget).closest('.c-modal').find('.c-modal__header').addClass('is-shadow');
      }

      if (isAnyPartOfElementInViewport($('.c-modal__input-wrapper')[0])) {
        $(ev.currentTarget).parent().addClass('is-bottom');
      } else {
        $(ev.currentTarget).parent().removeClass('is-bottom');
      }
    });

    $('#paymentHistory .c-modal__body-scroll').on('scroll', function (ev) {
      if ($(ev.currentTarget).scrollTop() > 10) {
        $('#paymentHistory .c-modal__body-content').addClass('is-scroll');
      } else {
        $('#paymentHistory .c-modal__body-content').removeClass('is-scroll');
      }
    });

    if ($('.affiliate-appForm__tab-bg').length) {
      $(window).on('resize', function (ev) {
        $('.affiliate-appForm__tab-bg').css({
          'width': $('.affiliate-appForm__tab-1')[0].clientWidth
        });
      });

      $('.affiliate-appForm__tab-bg').css({
        'width': $('.affiliate-appForm__tab-1')[0].clientWidth
      });
    }

    $('.affiliate-appForm__tab').on('click', function (ev) {
      var _el = $(ev.currentTarget),
          _elName = _el.attr('data-name'),
          _bgNode = $('.affiliate-appForm__tab-bg');

      if (_elName === 'team') {
        $('.affiliate__form-hidden').fadeIn(300);
        _bgNode.attr('style', 'width:' + _el[0].clientWidth + 'px;transform:translate(' + $('.affiliate-appForm__tab-1')[0].clientWidth + 'px);');
      } else {
        $('.affiliate__form-hidden').fadeOut(300);
        _bgNode.attr('style', 'width:' + _el[0].clientWidth + 'px;transform:translate(0);');
      }

      $('.affiliate-appForm__tab').removeClass('is-active');
      $(ev.currentTarget).addClass('is-active');
    });

    $('[affiliate-accrount-js]').on('change', function (ev) {
      var _el = $(ev.currentTarget),
          _elID = _el.attr('data-id');

      $('.affiliate-appForm__container').hide();
      $('.affiliate-appForm__container.affiliate-appForm__container-' + _elID).fadeIn(300);

      $('.affiliate-appForm__tab-bg').css({
        'width': $('.affiliate-appForm__tab-1')[0].clientWidth
      });
    });

    $('[appForm-login-js]').on('click', function (ev) {
      $('.affiliate-appForm__container-2').fadeIn(300);
    });

    $('[appSetup-btn-js]').on('click', function (ev) {
      var _el = $(ev.currentTarget),
          _elNextID = _el.attr('data-next'),
          _elProgressVal = _el.attr('data-progress');

      $('[appSetup-progress-js]').attr('style', 'width:' + _elProgressVal + '%;');
      $('[appSetup-progressVal-js]').text(_elProgressVal + '%');

      $('.affiliate-appSetup__step-' + _elNextID).fadeIn(300);
    });

    $('[modal-seeMore-js]').on('click', function (ev) {
      var _tableTTMPL = "\n        <div class=\"c-modal__table-tr\">\n          <div class=\"c-modal__table-td\"><span>September 23, 2019</span></div>\n          <div class=\"c-modal__table-td\"><span>$287.87</span></div>\n          <div class=\"c-modal__table-td\"><span>In transit</span></div>\n        </div>\n      ";

      var _tableNode = $('.c-modal__table-body');

      for (var i = 0; i < 10; i++) {
        _tableNode.append(_tableTTMPL);
      }
    });
  };

  var initScheduler = function initScheduler() {

    var _dropdown = function _dropdown() {
      $('[scheduler-dropdown-js]').on('click', function (ev) {
        var _el = $(ev.currentTarget);

        $('.scheduler__main-dropdown-menu').slideUp(350);

        if (_el.hasClass('is-open')) {
          _el.removeClass('is-open').siblings('.scheduler__main-dropdown-menu').slideUp(350);
        } else {
          _el.addClass('is-open').siblings('.scheduler__main-dropdown-menu').slideDown(350);
        }
      });

      $('[scheduler-dropdown-btn-js]').on('click', function (ev) {
        var _el = $(ev.currentTarget),
            _elVal = _el.attr('data-value');

        _el.closest('.scheduler__main-dropdown').find('[scheduler-dropdown-js] span').text(_elVal);
        $('.scheduler__main-dropdown-menu').slideUp(350);
      });
    };

    var _smoothScroll = function _smoothScroll(_self) {
      var linkHref = $(_self.currentTarget).attr('data-href') || $(_self.currentTarget).attr('href'),
          headerHeight = $(".header").outerHeight() || 0,
          topHeightOffset = $(linkHref).offset().top - headerHeight;

      $('body, html').animate({
        scrollTop: topHeightOffset
      }, 1000);

      var noHashURL = window.location.href.replace(/#.*$/, '');
      window.history.replaceState('', document.title, noHashURL);

      _self.preventDefault();
    };

    var _chooseBox = function _chooseBox() {
      $('.scheduler__main-box').on('click', function (ev) {
        var _el = $(ev.currentTarget);

        var _toggleBtn = $('[scheduler-toggle-js]');

        $('.scheduler__main-box').removeClass('is-active');
        _el.addClass('is-active');

        $('[scheduler-hidden-1-js]').slideUp(450);
        $('[scheduler-hidden-2-js]').slideDown(450).css({ 'display': 'flex' });

        _toggleBtn.removeClass('is-active');
        _toggleBtn.find('p').text(_el.attr('data-name'));
        _toggleBtn.find('span').text('(' + _el.attr('data-duration') + ')');

        if (!$('[scheduler-dataNode-js]').is(':visible')) {
          $('[scheduler-dataNode-js]').slideDown(450);

          _sliderData();
        }

        _smoothScroll(ev);
      });
      $('[scheduler-toggle-js]').on('click', function (ev) {
        $(ev.currentTarget).toggleClass('is-active');

        $('[scheduler-hidden-1-js]').slideToggle(450);
      });
    };

    var _sliderData = function _sliderData() {
      var _date = new Date();

      var firstDayInMonthIndex = function firstDayInMonthIndex(_monthIndex, _year) {
        return new Date(_year + "-" + (_monthIndex + 1) + "-01").getDay();
      };

      var _initSlide = 0,
          _slideChange = 1,
          _prevBtnMod = false,
          _weekStartNum = firstDayInMonthIndex(_date.getMonth(), _date.getFullYear()),
          _currentDate = _date.getDate();

      var nodes = Array.prototype.slice.call($('.schedulerData .swiper-slide'));

      if ($('.schedulerData').length) {
        var swiperScheduler = new Swiper('.schedulerData', {
          loop: false,
          grabCursor: false,
          freeMode: false,
          effect: 'slide',
          speed: 850,
          slidesPerView: 7,
          slidesPerGroup: 7,
          spaceBetween: 30,
          initialSlide: nodes.indexOf($('.swiper-slide--today')[0]),
          breakpoints: {
            767: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              spaceBetween: 15
            }
          },
          navigation: {
            nextEl: '.scheduler__data-next',
            prevEl: '.scheduler__data-prev'
          },
          on: {
            init: function init() {
              var _activeSlide = $(this)[0].slides[$(this)[0].activeIndex],
                  _slidePartOfMonth = $(_activeSlide).find('.scheduler__data-slide').attr('data-month');

              _slideChange++;

              $('[scheduler-sliderMonth-js]').text(_slidePartOfMonth);
            },
            slideChange: function slideChange() {
              var _activeSlide = $(this)[0].slides[$(this)[0].activeIndex],
                  _slidePartOfMonth = $(_activeSlide).find('.scheduler__data-slide').attr('data-month');

              $('[scheduler-sliderMonth-js]').text(_slidePartOfMonth);
            }
          }
        });
      }

      var _count = _slideChange;

      $('.scheduler__data-next').on('click', function (ev) {
        _slideChange++;
        $('.scheduler__data-prev').removeClass('scheduler__data-disabled');
      });
      $('.scheduler__data-prev').on('click', function (ev) {
        --_slideChange;

        if (_count === _slideChange) {
          $(ev.currentTarget).addClass('scheduler__data-disabled');
        }
      });
    };

    var _slideDataChoose = function _slideDataChoose() {
      $('.scheduler__data-slide').on('click', function (ev) {
        if ($(ev.currentTarget).hasClass('is-active')) {
          $(ev.currentTarget).removeClass('is-active');
        } else {
          $('.scheduler__data-slide').removeClass('is-active');
          $(ev.currentTarget).addClass('is-active');
        }

        if (!$('[scheduler-timeNode-js]').is(':visible')) {
          $('[scheduler-timeNode-js]').slideDown(450);
        }

        _smoothScroll(ev);
      });
    };

    var _chooseTime = function _chooseTime() {
      $('.scheduler__time-btn').on('click', function (ev) {
        if ($(ev.currentTarget).hasClass('is-active')) {
          $(ev.currentTarget).removeClass('is-active');
        } else {
          $('.scheduler__time-btn').removeClass('is-active');
          $(ev.currentTarget).addClass('is-active');
        }

        if (!$('[scheduler-infoNode-js]').is(':visible')) {
          $('[scheduler-infoNode-js]').slideDown(450);
        }

        _smoothScroll(ev);
      });
    };

    var _openFilter = function _openFilter() {
      $('[scheduler-filter-js]').on('click', function (ev) {
        $(ev.currentTarget).toggleClass('is-open');
        $(ev.currentTarget).siblings('[scheduler-filterBody-js]').slideToggle(450);
      });
    };

    var _datePicker = function _datePicker() {
      $("#date-element-start-box, #date-element-end-box").datepicker({
        format: 'mm/mm/yy',
        firstDay: 1,
        showButtonPanel: true,
        minDate: 0
      });
    };

    var _openPopup = function _openPopup() {
      $('[scheduler-popup-js]').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'is-show',
        callbacks: {
          beforeOpen: function beforeOpen() {
            this.st.mainClass = this.st.el.attr('data-effect');

            _datePicker();
          },
          close: function close() {}
        }
      });
      $('[scheduler-popupClose-js]').on('click', function (ev) {
        $.magnificPopup.close();
      });
    };

    var _renderSliderDate = function _renderSliderDate() {
      var _date = new Date();

      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          weekdayLess = ['Sun', 'Mon', 'Thu', 'Wed', 'Thu', 'Fri', 'Sat'];

      var sliderBox = function sliderBox(_currentData, _weekName, _weekNameLess, _weekDate, _month) {
        return "\n          <div class=\"swiper-slide " + (_weekDate === _currentData ? 'swiper-slide--today' : '') + "\">\n            <div class=\"scheduler__data-slide \n                        " + (_weekDate === _currentData ? 'scheduler__data-slide--today' : '') + "\n                        " + (_weekDate < _currentData || _weekName === 'Sunday' || _weekName === 'Saturday' ? 'scheduler__data-slide--disabled' : '') + "\n                        \" \n              data-href=\"#scheduler__time\" data-month=\"" + _month + "\">\n              <i></i>\n              <div class=\"scheduler__data-slide--top\">\n                <span>today</span>\n              </div>\n              <div class=\"scheduler__data-slide--middle\">\n                <p>" + _weekName + "</p>\n                <h5>" + _weekNameLess + "</h5>\n              </div>\n              <div class=\"scheduler__data-slide--bottom\">\n                <h4>" + _weekDate + "</h4>\n              </div>\n            </div>\n          </div>\n        ";
      };

      var sliderBoxEmpty = function sliderBoxEmpty() {
        return "\n          <div class=\"swiper-slide\">\n            <div class=\"scheduler__data-slide scheduler__data-slide--empty\">\n              <i></i>\n              <div class=\"scheduler__data-slide--top\">\n                <span>today</span>\n              </div>\n              <div class=\"scheduler__data-slide--middle\">\n                <p></p>\n                <h5></h5>\n              </div>\n              <div class=\"scheduler__data-slide--bottom\">\n                <h4></h4>\n              </div>\n            </div>\n          </div>\n        ";
      };

      var daysInMonth = function daysInMonth(_month, _year) {
        return new Date(_year, _month, 0).getDate();
      };

      var firstDayInMonthIndex = function firstDayInMonthIndex(_monthIndex, _year) {
        return new Date(_year, _monthIndex, 1).getDay();
      };

      var buildIntervalMonth = function buildIntervalMonth(currentDay, currentMonth, currentYear, period) {
        var monthCount = 0,
            buildWeekBool = true,
            weekCount = firstDayInMonthIndex(currentMonth, currentYear);

        for (var i = 1; i <= period; i++) {
          if (currentMonth > 11) {
            currentMonth = 0;
            currentYear += 1;
          }

          if (monthCount <= currentMonth) {

            for (var dateMonth = 1; dateMonth <= daysInMonth(currentMonth + 1, currentYear); dateMonth++) {
              if (weekCount !== 0 && buildWeekBool) {
                for (var idx = 1; idx < weekCount; idx++) {
                  $('.schedulerData .swiper-wrapper').append(sliderBoxEmpty());
                }

                buildWeekBool = false;
              }

              $('.schedulerData .swiper-wrapper').append(sliderBox(currentDay, weekday[weekCount], weekdayLess[weekCount], dateMonth, monthNames[currentMonth]));

              if (weekCount >= 6) {
                weekCount = 0;
              } else {
                ++weekCount;
              }

              if (currentDay === dateMonth) {
                currentDay = 0;
              }
            }

            ++currentMonth;
          }
        }
      };

      var buildPeriod = function buildPeriod(_period) {
        buildIntervalMonth(_date.getDate(), _date.getMonth(), _date.getFullYear(), _period);
      };

      buildPeriod(6);

      _sliderData();
      _slideDataChoose();
    };

    var _dropdownTimeZone = function _dropdownTimeZone() {
      var _arr = [];

      $.each($('.scheduler__time-dropdown-content a'), function (idx, val) {
        _arr.push($(val).text().toLowerCase());
      });

      $('.scheduler__time-dropdown-btn').on('click', function (ev) {
        $(ev.currentTarget).siblings('.scheduler__time-dropdown-content').toggleClass('is-open');
      });

      $('.scheduler__time-dropdown-content a').on('click', function (ev) {
        $('.scheduler__time-dropdown-btn span').text($(ev.currentTarget).text());
        $('.scheduler__time-dropdown-content').removeClass('is-open');
      });

      $('.scheduler__time-dropdown-search').on('keyup', function (ev) {
        var _val = $(ev.currentTarget).val().toLowerCase();

        $('.scheduler__time-dropdown-content a').hide();

        $.each(_arr, function (idx, val) {
          if (val.indexOf(_val) !== -1) {
            var e = idx + 1;

            $('.scheduler__time-dropdown-content a[timezoneid="' + _num + '"]').show();
          }
        });
      });

      $('body').on('click', function (e) {
        var className = ".scheduler__time-dropdown";

        if (!$(e.target).closest(className).length) {
          $('.scheduler__time-dropdown-content').removeClass('is-open');
        }
      });
    };

    _dropdown();
    _chooseBox();
    _chooseTime();
    _openFilter();
    _openPopup();
    _datePicker();
    _renderSliderDate();
    _dropdownTimeZone();
  };

  /**
   * @description Init all method
   */
  var initJquery = function initJquery() {
    // default
    initPreventBehavior();
    initSvg4everybody();

    // lib
    initHamburger();
    initStellar();
    initSwiper();
    initViewPortChecker();
    initViewPortCheckerTour();
    $(window).on('resize', function (ev) {
      initViewPortCheckerTour();
    });

    initSmoothScroll();
    initPopups();

    // callback
    initSelect();
    initPipelinesTabs();
    initVideo();
    initSupportLogic();
    pricingTypes();
    initResourcesMainBtn();
    initSearchDrop();
    initPricingTabs();

    initStickyElem();
    initAffiliate();
    initScheduler();
  };
  initJquery();
});