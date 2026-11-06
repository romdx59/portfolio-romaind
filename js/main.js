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

    
    // =========================
    // VISIONNEUSE DES IMAGES
    // =========================
    
    const imageButtons = document.querySelectorAll(".experience-image-button");
    const lightbox = document.getElementById("experience-lightbox");
    const lightboxImage = document.getElementById("experience-lightbox-image");
    const lightboxClose = document.querySelector(".experience-lightbox-close");
    
    function openLightbox(image) {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
    
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
    }
    
    function closeLightbox() {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
    
        // Réinitialisation après l'animation
        setTimeout(() => {
            if (!lightbox.classList.contains("active")) {
                lightboxImage.src = "";
                lightboxImage.alt = "";
            }
        }, 300);
    }
    
    // Ouverture au clic sur une photo
    imageButtons.forEach(button => {
        button.addEventListener("click", () => {
            const image = button.querySelector("img");
            openLightbox(image);
        });
    });
    
    // Fermeture avec le bouton
    lightboxClose.addEventListener("click", closeLightbox);
    
    // Fermeture en cliquant sur le fond
    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Fermeture avec Échap
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });

    
/* ========================================
   MODALS DES PROJETS
======================================== */

const projectModals = document.querySelectorAll(".project-modal");

// Ouvrir un modal
function openProjectModal(modal) {
    if (!modal) return;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}

// Fermer un modal
function closeProjectModal(modal) {
    if (!modal) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    const anotherModalOpen = document.querySelector(
        ".project-modal.active, .experience-modal.active"
    );

    if (!anotherModalOpen) {
        document.body.style.overflow = "";
    }
}

// Ouverture au clic sur une carte
document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-project-modal]");

    if (!trigger) return;

    const modalId = trigger.dataset.projectModal;
    const modal = document.getElementById(modalId);

    openProjectModal(modal);
});

// Ouverture au clavier
document.querySelectorAll("[data-project-modal]").forEach(card => {
    card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();

            const modal = document.getElementById(
                card.dataset.projectModal
            );

            openProjectModal(modal);
        }
    });
});

// Fermeture avec le bouton ou le fond
projectModals.forEach(modal => {

    const closeButton = modal.querySelector(".project-modal-close");

    closeButton?.addEventListener("click", () => {
        closeProjectModal(modal);
    });

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            closeProjectModal(modal);
        }
    });

});

// Fermeture avec Échap
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        projectModals.forEach(closeProjectModal);
    }
});

});
