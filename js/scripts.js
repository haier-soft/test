let vh
function setVh() {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};
setVh()
window.addEventListener('resize', function () {
  setVh();
  screenWidth = screen.width;
});
window.addEventListener('orientationchange', function () {
  setVh();
  screenWidth = screen.width;
});
$(function () {
  var screenWidth = screen.width;
  var windowWidth = $(window).width();

  // Для демонстрации!!!! УДАЛИТЬ!!!!!!!!!!!!!!! 

  $("#js-modal-callback .modal__btn").on("click", function (e) {
    e.preventDefault();
    $(this).parents(".js-modal").hide();
    $("#js-modal-thanks").fadeIn();
  });

  // -------------------------------------------

  /*
   *  Header
   */

  let lastScroll = 0;
  const defaultOffset = 200;
  const header = $(".header");
  const scrollPosition = () =>
    window.pageYOffset || document.documentElement.scrollTop;
  const containHide = () => header.hasClass("hide");

  $(window).on("scroll", function () {
    if (
      scrollPosition() > lastScroll &&
      !containHide() &&
      scrollPosition() > defaultOffset
    ) {
      header.addClass("hide");
    } else if (scrollPosition() < lastScroll && containHide()) {
      header.removeClass("hide");
    }

    lastScroll = scrollPosition();
  });

  /*
   *  Location
   */

  if (screenWidth > 991) {
    $(".location__link").on("click", function (e) {
      e.preventDefault();
      $(".location__dropdown").slideToggle();
    });

    $(".location__confirm").on("click", function (e) {
      e.preventDefault();
      $(".location__dropdown").slideUp();
    });
  } else {
    $(".location__link").on("click", function (e) {
      e.preventDefault();
      let location = $(this).parents(".location");
      location.find(".location__dropdown").fadeIn();
      $("body").addClass("noscroll");
      if (location.find(".overlay").length <= 0) {
        console.log("no");
        location.append('<div class="overlay"></div>');
      }
    });

    $(".location__confirm").on("click", function (e) {
      e.preventDefault();
      let location = $(this).parents(".location");
      location.find(".location__dropdown").fadeOut();
      $("body").removeClass("noscroll");
      location.find(".overlay").remove();
    });

    $(".location").on("click", ".overlay", function () {
      $(this).siblings(".location__dropdown").fadeOut();
      $("body").removeClass("noscroll");
      $(this).remove();
    });
  }

  $(".location__btn").on("click", function () {
    $(this).parents(".location__dropdown").slideUp();
    $(this).parents(".location").find(".overlay").remove();
  });

  /*
   *  Dropdown
   */

  $(".menu-toggle").on("click", function () {
    $(".search").slideUp();
    $(this).toggleClass("open");
    $(".dropdown").slideToggle();
    $("body").toggleClass("noscroll");
    let location = $(".location");
    location.find(".location__dropdown").fadeOut();
    location.find(".overlay").remove();
  });

  /*
   *  Video
   */

  const players = Plyr.setup(".js-player");

  /*
   *  Plus - minus
   */

  $(".js-minus").on("click", function () {
    let $input = $(this).parent().find("input");
    let count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });

  $(".js-plus").on("click", function () {
    let $input = $(this).parent().find("input");
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });

  /*
   *  Search
   */
  $(".search-btn").on("click", function () {
    if (window.innerWidth > 767) {
      $(".dropdown").slideUp();
      $(".menu-toggle").hide().removeClass("open");
      $(".search-close").show();
      $(".search").slideDown().find("input").focus();
      $(".search").append('<div class="search__overlay"></div>');
      $("body").addClass("noscroll");
      $(".search-close").addClass("open");
    } else {
      $(".menu-toggle").hide();
      $(".search-close").show();
      $(".search").slideDown().find("input").focus();
      $("body").addClass("noscroll");
      $(".search-close").addClass("open");
    }
  })

  $(".search-close").on("click", function () {
    const btn = $(this);
    btn.removeClass("open");
    $(".search").slideUp();
    $("body").removeClass("noscroll");

    setTimeout(function () {
      btn.hide();
      $(".menu-toggle").show();
    }, 400);
  });

  $(".search").on("click", ".search__overlay", function () {
    $(".search-close").removeClass("open");
    $(".search").slideUp();
    $("body").removeClass("noscroll");

    setTimeout(function () {
      $(".search-close").hide();
      $(".menu-toggle").show();
      $(".search__overlay").remove();
    }, 400);
  });

  /*
   *  Carousels
   */

  // const banner = $(".banner-carousel").slick({
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   infinite: true,
  //   dots: false,
  //   autoplay: true,
  //   autoplaySpeed: 5000,
  //   speed: 800,
  //   prevArrow:
  //     '<button class="prev" type="button"><svg><use href="img/icons/sprite.svg#arrow-left"></svg></button>',
  //   nextArrow:
  //     '<button class="next" type="button"><svg><use href="img/icons/sprite.svg#arrow-right"></svg></button>',
  // });

  // let currentSlide = banner.slick("slickCurrentSlide") + 1;
  // let totalSlides = banner.slick("getSlick").slideCount;

  // $(".counter__current").text(currentSlide);
  // $(".counter__total").text(totalSlides);

  // banner.on("afterChange", function (event, slick, currentSlide, nextSlide) {
  //   $(".counter__current").text(currentSlide + 1);
  // });

  // $(".gallery__carousel").slick({
  //   infinite: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   dots: false,
  //   autoplay: false,
  //   autoplaySpeed: 4000,
  //   fade: false,
  //   asNavFor: ".gallery__thumbs",
  //   prevArrow:
  //     '<button class="prev" type="button"><svg><use href="img/icons/sprite.svg#chevron-left"></svg></button>',
  //   nextArrow:
  //     '<button class="next" type="button"><svg><use href="img/icons/sprite.svg#chevron-right"></svg></button>',
  // });

  // $(".gallery__thumbs").slick({
  //   infinite: true,
  //   slidesToShow: 5,
  //   slidesToScroll: 1,
  //   swipeToSlide: true,
  //   asNavFor: ".gallery__carousel",
  //   dots: false,
  //   focusOnSelect: true,
  //   arrows: false,
  //   responsive: [
  //     {
  //       breakpoint: 668,
  //       settings: {
  //         slidesToShow: 3,
  //       },
  //     },
  //   ],
  // });

  /*
   *  Modal
   */

  $(".js-modal-show").on("click", function () {
    var currentModal = $(this).attr("href");
    $(currentModal).fadeIn(500);
    $("body").addClass("noscroll");
  });

  $(".js-modal-close").on("click", function (e) {
    e.preventDefault();
    $(".js-modal").fadeOut(100);
    $("body").removeClass("noscroll");
  });

  $("body").on("click", ".js-modal", function (e) {
    if (e.target.classList.contains("js-modal")) {
      $(".js-modal").fadeOut(100);
      $("body").removeClass("noscroll");
    }
    e.stopPropagation();
  });

  /*
   *   Callback
   */

  $(".callback-btn").on("click", function () {
    $(this).parents(".dropdown").slideUp();
    $(".menu-toggle").removeClass("open");
  });

  /*
   *   Маска телефона
   */

  $(".phone").mask("+7 (999) 999-99-99");

  /*
   *  Tabs
   */

  // $(".js-tab-link").on("click", function (e) {
  //   e.preventDefault();
  //   let link = $(this).attr("href");

  //   $(this).addClass("active").siblings(".js-tab-link").removeClass("active");
  //   $(link)
  //     .addClass("active")
  //     .fadeIn()
  //     .siblings(".js-tab")
  //     .hide()
  //     .removeClass("active");
  // });

  /*
   *   Accordion
   */

  $(".accordion__header").on("click", function () {
    $(this)
      .toggleClass("open")
      .siblings(".accordion__content")
      .slideToggle()
      .parents(".accordion__item")
      .siblings(".accordion__item")
      .find(".accordion__header")
      .removeClass("open")
      .siblings(".accordion__content")
      .slideUp();
  });

  /*
   * Back to Top
   */

  // $(window).scroll(function () {
  //   if ($(this).scrollTop() > 100) {
  //     $(".scrollup").fadeIn();
  //   } else {
  //     $(".scrollup").fadeOut();
  //   }
  // });

  $(".scrollup").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });

  /*
   * Tooltip
   */

  $(".tooltip__icon").on("click", function (e) {
    $(this).siblings(".tooltip__popup").fadeToggle();
    if (
      windowWidth - $(this).siblings(".tooltip__popup").offset().left - 260 <
      150
    ) {
      $(this).siblings(".tooltip__popup").css({ left: "auto", right: 0 });
    }
    e.stopPropagation();
  });

  $("body").on("click", () => {
    $(".tooltip__popup").fadeOut();
  });

  /*
   *  Плавный скрол
   */

  if (screenWidth > 767) {
    $(".js-anchor").on("click", function () {
      let elementClick = $(this).attr("href");
      let destination = $(elementClick).offset().top - 84;
      $("html,body").animate({ scrollTop: destination }, 600);
      return false;
    });
  }

  /*
   * Catalog search
   */

  $(".f-search__show").on("click", function (e) {
    e.preventDefault();
    $(".f-search__form").fadeIn().find("input").focus();
  });

  /*
   * Sort
   */

  $(".sort__toggle").on("click", function () {
    $(this).toggleClass("open").siblings(".sort__dropdown").slideToggle();
  });

  $(".sort__link").on("click", function (e) {
    e.preventDefault();
    let textSort = $(this).text();
    $(this)
      .parents(".sort__dropdown")
      .slideUp()
      .siblings(".sort__toggle")
      .removeClass("open")
      .find(".sort__selected")
      .text(textSort);
  });

  /*
   * Filter
   */

  $(".f-select__header").on("click", function () {
    $(this)
      .parents(".f-select")
      .siblings(".f-select")
      .find(".f-select__header")
      .removeClass("open")
      .siblings(".f-select__list")
      .slideUp();
    $(this).toggleClass("open").siblings(".f-select__list").slideToggle();
  });

  $(".f-select__toggle").on("click", function () {
    if ($(this).hasClass("open")) {
      $(this).removeClass("open").find("span").text("Показать все");
      $(this)
        .siblings(".f-select__wrap")
        .find(".f-select__checkbox:not(.hit)")
        .hide();
      $(this).siblings(".f-select__title").text("Популярные:");
    } else {
      $(this).addClass("open").find("span").text("Скрыть все");
      $(this).siblings(".f-select__wrap").find(".f-select__checkbox").show();
      $(this).siblings(".f-select__title").text("Все коллекции:");
    }
  });

  $("body").on("mousedown", function (e) {
    if (
      !e.target.classList.contains("f-select") &&
      !e.target.closest(".f-select")
    ) {
      $(".f-select__list").slideUp();
    }
    e.stopPropagation();
  });

  $(".filter__toggle").on("click", function () {
    if (window.innerWidth > 767) {
      if ($(this).hasClass("open")) {
        $(this).removeClass("open").find("span").text("Показать все фильтры");
        $(".f-select:nth-child(n + 5)").slideUp();
        $(".f-select__header")
          .removeClass("open")
          .siblings(".f-select__list")
          .slideUp();
      } else {
        $(this).addClass("open").find("span").text("Скрыть все фильтры");
        $(".f-select:nth-child(n + 5)").slideDown();
      }
    } else {
      if ($(this).hasClass("open")) {
        $(this).removeClass("open").find("span").text("Показать все фильтры");
        $(".filter__selects").slideUp();
        $(".f-select__header")
          .removeClass("open")
          .siblings(".f-select__list")
          .slideUp();
      } else {
        $(this).addClass("open").find("span").text("Скрыть все фильтры");
        $(".filter__selects").slideDown();
      }
    }

  });


  /*
   * Catalog collections
   */

  const collections = $(".colls-item");

  if (screenWidth > 991) {
    $(window).on("scroll", function () {
      let offsetTop = $(window).scrollTop();
      collections.each(function () {
        let item = $(this);
        let itemOffsetTop = item.offset().top - 78;
        let itemWrapHeight = item.find(".colls-item__wrap").height();
        let itemHeight = item.height() - itemWrapHeight;
        let itemOffsetBottom = item.offset().top + itemHeight - 118;
        let itemGoodsHeight = item.find(".coll-goods").height();
        console.log(itemWrapHeight, itemGoodsHeight);
        if (itemWrapHeight < itemGoodsHeight) {
          if (
            offsetTop > itemOffsetTop &&
            offsetTop < itemOffsetBottom &&
            !item.hasClass("fixed")
          ) {
            item.removeClass("absolute").addClass("fixed");
          } else if (
            offsetTop > itemOffsetBottom &&
            !item.hasClass("absolute")
          ) {
            item.removeClass("fixed").addClass("absolute");
          } else if (offsetTop < itemOffsetTop) {
            item.removeClass("fixed");
          }
        }
      });
    });
  } else {
    $(window).on("scroll", function () {
      let offsetTop = $(window).scrollTop();
      collections.each(function () {
        let item = $(this);
        let itemOffsetTop = item.offset().top;
        let itemOffsetBottom = item.offset().top + item.height() - 40;
        let itemTitleHeight = item.find(".colls-item__title").height();

        if (offsetTop > itemOffsetTop && offsetTop < itemOffsetBottom) {
          item
            .find(".colls-item__title")
            .removeClass("absolute")
            .addClass("fixed");
          item.css("padding-top", itemTitleHeight + "px");
        } else if (offsetTop < itemOffsetTop) {
          item.find(".colls-item__title").removeClass("fixed");
          item.css("padding-top", "0px");
        } else if (offsetTop > itemOffsetBottom) {
          item
            .find(".colls-item__title")
            .removeClass("fixed")
            .addClass("absolute");
        }
      });
    });
  }
  /*
   * Product
   */
  let product = $(".product");
  if (product.length > 0) {
    $(window).on("scroll", function () {
      let offsetTop = $(window).scrollTop();
      if (window.innerWidth > 991) {
        let productOffsetTop = product.offset().top;
        let productOffsetBottom =
          productOffsetTop +
          product.find(".product__row").height() -
          product.find(".product__wrap").height();

        if (
          offsetTop > productOffsetTop &&
          offsetTop < productOffsetBottom &&
          !product.hasClass("fixed")
        ) {
          product.addClass("fixed").removeClass("absolute");
        } else if (offsetTop < productOffsetTop) {
          product.removeClass("fixed");
        } else if (
          offsetTop > productOffsetBottom &&
          !product.hasClass("absolute")
        ) {
          product.removeClass("fixed").addClass("absolute");
        }
      } else {
        let productFixedTop = $(".product__right").offset().top
        if (productFixedTop + $(".product__fixed").height() + 35 - offsetTop < vh * 100) {
          $(".product__fixed").removeClass("fixed");
        } else {
          $(".product__fixed").addClass("fixed");
        }
      }
    });
  }
  $(".js-product-anchor").on("click", function (e) {
    e.preventDefault();
    let target = $(".product__collection");
    let targetOffsetTop = $(target).offset().top
    let add = 0
    if ($(".product__fixed").hasClass("fixed")) {
      add = $(".product__fixed").height()
    } else {
      add = 0
    }
    let destination = targetOffsetTop + add - 10
    $("html,body").animate({ scrollTop: destination }, 600);
    return false;
  });

  $(".product-info__more").on("click", function (e) {
    e.preventDefault();
    let list = $(this).siblings(".product-info__list");
    list.toggleClass("open");
    if ($(this).hasClass("open")) {
      $(this).removeClass("open").find("span").text("Развернуть");
    } else {
      $(this).addClass("open").find("span").text("Свернуть");
    }
  });

  $(".js-copy-product-code").on("click", function (e) {
    e.preventDefault();
    let $tmp = $("<input>");
    $("body").append($tmp);
    $tmp.val($(".product__code span").text()).select();
    document.execCommand("copy");
    $tmp.remove();
    $(".js-copy-label").addClass("open");

    setTimeout(function () {
      $(".js-copy-label").removeClass("open");
    }, 3500);
  });

  $(".js-copy-product-link").on("click", function (e) {
    e.preventDefault();
    let $tmp = $("<input>");
    $("body").append($tmp);
    $tmp.val($(this).attr("href")).select();
    document.execCommand("copy");
    $tmp.remove();
    $(".js-copy-label-light").addClass("open");

    setTimeout(function () {
      $(".js-copy-label-light").removeClass("open");
    }, 3500);
  });

  /*
   * Collection
   */

  let goods = $(".goods");

  if (goods.length > 0) {
    let goodsNav = $(".goods-nav");
    if (screenWidth > 767) {
      $(window).on("scroll", function () {
        let offsetTop = $(window).scrollTop();
        let goodsOffsetTop = goods.offset().top - 84;
        let goodsOffsetBottom =
          goods.offset().top + goods.height() - goodsNav.height() - 84;

        if (offsetTop > goodsOffsetTop && offsetTop < goodsOffsetBottom) {
          goodsNav.addClass("fixed");
        } else {
          goodsNav.removeClass("fixed");
        }

        $(".goods-nav__link").each(function () {
          let sectionOffset = $(this.hash).offset().top - 94;
          if (
            sectionOffset <= offsetTop &&
            offsetTop < sectionOffset + $(this.hash).height()
          ) {
            $(this).addClass("active");
          } else {
            $(this).removeClass("active");
          }
        });
      });
    } else {
      $(".goods-nav__link").removeClass("js-anchor");
      $(".goods-nav__link").on("click", function (e) {
        e.preventDefault();
        $(this)
          .addClass("active")
          .siblings(".goods-nav__link")
          .removeClass("active");
        $(this.hash)
          .fadeIn()
          .addClass("active")
          .siblings(".coll-goods")
          .hide()
          .removeClass("active");

        $(".coll-goods").masonry({
          gutter: gutterMasonryColl,
          //columnWidth: colMasonryWidth,
          itemSelector: ".coll-goods__item",
          lazyLoad: true,
        });
      });
    }
  }

  /*
   * Masonry
   */

  let gutterMasonry = 0;
  let gutterMasonryColl = 0;
  let carditemGutter = 0
  if (windowWidth > 1859) {
    gutterMasonry = 144;
    gutterMasonryColl = 144;
    carditemGutter = 392
  } else if (windowWidth <= 1859 && windowWidth > 1599) {
    gutterMasonry = 122;
    gutterMasonryColl = 122;
    carditemGutter = 328
  } else if (windowWidth <= 1599 && windowWidth > 1279) {
    gutterMasonry = 101;
    gutterMasonryColl = 101;
    carditemGutter = 264
  } else if (windowWidth <= 1279 && windowWidth > 991) {
    gutterMasonry = 133;
    gutterMasonryColl = 60;
    carditemGutter = 133
  } else if (windowWidth <= 991 && windowWidth > 767) {
    gutterMasonry = 20;
    gutterMasonryColl = 20;
    colMasonryWidth = 216;
  } else if (windowWidth <= 767 && windowWidth > 575) {
    gutterMasonry = 86;
    gutterMasonryColl = 86;
  } else if (windowWidth <= 575) {
    gutterMasonry = 10;
    gutterMasonryColl = 10;
  }

  $(window).on("resize", function () {
    windowWidth = window.innerWidth
    if (windowWidth > 1859) {
      gutterMasonry = 144;
      gutterMasonryColl = 144;
      carditemGutter = 392
    } else if (windowWidth <= 1859 && windowWidth > 1599) {
      gutterMasonry = 122;
      gutterMasonryColl = 122;
      carditemGutter = 328
    } else if (windowWidth <= 1599 && windowWidth > 1279) {
      gutterMasonry = 101;
      gutterMasonryColl = 101;
      carditemGutter = 264
    } else if (windowWidth <= 1279 && windowWidth > 991) {
      gutterMasonry = 133;
      gutterMasonryColl = 60;
      carditemGutter = 133
    } else if (windowWidth <= 991 && windowWidth > 767) {
      gutterMasonry = 20;
      gutterMasonryColl = 20;
      colMasonryWidth = 216;
    } else if (windowWidth <= 767 && windowWidth > 575) {
      gutterMasonry = 86;
      gutterMasonryColl = 86;
    } else if (windowWidth <= 575) {
      gutterMasonry = 10;
      gutterMasonryColl = 10;
    }
    $cataloGridMain = $(".catalog-grid--main")
    $cataloGridMain.imagesLoaded(function () {
      $cataloGridMain.masonry({
        horizontalOrder: true,
        gutter: gutterMasonry,
        itemSelector: ".catalog-grid__item--main",
        columnWidth: '.catalog-grid__item--main'
      });
    })
    $cataloGridPromo = $(".catalog-grid--promo")
    $cataloGridPromo.imagesLoaded(function () {
      $cataloGridPromo.masonry({
        horizontalOrder: true,
        gutter: gutterMasonry,
        itemSelector: ".catalog-grid__item--promo",
        columnWidth: '.catalog-grid__item--promo'
      });
    })
    $coolGoods = $(".coll-goods")
    $coolGoods.imagesLoaded(function () {
      $coolGoods.masonry({
        horizontalOrder: true,
        gutter: gutterMasonryColl,
        itemSelector: ".coll-goods__item",
        columnWidth: '.coll-goods__item',
      });
    })
    $cardItems = $(".card-items")
    $cardItems.imagesLoaded(function () {
      $cardItems.masonry({
        horizontalOrder: true,
        gutter: carditemGutter,
        itemSelector: ".card-item",
        columnWidth: '.card-item',
      });
    })

  });
  $(window).on("resize", function () {
    alert("resize")
  })
  $cataloGridMain = $(".catalog-grid--main")
  $(".catalog-grid--main").imagesLoaded(function () {
    $cataloGridMain.masonry({
      horizontalOrder: true,
      gutter: gutterMasonry,
      itemSelector: ".catalog-grid__item--main",
      columnWidth: '.catalog-grid__item--main'
    });
  })
  $cataloGridPromo = $(".catalog-grid--promo")
  $cataloGridPromo.imagesLoaded(function () {
    $cataloGridPromo.masonry({
      horizontalOrder: true,
      gutter: gutterMasonry,
      itemSelector: ".catalog-grid__item--promo",
      columnWidth: '.catalog-grid__item--promo'
    });
  })

  $coolGoods = $(".coll-goods")
  $coolGoods.imagesLoaded(function () {
    $coolGoods.masonry({
      horizontalOrder: true,
      gutter: gutterMasonryColl,
      itemSelector: ".coll-goods__item",
      columnWidth: '.coll-goods__item',
    });
  })
  $cardItems = $(".card-items")
  $cardItems.imagesLoaded(function () {
    $cardItems.masonry({
      horizontalOrder: true,
      gutter: carditemGutter,
      itemSelector: ".card-item",
      columnWidth: '.card-item',
    });
  })
  /*
   * Range slider price
   */

  const $range = $(".js-range-price");
  const $inputFrom = $(".js-input-from");
  const $inputTo = $(".js-input-to");
  let instance,
    min = 0,
    max = 5000,
    from = 0,
    to = 0;

  $range.ionRangeSlider({
    grid: false,
    type: "double",
    min: min,
    max: max,
    from: 350,
    to: 3000,
    prettify_enabled: true,
    onStart: updateInputs,
    onChange: updateInputs,
  });

  instance = $range.data("ionRangeSlider");

  function updateInputs(data) {
    from = data.from;
    to = data.to;

    $inputFrom.prop("value", from);
    $inputTo.prop("value", to);
  }

  $inputFrom.on("input", function () {
    var val = $(this).prop("value");

    if (val < min) {
      val = min;
    } else if (val > to) {
      val = to;
    }

    instance.update({
      from: val,
    });
  });

  $inputTo.on("input", function () {
    var val = $(this).prop("value");

    if (val < from) {
      val = from;
    } else if (val > max) {
      val = max;
    }

    instance.update({
      to: val,
    });
  });

  // $("#range-price").slider({
  //   range: true,
  //   min: 0,
  //   max: 5000,
  //   values: [1200, 3500],
  //   slide: function (event, ui) {
  //     $("#min-price").val(ui.values[0]);
  //     $("#max-price").val(ui.values[1]);
  //   },
  // });

  // $("#min-price").val($("#range-price").slider("values", 0));
  // $("#max-price").val($("#range-price").slider("values", 1));
});


if (window.location.search) {
  const searchParams = new URLSearchParams(window.location.search);
  for (const [key, value] of searchParams) {
    if (key === "FILTER_SEARCH") {
      const filterSelected = document.querySelector(".filter__selected")
      let filterItem = `<div class="filter__item"><span>${value}</span>
          <a href="#">
            <svg><use href="img/icons/sprite.svg#icon-close"></use></svg>
          </a>
        </div>`
      filterSelected.insertAdjacentHTML("beforeend", filterItem)
    }
  }

}
function cleanSearchFilter(form) {
  form.querySelector("input").value = ""
  const resetBtn = form.querySelector(".f-search__reset")
  resetBtn.style.visibility = "hidden"
  resetBtn.style.pointerEvents = "none"
}
function searchFilterOnSubmit(form) {
  event.preventDefault()
  cleanSearchFilter(form)
}
function searchFilterOnChange(inp) {
  let form = inp.closest(".f-search__form") || inp.parentNode.parentNode
  const resetBtn = form.querySelector(".f-search__reset")
  if (inp.value.length > 0) {
    resetBtn.style.visibility = "visible"
    resetBtn.style.pointerEvents = "auto"
  } else {
    resetBtn.style.visibility = "hidden"
    resetBtn.style.pointerEvents = "none"
  }
}
function searchFilterOnReset(form) {
  event.preventDefault()
  cleanSearchFilter(form)
}

$().fancybox({
  selector: '.product-carousel .slick-slide:not(.slick-cloned) .item, .product__video,.product__3d'
});