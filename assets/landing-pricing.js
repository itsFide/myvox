function initPricingSliders() {
    if (typeof Swiper === 'undefined') return;

    function updateArrowsVisibility(swiper) {
        if (!swiper || !swiper.el) return;
        const gallery = swiper.el.closest('.pricing-card__gallery');
        if (!gallery) return;
        if (swiper.activeIndex > 0) {
            gallery.classList.add('pricing-card__gallery--hide-arrows');
        } else {
            gallery.classList.remove('pricing-card__gallery--hide-arrows');
        }
    }

    const pricingSliderDark = new Swiper('.pricing-card__slider-1', {
        slidesPerView: 1,
        navigation: {
            nextEl: '.pricing-card__arrow--dark--next',
            prevEl: '.pricing-card__arrow--dark--prev',
        },
        pagination: {
            el: '.pricing-card__pagination--dark',
            clickable: true,
        },
        on: {
            init: function () {
                updateArrowsVisibility(this);
            },
            slideChange: function () {
                updateArrowsVisibility(this);
            }
        }
    });
    updateArrowsVisibility(pricingSliderDark);

    const pricingSliderLight = new Swiper('.pricing-card__slider-2', {
        slidesPerView: 1,
        navigation: {
            nextEl: '.pricing-card__arrow--light--next',
            prevEl: '.pricing-card__arrow--light--prev',
        },
        pagination: {
            el: '.pricing-card__pagination--light',
            clickable: true,
        },
        on: {
            init: function () {
                updateArrowsVisibility(this);
            },
            slideChange: function () {
                updateArrowsVisibility(this);
            }
        }
    });
    updateArrowsVisibility(pricingSliderLight);
}

if (typeof Swiper !== 'undefined') {
    initPricingSliders();
} else {
    window.addEventListener('DOMContentLoaded', initPricingSliders);
}