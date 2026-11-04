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

// ==============================
// THEME SWITCHER
// ==============================

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

// Récupération du thème sauvegardé
let currentTheme = localStorage.getItem("theme") || "dark";

// Application du thème
function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    if (theme === "light") {
        themeIcon.className = "fas fa-moon";
        themeToggle.setAttribute("aria-label", "Activer le mode sombre");
    } else {
        themeIcon.className = "fas fa-sun";
        themeToggle.setAttribute("aria-label", "Activer le mode clair");
    }
}

// Initialisation
applyTheme(currentTheme);

// Changement de thème
themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";

    localStorage.setItem("theme", currentTheme);

    applyTheme(currentTheme);
});