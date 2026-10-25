
/* ========================================
   FOND ANIMÉ — PORTFOLIO ROMAIN
======================================== */

(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "background-canvas";
    canvas.setAttribute("aria-hidden", "true");

    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrame = null;
    let lastFrame = 0;
    let time = 0;

    const isMobile = () => window.innerWidth < 768;

    function resizeCanvas() {
        const pixelRatio = Math.min(
            window.devicePixelRatio || 1,
            1.5
        );

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = Math.round(width * pixelRatio);
        canvas.height = Math.round(height * pixelRatio);

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

        createParticles();
        drawFrame();
    }

    function createParticles() {
        const count = Math.min(
            Math.round((width * height) / 10000),
            isMobile() ? 45 : 100
        );

        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.4,
            speed: Math.random() * 0.22 + 0.04,
            phase: Math.random() * Math.PI * 2,
            blue: Math.random() > 0.5
        }));
    }

    /* Halo lumineux flou */
    function drawGlow(x, y, radius, color, alpha) {
        const gradient = ctx.createRadialGradient(
            x, y, 0,
            x, y, radius
        );

        gradient.addColorStop(
            0,
            `rgba(${color}, ${alpha})`
        );

        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(
            x - radius,
            y - radius,
            radius * 2,
            radius * 2
        );
    }

    /* Courbes lumineuses en mouvement */
    function drawLightTrails(t) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        const trails = [
            {
                color: "100, 65, 255",
                y: 0.23,
                amplitude: 0.17,
                speed: 0.18,
                alpha: 0.22
            },
            {
                color: "30, 115, 255",
                y: 0.67,
                amplitude: 0.13,
                speed: -0.13,
                alpha: 0.19
            },
            {
                color: "170, 85, 255",
                y: 0.47,
                amplitude: 0.22,
                speed: 0.11,
                alpha: 0.12
            }
        ];

        trails.forEach((trail, index) => {
            const offset = Math.sin(t * trail.speed + index) * 0.12;

            const startY = height * (trail.y + offset);
            const controlY1 =
                height * (trail.y - trail.amplitude) +
                Math.sin(t * 0.2 + index) * height * 0.12;

            const controlY2 =
                height * (trail.y + trail.amplitude) +
                Math.cos(t * 0.17 + index) * height * 0.12;

            const endY = height * (trail.y - offset);

            const gradient = ctx.createLinearGradient(
                0, startY,
                width, endY
            );

            gradient.addColorStop(
                0,
                `rgba(${trail.color}, 0)`
            );

            gradient.addColorStop(
                0.35,
                `rgba(${trail.color}, ${trail.alpha})`
            );

            gradient.addColorStop(
                0.7,
                `rgba(95, 145, 255, ${trail.alpha * 1.5})`
            );

            gradient.addColorStop(
                1,
                `rgba(${trail.color}, 0)`
            );

            ctx.beginPath();
            ctx.moveTo(-30, startY);

            ctx.bezierCurveTo(
                width * 0.28,
                controlY1,
                width * 0.67,
                controlY2,
                width + 30,
                endY
            );

            ctx.strokeStyle = gradient;
            ctx.lineWidth = index === 1 ? 1.6 : 1;
            ctx.stroke();
        });

        ctx.restore();
    }

    /* Orbites décoratives */
    function drawOrbits(t) {
        const x = width * (isMobile() ? 0.7 : 0.73);
        const y = height * 0.37;
        const radiusX = Math.min(width * 0.28, 340);
        const radiusY = Math.min(height * 0.19, 180);

        ctx.save();
        ctx.translate(x, y);
        ctx.globalCompositeOperation = "lighter";

        for (let i = 0; i < 3; i++) {
            ctx.save();
            ctx.rotate(
                t * (0.035 + i * 0.012) +
                (i * Math.PI) / 3
            );

            ctx.beginPath();
            ctx.ellipse(
                0, 0,
                radiusX * (0.7 + i * 0.16),
                radiusY * (0.7 + i * 0.12),
                0, 0, Math.PI * 2
            );

            ctx.strokeStyle = i % 2 === 0
                ? "rgba(139, 92, 246, 0.15)"
                : "rgba(59, 130, 246, 0.14)";

            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.restore();
        }

        ctx.restore();
    }

    /* Étoiles et particules flottantes */
    function drawParticles(t, delta) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        particles.forEach((particle) => {
            particle.y -= particle.speed * delta;

            if (particle.y < -5) {
                particle.y = height + 5;
                particle.x = Math.random() * width;
            }

            const twinkle =
                0.3 + (Math.sin(t * 1.5 + particle.phase) + 1) * 0.35;

            const color = particle.blue
                ? "80, 145, 255"
                : "165, 115, 255";

            ctx.beginPath();
            ctx.arc(
                particle.x,
                particle.y,
                particle.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = `rgba(${color}, ${twinkle})`;
            ctx.fill();

            if (particle.radius > 1.35) {
                drawGlow(
                    particle.x,
                    particle.y,
                    8,
                    color,
                    0.09
                );
            }
        });

        ctx.restore();
    }

    /* Rendu d'une image du fond */
    function drawFrame(delta = 0) {
        ctx.clearRect(0, 0, width, height);

        drawGlow(
            width * 0.74,
            height * 0.36,
            Math.min(width * 0.32, 360),
            "95, 45, 220",
            0.075
        );

        drawGlow(
            width * 0.25,
            height * 0.78,
            Math.min(width * 0.28, 300),
            "30, 80, 230",
            0.055
        );

        drawLightTrails(time);
        drawOrbits(time);
        drawParticles(time, delta);
    }

    function animate(timestamp) {
        if (reducedMotion.matches) {
            drawFrame(0);
            animationFrame = null;
            return;
        }

        if (!lastFrame) lastFrame = timestamp;

        const delta = Math.min(
            (timestamp - lastFrame) / 16.67,
            2
        );

        lastFrame = timestamp;
        time += delta * 0.008;

        drawFrame(delta);

        animationFrame = requestAnimationFrame(animate);
    }

    function startAnimation() {
        if (animationFrame !== null) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }

        lastFrame = 0;

        if (reducedMotion.matches) {
            drawFrame(0);
            return;
        }

        animationFrame = requestAnimationFrame(animate);
    }

    resizeCanvas();
    startAnimation();

    window.addEventListener("resize", resizeCanvas);

    reducedMotion.addEventListener("change", startAnimation);
})();
