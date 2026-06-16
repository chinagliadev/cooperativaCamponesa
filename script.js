(function () {
    const btn = document.querySelector('.nav-mobile-btn');
    const links = document.querySelector('.nav-links');
    const cta = document.querySelector('.nav-cta');

    btn.addEventListener('click', () => {
        const isOpen = links.classList.contains('mobile-open');

        if (isOpen) {
            links.classList.remove('mobile-open');
            cta.classList.remove('mobile-open');
            btn.innerHTML = '<i class="bi bi-list"></i>';
        } else {
            links.classList.add('mobile-open');
            cta.classList.add('mobile-open');
            btn.innerHTML = '<i class="bi bi-x"></i>';
        }
    });

    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            links.classList.remove('mobile-open');
            cta.classList.remove('mobile-open');
            btn.innerHTML = '<i class="bi bi-list"></i>';
        });
    });
})();

(function () {
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    resize();
    window.addEventListener('resize', resize);

    function rand(a, b) { return Math.random() * (b - a) + a }

    const shapes = ['●', '◆', '✦', '⬟', '▲'];
    const colors = ['rgba(92,110,74,0.14)', 'rgba(92,110,74,0.08)', 'rgba(166,85,44,0.10)', 'rgba(57,67,47,0.08)', 'rgba(92,110,74,0.10)'];

    for (let i = 0; i < 55; i++) {
        particles.push({
            x: rand(0, 1) * 100, y: rand(0, 1) * 100,
            size: rand(6, 22),
            vx: rand(-0.06, 0.06), vy: rand(-0.04, -0.015),
            opacity: rand(0.3, 1),
            shape: shapes[Math.floor(rand(0, shapes.length))],
            color: colors[Math.floor(rand(0, colors.length))],
            rot: rand(0, Math.PI * 2), rotV: rand(-0.003, 0.003)
        });
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            const px = (p.x / 100) * W;
            const py = (p.y / 100) * H;
            ctx.save();
            ctx.translate(px, py);
            ctx.rotate(p.rot);
            ctx.font = `${p.size}px sans-serif`;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.fillText(p.shape, 0, 0);
            ctx.restore();
            p.x += p.vx; p.y += p.vy; p.rot += p.rotV;
            if (p.y < -5) p.y = 105;
            if (p.x < -5) p.x = 105;
            if (p.x > 105) p.x = -5;
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

(function () {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
})();

(function () {
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('open');
                i.querySelector('.faq-answer').style.maxHeight = '0';
                i.querySelector('.faq-answer').style.paddingBottom = '0';
            });
            if (!isOpen) {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
})();

(function () {
    let lastY = 0;
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        nav.style.transform = y > lastY && y > 100 ? 'translateY(-100%)' : 'translateY(0)';
        nav.style.transition = 'transform .3s';
        lastY = y;
    });
})();