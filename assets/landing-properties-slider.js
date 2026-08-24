/**
 * Properties Ticker & Landing Scroll Handler
 */

function updatePropsTickerSpeed() {
    const TARGET_SPEED_PX_PER_SEC = 55; // Pixels per second for uniform visual speed across all tickers

    const tickers = document.querySelectorAll(".props-ticker");
    tickers.forEach((ticker) => {
        const groups = ticker.querySelectorAll(".props-ticker__group");
        if (groups.length === 1 && groups[0]) {
            const cloned = groups[0].cloneNode(true);
            groups[0].after(cloned);
        }

        const track = ticker.querySelector(".props-ticker__track");
        const firstGroup = ticker.querySelector(".props-ticker__group");

        if (track && firstGroup) {
            const groupWidth = firstGroup.offsetWidth;
            if (groupWidth > 0) {
                const duration = groupWidth / TARGET_SPEED_PX_PER_SEC;
                track.style.animationDuration = `${duration.toFixed(2)}s`;
            }
            track.style.animationPlayState = "running";
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updatePropsTickerSpeed);
} else {
    updatePropsTickerSpeed();
}

window.addEventListener("resize", updatePropsTickerSpeed);

// Smooth scroll to product section
const scrollLinks = document.querySelectorAll(".scroll-btn");
scrollLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        const target = document.getElementById("land-products");
        if (target) {
            const top = target.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: top, behavior: "smooth" });
        }
    });
});
