/**
    * headerFixed
    * btnmenu
    * video
    * Sticky
    * gotop
    * retinaLogos
    * preloader
    * flatCounter
    * hoverThumbGallery
    * onClickViewListingType
    * checkViewListing
    * Toggle Btn dashboard
    * btn filter
    * dot car
    * niceSelect
*/

; (function ($) {

  "use strict";
  // Mobile Nav Hide Show
  if ($('.mobile-menu').length) {

    var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
    $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
    $('.sticky-header .main-menu').append(mobileMenuContent);

    //Hide / Show Submenu
    $('.mobile-menu .navigation > li.dropdown2 > .dropdown2-btn').on('click', function (e) {
      e.preventDefault();
      var target = $(this).parent('li').children('ul');

      if ($(target).is(':visible')) {
        $(this).parent('li').removeClass('open');
        $(target).slideUp(500);
        $(this).parents('.navigation').children('li.dropdown2').removeClass('open');
        $(this).parents('.navigation').children('li.dropdown2 > ul').slideUp(500);
        return false;
      } else {
        $(this).parents('.navigation').children('li.dropdown2').removeClass('open');
        $(this).parents('.navigation').children('li.dropdown2').children('ul').slideUp(500);
        $(this).parent('li').toggleClass('open');
        $(this).parent('li').children('ul').slideToggle(500);
      }
    });

    //3rd Level Nav
    $('.mobile-menu .navigation > li.dropdown2 > ul  > li.dropdown2 > .dropdown2-btn').on('click', function (e) {
      e.preventDefault();
      var targetInner = $(this).parent('li').children('ul');

      if ($(targetInner).is(':visible')) {
        $(this).parent('li').removeClass('open');
        $(targetInner).slideUp(500);
        $(this).parents('.navigation > ul').find('li.dropdown2').removeClass('open');
        $(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
        return false;
      } else {
        $(this).parents('.navigation > ul').find('li.dropdown2').removeClass('open');
        $(this).parents('.navigation > ul').find('li.dropdown2 > ul').slideUp(500);
        $(this).parent('li').toggleClass('open');
        $(this).parent('li').children('ul').slideToggle(500);
      }
    });

    //Menu Toggle Btn
    $('.mobile-nav-toggler').on('click', function () {
      $('body').addClass('mobile-menu-visible');

    });

    //Menu Toggle Btn
    $('.mobile-menu .menu-backdrop, .close-btn').on('click', function () {
      $('body').removeClass('mobile-menu-visible');
      $('.mobile-menu .navigation > li').removeClass('open');
      $('.mobile-menu .navigation li ul').slideUp(0);
    });

    $(document).keydown(function (e) {
      if (e.keyCode === 27) {
        $('body').removeClass('mobile-menu-visible');
        $('.mobile-menu .navigation > li').removeClass('open');
        $('.mobile-menu .navigation li ul').slideUp(0);
      }
    });

  }

  var headerFixed = function () {
    if ($('body').hasClass('counter-scroll')) {
      var nav = $('#header');
      if (nav.length) {
        var
          offsetTop = nav.offset().top,
          headerHeight = nav.height(),
          injectSpace = $("<div>", {
          height: headerHeight
          }).insertAfter(nav);
          injectSpace.hide();

        $(window).on('load scroll', function () {
          if ($(window).scrollTop() > offsetTop) {
            nav.addClass('is-fixed');
            injectSpace.show();
          } else {
            nav.removeClass('is-fixed');
            injectSpace.hide();
          }

          if ($(window).scrollTop() > 500) {
            nav.addClass('is-small');
          } else {
            nav.removeClass('is-small');
          }
        })
      }
    }
  };

  var video = function () {
    if ($('div').hasClass('video-wrap')) {
      $('.popup-youtube').magnificPopup({
        type: 'iframe'
      });
    }
  };

  var sticky = function () {
    if ($('body').hasClass('sticky-scroll')) {
      new StickySidebar('#sidebar-sticky', {
        topSpacing: 0,
        bottomSpacing: 0,
        containerSelector: '.page-menu1-wrap',
        innerWrapperSelector: '.po-sticky'
      });
    }
  }

  var goTop = function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 800) {
        $('.button-go').addClass('show');
      } else {
        $('.button-go').removeClass('show');
      }
    });

    $('.button-go').on('click', function () {
      $("html, body").animate({ scrollTop: 0 }, 1000);
      return false;
    });  };

  var retinaLogos = function () {
    var retina = window.devicePixelRatio > 1 ? true : false;
    if (retina) {
      $('#header .logo').find('img').attr({ src: 'assets/images/logo/logo2@.png', });
      $('#Footer .widget-info').find('img').attr({ src: 'assets/images/logo/logo-footer@2x.png',});
    }
  };

  var preloader = function () {
    setTimeout(function () {
      $(".preload-container").fadeOut("slow", function () {
        $(this).remove();
      });
    }, 1000);
  };

  var flatCounter = function () {
    if ($(document.body).hasClass('counter-scroll')) {
      var a = 0;
      $(window).scroll(function () {
        var oTop = $('.tf-counter').offset().top - window.innerHeight;
        if (a === 0 && $(window).scrollTop() > oTop) {
          if ($().countTo) {
            $('.tf-counter').find('.number').each(function () {
              var to = $(this).data('to'),
                speed = $(this).data('speed');

              $(this).countTo({
                to: to,
                speed: speed
              });
            });
          }
          a = 1;
        }
      });
    }
  };

  var hoverThumbGallery = function (e) {
    e.find('.hover-listing-image').each(function () {
      $(this).find('.listing-item:first-child').addClass('active');
      $(this).find('.bl-item:first-child').addClass('active');
      $(".hover-listing-image .listing-item").hover(
        function () {
          var index = $(this).index();
          $(this).closest('.hover-listing-image').find('.listing-item').removeClass('active');
          $(this).addClass("active");
          $(this).closest('.hover-listing-image').find('.bl-item').removeClass('active');
          $(this).closest('.hover-listing-image').find('.bl-item').eq(index).addClass('active');
        },
        function () {
          $(this).removeClass("active");
          $(this).closest('.hover-listing-image').find('.bl-item').removeClass('active');
          $(this).closest('.hover-listing-image').find('.listing-item:first-child').addClass('active');
          $(this).closest('.hover-listing-image').find('.bl-item:first-child').addClass('active');
        }
      );

    });
  }

  var hoverThumbGallery = function () {
    $('.hover-listing-image').find('.listing-item:first-child').addClass('active');
    $('.hover-listing-image').find('.bl-item:first-child').addClass('active');
    $(".hover-listing-image .listing-item").hover(
      function () {
        var index = $(this).index();
        $(this).closest('.hover-listing-image').find('.listing-item').removeClass('active');
        $(this).addClass("active");
        $(this).closest('.hover-listing-image').find('.bl-item').removeClass('active');
        $(this).closest('.hover-listing-image').find('.bl-item').eq(index).addClass('active');
      },
      function () {
        $(this).removeClass("active");
        $(this).closest('.hover-listing-image').find('.bl-item').removeClass('active');
        $(this).closest('.hover-listing-image').find('.listing-item:first-child').addClass('active');
        $(this).closest('.hover-listing-image').find('.bl-item:first-child').addClass('active');
      }
    );
  }

  //tab-lisst
  var onClickViewListingType = function () {
    if ($('.tf-my-listing-search').length > 0) {
      $('a.btn-display-listing-grid').click(function (event) {
        event.preventDefault();
        localStorage.setItem('VIEW_LISTING_TYPE', 'grid');
        checkViewListing();
      });
      $('a.btn-display-listing-list').click(function (event) {
        event.preventDefault();
        localStorage.setItem('VIEW_LISTING_TYPE', 'list');
        checkViewListing();
      });
    }
  };

  var checkViewListing = function () {
    if ($('.tf-my-listing-search').length > 0) {
      var type = localStorage.getItem('VIEW_LISTING_TYPE');
      switch (type) {
        case 'grid':
          $('.listing-list-car-wrap').find('.listing-list-car-grid').removeClass('listing-list-car-list');
          $('a.btn-display-listing-grid').addClass('active');
          $('a.btn-display-listing-list').removeClass('active');
          break;
        case 'list':
          $('.listing-list-car-wrap').find('.listing-list-car-grid').addClass('listing-list-car-list');
          $('a.btn-display-listing-list').addClass('active');
          $('a.btn-display-listing-grid').removeClass('active');
          break;
        default:
          break;
      }
    }
  }

  //Menu Toggle Btn dashboard
  $('.btn-show-dashboard').on('click', function () {
    $('.sidebar-dashboard').addClass('active');
    $('.overlay-dashboard').addClass('active');
  });
  $('.overlay-dashboard').on('click', function () {
    $('.sidebar-dashboard').removeClass('active');
    $('.overlay-dashboard').removeClass('active');
  });

  $(".filter-header-list .btn-filter i").click(function () {
    $('.list-filter').slideToggle('');
  });

  $(".dot").click(function () {
    $(this).find('i').toggleClass("active");
    $(this).find('.content-price').toggleClass("active");
  });

  $(document).ready(function () {
    $(".item-dot").on("mouseover", function () {
      // when you run event hover remove class active before
      $('.item-dot').removeClass('active');
      // active class item your run function
      $(this).addClass('active');
    });
  });


  //seclect
  $('.select_js').niceSelect();
  (function () {

    var parent = document.querySelector(".range-slider");
    if (!parent) return;

    var
      rangeS = parent.querySelectorAll("input[type=range]"),
      numberS = parent.querySelectorAll("input[type=number]");

    rangeS.forEach(function (el) {
      el.oninput = function () {
        var slide1 = parseFloat(rangeS[0].value),
          slide2 = parseFloat(rangeS[1].value);

        if (slide1 > slide2) {
          [slide1, slide2] = [slide2, slide1];
          // var tmp = slide2;
          // slide2 = slide1;
          // slide1 = tmp;
        }

        numberS[0].value = slide1;
        numberS[1].value = slide2;
      }
    });

    numberS.forEach(function (el) {
      el.oninput = function () {
        var number1 = parseFloat(numberS[0].value),
          number2 = parseFloat(numberS[1].value);

        if (number1 > number2) {
          var tmp = number1;
          numberS[0].value = number2;
          numberS[1].value = tmp;
        }

        rangeS[0].value = number1;
        rangeS[1].value = number2;

      }
    });

  })();

  // Dom Ready
  $(function () {
    headerFixed();
    video();
    sticky();
    retinaLogos();
     preloader();
    goTop();
    hoverThumbGallery();
    flatCounter();
    onClickViewListingType();
    checkViewListing();
    // Initialize dynamic car counter on the home search forms
    initSearchCount();
    wireSearchFormSubmit();
  });

})(jQuery);

// Dynamically update the search button to show the number of cars available
function initSearchCount() {
  const DATA_URL = 'assets/data/cars.json';
  // Fetch once and reuse
  fetch(DATA_URL)
    .then(r => r.json())
    .then(data => {
      const cars = Array.isArray(data?.cars) ? data.cars : [];
      // cache globally for other handlers (e.g., submit -> details redirect)
      window.__CAR_CATALOG__ = cars;
      const formsConfig = [
        { formId: 'search-forms', sliderId: 'slider-range', valueIds: ['slider-range-value1', 'slider-range-value2'] },
        { formId: 'search-forms2', sliderId: 'slider-range2', valueIds: ['slider-range-value01', 'slider-range-value02'] },
        { formId: 'search-forms3', sliderId: 'slider-range3', valueIds: ['slider-range-value03', 'slider-range-value04'] },
      ];

      formsConfig.forEach(cfg => {
        const form = document.getElementById(cfg.formId);
        if (!form) return;

        const input = form.querySelector('input[name="model_query"]');
        const btn = form.querySelector('.button-search-listing');
        const sliderEl = document.getElementById(cfg.sliderId);
        const [minSpanId, maxSpanId] = cfg.valueIds;

        if (!btn) return;

        const update = () => {
          const query = (input?.value || '').trim().toLowerCase();
          const makeText = (form.querySelector('.group-select .nice-select .current')?.textContent || '').trim();
          const makeRaw = (!makeText || makeText === 'Make') ? '' : makeText;
          const make = makeRaw ? normalizeBrand(makeRaw) : '';

          // Prefer reading from the slider instance if available; fallback to the value spans
          let min = 0, max = Number.MAX_SAFE_INTEGER;
          if (sliderEl && sliderEl.noUiSlider) {
            try {
              const vals = sliderEl.noUiSlider.get();
              const parseNum = (v) => Number(String(v).toString().replace(/,/g, '')) || 0;
              if (Array.isArray(vals)) {
                min = parseNum(vals[0]);
                max = parseNum(vals[1]);
              } else {
                const parts = String(vals).split(',');
                min = parseNum(parts[0]);
                max = parseNum(parts[1] || '');
              }
            } catch (e) { /* ignore */ }
          } else {
            const minSpan = document.getElementById(minSpanId);
            const maxSpan = document.getElementById(maxSpanId);
            const parseNum = (el) => el ? Number(el.textContent.replace(/,/g, '')) || 0 : 0;
            min = parseNum(minSpan);
            max = parseNum(maxSpan) || Number.MAX_SAFE_INTEGER;
          }

          const matches = cars.filter(c => {
            const brand = normalizeBrand(c.brand);
            const model = String(c.model || '');
            const price = Number(c.pricePerDayAED);
            const inMake = !make || brand === make;
            const inPrice = Number.isFinite(price) ? (price >= min && price <= max) : true;
            const inQuery = !query ||
              (String(c.brand).toLowerCase().includes(query)) ||
              (String(c.model).toLowerCase().includes(query));
            return inMake && inPrice && inQuery;
          });

          // Update button label
          btn.innerHTML = '<i class="icon-search-1"></i> ' + matches.length + ' Cars';
        };

        const debouncedUpdate = debounce(update, 100);

        // Input events
        if (input) input.addEventListener('input', debouncedUpdate);

        // Make selection: listen to clicks within the make dropdown area
        const makeContainer = form.querySelector('.group-select .nice-select');
        if (makeContainer) makeContainer.addEventListener('click', debouncedUpdate, true);

        // Slider events
        if (sliderEl && sliderEl.noUiSlider) {
          sliderEl.noUiSlider.on('update', debouncedUpdate);
        } else {
          // Fallback: observe the displayed value spans
          const minSpan = document.getElementById(minSpanId);
          const maxSpan = document.getElementById(maxSpanId);
          [minSpan, maxSpan].forEach(el => {
            if (!el) return;
            const obs = new MutationObserver(debouncedUpdate);
            obs.observe(el, { childList: true, characterData: true, subtree: true });
          });
        }

        // Initial render
        update();
      });
    })
    .catch(() => {
      // If data fails to load, still set the button to show 0 Cars for consistency
      document.querySelectorAll('.button-search-listing').forEach(btn => {
        btn.innerHTML = '<i class="icon-search-1"></i> 0 Cars';
      });
    });
}

function debounce(fn, wait) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

// Intercept submit and redirect directly to the best matching car details page
function wireSearchFormSubmit() {
  const forms = [
    { formId: 'search-forms', sliderId: 'slider-range', values: ['slider-range-value1', 'slider-range-value2'] },
    { formId: 'search-forms2', sliderId: 'slider-range2', values: ['slider-range-value01', 'slider-range-value02'] },
    { formId: 'search-forms3', sliderId: 'slider-range3', values: ['slider-range-value03', 'slider-range-value04'] },
  ];

  const parseNum = (v) => Number(String(v).replace(/,/g, '')) || 0;

  forms.forEach(cfg => {
    const form = document.getElementById(cfg.formId);
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Inputs
      const qRaw = (form.querySelector('input[name="model_query"]')?.value || '').trim();
      const q = qRaw.toLowerCase();

      // Make
      const makeSelect = form.querySelector('.group-select select');
      let make = makeSelect ? (makeSelect.value || makeSelect.options[makeSelect.selectedIndex]?.text || '') : '';
      if (!make) {
        make = (form.querySelector('.group-select .nice-select .current')?.textContent || '').trim();
      }
      make = normalizeBrand(make);
      if (/^(make|all)$/i.test(make)) make = '';

      // Price
      const sliderEl = document.getElementById(cfg.sliderId);
      let min = 0, max = Number.MAX_SAFE_INTEGER;
      if (sliderEl && sliderEl.noUiSlider) {
        const vals = sliderEl.noUiSlider.get();
        if (Array.isArray(vals)) {
          min = parseNum(vals[0]);
          max = parseNum(vals[1]);
        } else {
          const parts = String(vals).split(',');
          min = parseNum(parts[0]);
          max = parseNum(parts[1] || '');
          if (!max) max = Number.MAX_SAFE_INTEGER;
        }
      } else {
        const [minId, maxId] = cfg.values;
        const minEl = document.getElementById(minId);
        const maxEl = document.getElementById(maxId);
        min = parseNum(minEl ? minEl.textContent : '0');
        const mx = parseNum(maxEl ? maxEl.textContent : '');
        max = mx || Number.MAX_SAFE_INTEGER;
      }

      const cars = Array.isArray(window.__CAR_CATALOG__) ? window.__CAR_CATALOG__ : [];
      if (!cars.length) {
        // Fallback: navigate to listings or show a message
        return;
      }

      // Filter and score
      const candidates = cars
        .filter(c => {
          const brand = normalizeBrand(c.brand);
          const model = String(c.model || '');
          const price = Number(c.pricePerDayAED);
          const inMake = !make || brand === make;
          const inPrice = Number.isFinite(price) ? (price >= min && price <= max) : true;
          const inQuery = !q || brand.toLowerCase().includes(q) || model.toLowerCase().includes(q);
          return inMake && inPrice && inQuery;
        })
        .map(c => ({ car: c, score: scoreCar(c, { make, q }) }));

      if (!candidates.length) {
        // No results: optionally show a toast; for now, do nothing
        return;
      }

      // Pick best by score, then by lowest price
      candidates.sort((a, b) => b.score - a.score || (a.car.pricePerDayAED || 0) - (b.car.pricePerDayAED || 0));
      const best = candidates[0].car;

      // Go to details page
      if (best && best.id) {
        window.location.href = 'listing-details.html?id=' + encodeURIComponent(best.id);
      }
    });
  });
}

// Helpers
function normalizeBrand(name) {
  const n = String(name || '').trim();
  if (!n) return '';
  const lower = n.toLowerCase();

  // Known brand aliases and typo fixes
  const aliases = [
    { re: /\bbmv\b/, out: 'BMW' },
    { re: /\bbmw\b/, out: 'BMW' },
    { re: /\brolls[\s-]?royce\b/, out: 'Rolls-Royce' },
    { re: /\brange\s+rover\b/, out: 'Range Rover' },
    { re: /\bland\s+rover\b/, out: 'Land Rover' },
    { re: /\bmercedes\b/, out: 'Mercedes' },
    { re: /\baudi\b/, out: 'Audi' },
    { re: /\bbentaly\b/, out: 'Bentley' }, // common typo fix
    { re: /\bbentley\b/, out: 'Bentley' },
    { re: /\blamborghini\b/, out: 'Lamborghini' },
    { re: /\bporsche\b/, out: 'Porsche' },
    { re: /\bnissan\b/, out: 'Nissan' },
    { re: /\btoyota\b/, out: 'Toyota' },
    { re: /\bkia\b/, out: 'Kia' },
    { re: /\bgmc\b/, out: 'GMC' },
    { re: /\bcadillac\b/, out: 'Cadillac' }
  ];

  for (const a of aliases) {
    if (a.re.test(lower)) return a.out;
  }

  // Fallback: take the first word and title-case it
  const first = n.split(/\s+/)[0];
  if (!first) return '';
  const cap = first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
  return cap;
}

function scoreCar(c, { make, q }) {
  const brand = normalizeBrand(c.brand);
  const model = String(c.model || '');
  let score = 0;
  // brand match
  if (make && brand === make) score += 5;
  // exact model match
  if (q && model.toLowerCase() === q.toLowerCase()) score += 5;
  // partial matches
  if (q && brand.toLowerCase().includes(q.toLowerCase())) score += 2;
  if (q && model.toLowerCase().includes(q.toLowerCase())) score += 3;
  return score;
}
