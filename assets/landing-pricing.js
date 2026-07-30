window.addEventListener('DOMContentLoaded', function () {
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


    });
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


    });
})