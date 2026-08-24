window.addEventListener('DOMContentLoaded', () => {

    const BREAKPOINTS = {
        MOBILE: 393,
        DESKTOP: 1920,
    };

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
        } else {
            swiper.params.slidesOffsetBefore = 0;
        }
        swiper.update();
    }

    function initReviewVideos() {
        const items = document.querySelectorAll('.reviews__item');

        items.forEach((item) => {
            const video = item.querySelector('video');
            const btn = item.querySelector('.reviews__play');

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
                current = Math.min(Math.max(swiper.activeIndex + 1, 1), total);
            }

            const counterEl = document.querySelector('.reviews__counter');
            if (counterEl) {
                counterEl.innerHTML = `<strong>${current}</strong> / ${total}`;
            }

            const progressBarEl = document.querySelector('.reviews__progress-bar span');
            if (progressBarEl) {
                let percent;
                if (window.innerWidth <= 650 && swiper.progress !== undefined) {
                    percent = Math.max((current / total) * 100, swiper.progress * 100);
                } else {
                    percent = (current / total) * 100;
                }
                progressBarEl.style.width = `${Math.min(Math.max(percent, 0), 100)}%`;
            }
        }

        const reviewsSwiper = new Swiper('.reviews__slider', {
            slidesPerView: 2.34,
            slidesOffsetAfter: getResponsiveValue(140, 96, getCurrentMode()),
            spaceBetween: getResponsiveValue(20, 12, getCurrentMode()),
            freeMode: {
                enabled: false,
            },
            navigation: {
                nextEl: '.reviews__button--next',
                prevEl: '.reviews__button--prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 0.8,
                    slidesOffsetBefore: getResponsiveValue(12, 12, getCurrentMode()),
                    freeMode: {
                        enabled: true,
                        sticky: false,
                        momentum: false,
                        momentumBounce: false,
                    },
                },
                651: {
                    slidesPerView: 2.14,
                    freeMode: {
                        enabled: false,
                    },
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
                progress: function () {
                    updateReviewsProgress(this);
                },
                setTranslate: function () {
                    updateReviewsProgress(this);
                },
            },

        });

        window.addEventListener('resize', () => {
            updateSwiperSpacing(reviewsSwiper);
        });

        let inertiaRafId = null;
        let touchHistory = [];
        let isTouching = false;

        function stopInertia() {
            if (inertiaRafId !== null) {
                cancelAnimationFrame(inertiaRafId);
                inertiaRafId = null;
            }
        }

        reviewsSwiper.on('touchStart', () => {
            isTouching = true;
            stopInertia();
            touchHistory = [{
                x: reviewsSwiper.translate,
                t: performance.now()
            }];
        });

        reviewsSwiper.on('sliderMove', () => {
            if (!isTouching) return;
            const now = performance.now();
            touchHistory.push({
                x: reviewsSwiper.translate,
                t: now
            });
            while (touchHistory.length > 0 && (now - touchHistory[0].t > 100)) {
                touchHistory.shift();
            }
        });

        reviewsSwiper.on('touchEnd', () => {
            isTouching = false;
            if (window.innerWidth > 650) return;

            const now = performance.now();
            const recent = touchHistory.filter(p => now - p.t <= 100);
            if (recent.length < 2) return;

            const first = recent[0];
            const last = recent[recent.length - 1];
            const dt = last.t - first.t;
            const dx = last.x - first.x;

            if (dt <= 0) return;
            let velocity = dx / dt; // px/ms

            if (Math.abs(velocity) < 0.04) return;

            stopInertia();

            let currentTranslate = reviewsSwiper.translate;
            let lastFrameTime = performance.now();

            function animateInertia(frameTime) {
                const delta = Math.min(frameTime - lastFrameTime, 32);
                lastFrameTime = frameTime;

                const friction = 0.952;
                const decay = Math.pow(friction, delta / 16.667);
                velocity *= decay;

                currentTranslate += velocity * delta;

                const minTranslate = reviewsSwiper.minTranslate();
                const maxTranslate = reviewsSwiper.maxTranslate();

                if (currentTranslate > minTranslate) {
                    const over = currentTranslate - minTranslate;
                    velocity *= Math.pow(0.6, delta / 16.667);
                    currentTranslate = minTranslate + over * Math.pow(0.7, delta / 16.667);
                    if (over < 0.5) {
                        currentTranslate = minTranslate;
                        velocity = 0;
                    }
                } else if (currentTranslate < maxTranslate) {
                    const under = maxTranslate - currentTranslate;
                    velocity *= Math.pow(0.6, delta / 16.667);
                    currentTranslate = maxTranslate - under * Math.pow(0.7, delta / 16.667);
                    if (under < 0.5) {
                        currentTranslate = maxTranslate;
                        velocity = 0;
                    }
                }

                reviewsSwiper.setTranslate(currentTranslate);
                reviewsSwiper.updateProgress();
                updateReviewsProgress(reviewsSwiper);

                if (Math.abs(velocity) > 0.015) {
                    inertiaRafId = requestAnimationFrame(animateInertia);
                } else {
                    inertiaRafId = null;
                }
            }

            inertiaRafId = requestAnimationFrame(animateInertia);
        });
    }

    initSlider();

});