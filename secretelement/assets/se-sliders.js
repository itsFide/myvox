const heroSwiper = new Swiper('.heroSwiper', {
    // Optional parameters
    direction: 'horizontal',
    autoplay:{
        delay: 10000,
    },
    effect: "fade",
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable:true,
    },

});
const customersSliders = new Swiper('.customersSlider', {
    loop:true,
    // If we need pagination
    pagination: {
        el: '.customers-pagination',
        clickable:true
    },
    navigation: {
      nextEl: '.customers-slider-next',
      prevEl: '.customers-slider-prev',
    },
    breakpoints: {
      310:{
        spaceBetween: 10, 
        slidesPerView: 1.35,
        centeredSlides:true, 
      },
      // when window width is >= 320px
      650: {
        spaceBetween: 30, 
        slidesPerView: 2.35, 
      },
      // when window width is >= 640px
      1025: {
        spaceBetween: 30, 
        slidesPerView:5.7,
      }
    }
});
let slider1 = document.querySelector('.mySwiper')
if(slider1){
    var swiper2 = new Swiper(".mySwiper", { 
        spaceBetween: 10, 
        slidesPerView: 5, 
        navigation: { 
          nextEl: ".buy-product-thumb-arrow-right", 
          prevEl: ".buy-product-thumb-arrow-left" 
        },
        breakpoints: {
          // when window width is >= 320px
          320: {
            direction: "horizontal",
            slidesPerView: 4, 
          },
          // when window width is >= 480px
          650: {
            direction: "vertical",
            slidesPerView: 4, 
            spaceBetween: 12, 
          },
          // when window width is >= 640px
          1024: {
            direction: "vertical",
            spaceBetween: 12, 
            slidesPerView: 4, 
          }
        }
    });
    
    let lastActiveIndex = swiper2.activeIndex;
    swiper2.slides.forEach((slide, index) => {
        slide.addEventListener("click", function () {
            const currentIndex = swiper2.activeIndex;
            if (index > currentIndex) {
                localStorage.setItem("previousActiveIndex", lastActiveIndex.toString());
                lastActiveIndex = index;
            } else if (index < currentIndex) {
                localStorage.setItem("previousActiveIndex", lastActiveIndex.toString());
                lastActiveIndex = index;
            } else {
                return;
            }
            localStorage.setItem("currentActiveIndex", index.toString());
            let previousActiveIndex = parseInt(localStorage.getItem("previousActiveIndex"));
            let currentActiveIndex = parseInt(localStorage.getItem("currentActiveIndex"));
            if (currentActiveIndex > previousActiveIndex) {
                swiper2.slideNext();
            } else if (currentActiveIndex < previousActiveIndex) {
                swiper2.slidePrev();
            }
        });
    });
}
let slider2 = document.querySelector('.mySwiper2')
if(slider2){
    var swiperMain = new Swiper(".mySwiper2", { 
      spaceBetween: 10, 
      navigation: { 
        nextEl: ".buy-product-main-arrow-left", 
        prevEl: ".buy-product-main-arrow-right" 
      }, 
      pagination: { 
        el: ".buy-product-pagination", 
        clickable: true 
      },
      thumbs: { 
        swiper: swiper2
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
            navigation: { 
                nextEl: ".buy-product-main-arrow-left", 
                prevEl: ".buy-product-main-arrow-right" 
            }, 
        },
        // when window width is >= 480px
        650: {
          
        },
        // when window width is >= 640px
        1024: {
            navigation: { 
                nextEl: ".buy-product-thumb-arrow-right", 
                prevEl: ".buy-product-thumb-arrow-left" 
            },
        }
      } 
    });
}


let slider3 = document.querySelector('.productThumbsSlider')
if(slider3){
    var swiper3 = new Swiper(".productThumbsSlider", { 
        spaceBetween: 10, 
        slidesPerView: 5, 
        navigation: { 
          nextEl: ".buy-product-thumb-arrow-right", 
          prevEl: ".buy-product-thumb-arrow-left" 
        },
        breakpoints: {
          // when window width is >= 320px
          320: {
            direction: "horizontal",
            slidesPerView: 4, 
          },
          // when window width is >= 480px
          650: {
            direction: "vertical",
            slidesPerView: 4, 
            spaceBetween: 12, 
          },
          // when window width is >= 640px
          1024: {
            direction: "horizontal",
            spaceBetween: 12, 
            slidesPerView: 4, 
          }
        }
    });
    
    let lastActiveIndex = swiper3.activeIndex;
    swiper3.slides.forEach((slide, index) => {
        slide.addEventListener("click", function () {
            const currentIndex = swiper3.activeIndex;
            if (index > currentIndex) {
                localStorage.setItem("previousActiveIndex", lastActiveIndex.toString());
                lastActiveIndex = index;
            } else if (index < currentIndex) {
                localStorage.setItem("previousActiveIndex", lastActiveIndex.toString());
                lastActiveIndex = index;
            } else {
                return;
            }
            localStorage.setItem("currentActiveIndex", index.toString());
            let previousActiveIndex = parseInt(localStorage.getItem("previousActiveIndex"));
            let currentActiveIndex = parseInt(localStorage.getItem("currentActiveIndex"));
            if (currentActiveIndex > previousActiveIndex) {
              swiper3.slideNext();
            } else if (currentActiveIndex < previousActiveIndex) {
              swiper3.slidePrev();
            }
        });
    });
}
let slider4 = document.querySelector('.productMainImgSlider')
if(slider4){
    var swiperMain = new Swiper(".productMainImgSlider", { 
      spaceBetween: 10, 
      navigation: { 
        nextEl: ".buy-product-main-arrow-left", 
        prevEl: ".buy-product-main-arrow-right" 
      }, 
      pagination: { 
        el: ".buy-product-pagination", 
        clickable: true 
      },
      thumbs: { 
        swiper: swiper3
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
            navigation: { 
                nextEl: ".buy-product-main-arrow-left", 
                prevEl: ".buy-product-main-arrow-right" 
            }, 
        },
        // when window width is >= 480px
        650: {
          
        },
        // when window width is >= 640px
        1024: {
            navigation: { 
                nextEl: ".buy-product-thumb-arrow-right", 
                prevEl: ".buy-product-thumb-arrow-left" 
            },
        }
      } 
    });
}

let slider5 = document.querySelector('.combineSlider')
if(slider5){
    var combineSlider = new Swiper(".combineSlider", { 
      spaceBetween: 34, 
      slidesPerView:4,
      loop:true,
      navigation: { 
        nextEl: ".combine-button-next", 
        prevEl: ".combine-button-prev" 
      }, 
      pagination: { 
        el: ".combine-pagination", 
        clickable: true 
      },
      breakpoints: {
        // when window width is >= 320px
        320: {
            
        },
        // when window width is >= 480px
        650: {
          slidesPerView:2.1,
          spaceBetween: 34, 
          centeredSlides:true, 
          navigation: { 
            nextEl: ".combine-button-next", 
            prevEl: ".combine-button-prev" 
          }, 
        },
        // when window width is >= 640px
        1024: {
          slidesPerView:4,
          navigation: { 
            nextEl: ".combine-button-next-2", 
            prevEl: ".combine-button-prev-2" 
          }, 
        }
      } 
    });
}

let discoverSlider = document.querySelector('.discoverSlider')
if(discoverSlider){
  const swiper = new Swiper('.discoverSlider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 5.5,
    centeredSlides:true,
    
  });
}


let bergamotLandingImproveSlider = document.querySelector('.bergamotImprove')
if(bergamotLandingImproveSlider){
  const swiper = new Swiper('.bergamotImprove', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 2.1,
    centeredSlides:true,
    spaceBetween:40,
  });
}
let bergamotLandingIngridientSlider = document.querySelector('.bergamotIngridients')
if(bergamotLandingImproveSlider){
  const swiper = new Swiper('.bergamotIngridients', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 2.1,
    centeredSlides:true,
    spaceBetween:40,
  });
}

let bergamotCustomersSliders = document.querySelector('.bergamotCustomerSlider')
if(bergamotCustomersSliders){
  const bergamotCustomersSliders = new Swiper('.bergamotCustomerSlider', {
    loop:true,
    // If we need pagination
    pagination: {
        el: '.customers-pagination',
        clickable:true
    },
    navigation: {
      nextEl: '.customers-slider-next',
      prevEl: '.customers-slider-prev',
    },
    breakpoints: {
      310:{
        spaceBetween: 10, 
        slidesPerView: 1.35,
        centeredSlides:true, 
      },
      // when window width is >= 320px
      650: {
        spaceBetween: 30, 
        slidesPerView: 2.35, 
        allowTouchMove:true
      },
      // when window width is >= 640px
      1025: {
        spaceBetween: 30, 
        slidesPerView:5.7,
        allowTouchMove:false
      }
    }
  });
}
