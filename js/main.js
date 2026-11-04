// ==============================
// FRAMEWORK CAROUSEL
// ==============================

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".framework-track");
    const prevButton = document.querySelector(".framework-arrow.prev");
    const nextButton = document.querySelector(".framework-arrow.next");

    if (!track || !prevButton || !nextButton) return;

    const cards = track.querySelectorAll(".framework-card");

    let currentIndex = 0;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextButton.addEventListener("click", () => {
        currentIndex++;

        if (currentIndex >= cards.length) {
            currentIndex = 0;
        }

        updateCarousel();
    });

    prevButton.addEventListener("click", () => {
        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = cards.length - 1;
        }

        updateCarousel();
    });
});