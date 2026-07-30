window.addEventListener('DOMContentLoaded', () => {


    function getCurrentMode() {
        return window.innerWidth <= 650 ? BREAKPOINTS.MOBILE : BREAKPOINTS.DESKTOP;
    }

    function getResponsiveValue(px, mobilePx, baseWidth = 393) {
        if (window.innerWidth > 1919) {
            return px;
        }
        const scale = window.innerWidth / baseWidth;


        return baseWidth === BREAKPOINTS.DESKTOP ? px * scale : mobilePx * scale;
    }


    function updateSwiperSpacing(swiper) {
        swiper.params.spaceBetween = getResponsiveValue(20, 12, getCurrentMode());
        swiper.params.slidesOffsetAfter = getResponsiveValue(140, 96, getCurrentMode());
        if (window.innerWidth <= 650) {
            swiper.params.slidesOffsetBefore = getResponsiveValue(12, 12, getCurrentMode());
        }
        swiper.update();
    }

    function initReviewVideos() {
        const items = document.querySelectorAll('.reviews__item');

        items.forEach((item) => {
            const video = item.querySelector('video');
            const btn = item.querySelector('.reviews__play');
            const poster = item.querySelector('.video-poster'); // если есть отдельный элемент постера

            if (!video || !btn) return;

            function playVideo() {
                video.play();
                btn.classList.remove('active');
            }

            function stopVideo() {
                video.pause();
                btn.classList.add('active');
            }

            btn.addEventListener('click', () => {
                video.paused ? playVideo() : stopVideo();
            });

            video.addEventListener('click', () => {
                if (!video.paused) stopVideo();
            });

            // на случай если видео закончилось само
            video.addEventListener('ended', stopVideo);
        });
    }

    initReviewVideos();

    function initSlider() {

        function updateReviewsProgress(swiper) {
            const total = swiper.slides.length;

            let current = 1;
            if (window.innerWidth >= 650) {
                current = Math.min(swiper.snapIndex + 2, total);
            } else {
                current = Math.min(swiper.snapIndex + 1, total);
            }


            const counterEl = document.querySelector('.reviews__counter');
            if (counterEl) {
                counterEl.innerHTML = `<strong>${current}</strong> / ${total}`;
            }

            const progressBarEl = document.querySelector('.reviews__progress-bar span');
            if (progressBarEl) {
                const percent = (current / total) * 100;
                progressBarEl.style.width = `${Math.min(Math.max(percent, 0), 100)}%`;
            }
        }

        const reviewsSwiper = new Swiper('.reviews__slider', {
            slidesPerView: 2.34,
            slidesOffsetAfter: getResponsiveValue(140, 96, getCurrentMode()),
            spaceBetween: getResponsiveValue(20, 12, getCurrentMode()),
            navigation: {
                nextEl: '.reviews__button--next',
                prevEl: '.reviews__button--prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 0.8,
                    slidesOffsetBefore: getResponsiveValue(12, 12, getCurrentMode()),
                },
                651: {
                    slidesPerView: 2.34,
                }
            },
            on: {
                init: function () {
                    updateReviewsProgress(this);
                },
                slideChange: function () {
                    updateReviewsProgress(this);
                },
                resize: function () {
                    updateReviewsProgress(this);
                },
            },

        });


        window.addEventListener('resize', () => {
            updateSwiperSpacing(reviewsSwiper)
        });
    }

    initSlider()


})