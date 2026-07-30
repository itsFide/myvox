const BREAKPOINTS = {
    MOBILE: 393,
    DESKTOP: 1476,
};





window.addEventListener('DOMContentLoaded', function () {

    function getCurrentMode() {
        return window.innerWidth <= 650 ? BREAKPOINTS.MOBILE : BREAKPOINTS.DESKTOP;
    }

    function getResponsiveValue(px,mobilePx, baseWidth = 393) {
        if (window.innerWidth > 1919) {
            return px;
        }
        const scale = window.innerWidth / baseWidth;
   
        
        return baseWidth === BREAKPOINTS.DESKTOP ? px * scale : mobilePx * scale;
    }

    function updateSwiperSpacing(swiper) {
        swiper.params.spaceBetween = getResponsiveValue(20, 8, getCurrentMode());
        swiper.update();
    }

    const propertiesSlider1 = new Swiper('.properties-block__items-1', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        slidesPerView: 'auto',
        spaceBetween: getResponsiveValue(20, 8, getCurrentMode()),
        speed: 4000,
        autoplay: {
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
        },
        freeMode: {
            enabled: true,
            momentum: false,
        },


    });

    const propertiesSlider2 = new Swiper('.properties-block__items-2', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        slidesPerView: 'auto',
        spaceBetween: getResponsiveValue(20, 8, getCurrentMode()),
        speed: 4000,
        autoplay: {
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
        },
        freeMode: {
            enabled: true,
            momentum: false,
        },


    });




    window.addEventListener('resize', () => {            
        updateSwiperSpacing(propertiesSlider1)
        updateSwiperSpacing(propertiesSlider2)
    });
})



