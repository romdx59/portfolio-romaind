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


/* =========================
   EXPERIENCES - MODALES
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const experienceButtons = document.querySelectorAll(
        ".experience-card-trigger"
    );

    const experienceModals = document.querySelectorAll(
        ".experience-modal"
    );

    const closeButtons = document.querySelectorAll(
        ".experience-modal-close"
    );

    function openModal(modal) {
        if (!modal) return;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal(modal) {
        if (!modal) return;

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");

        const anotherModalOpen = document.querySelector(
            ".experience-modal.active"
        );

        if (!anotherModalOpen) {
            document.body.style.overflow = "";
        }
    }

    // Ouvrir une modale
    experienceButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.dataset.modal;
            const modal = document.getElementById(modalId);

            openModal(modal);
        });
    });

    // Fermer avec le bouton
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            closeModal(button.closest(".experience-modal"));
        });
    });

    // Fermer en cliquant sur le fond
    experienceModals.forEach(modal => {
        modal.addEventListener("click", event => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Fermer avec la touche Échap
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            experienceModals.forEach(modal => {
                closeModal(modal);
            });
        }
    });

});
