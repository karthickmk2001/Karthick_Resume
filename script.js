// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Reveal on scroll
const revealTargets = document.querySelectorAll(
  '.section-head, .about-text, .info-card, .timeline-item, .project-card, .skill-block, .cert-block, .edu-card, .contact-card, .hero-content, .profile-card'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), idx * 60);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
);

revealTargets.forEach(el => observer.observe(el));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// Subtle parallax on profile card
const profileCard = document.querySelector('.profile-card');
if (profileCard && window.matchMedia('(min-width: 900px)').matches) {
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 8;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    profileCard.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// ── Custom Cursor ──────────────────────────────
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .btn').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
});

// ── Particle Background ────────────────────────
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.6 + 0.1,
    color: Math.random() > 0.5 ? '99,102,241' : '16,185,129'
  };
}

for (let i = 0; i < 120; i++) particles.push(createParticle());

(function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(animateParticles);
})();

// ── Typewriter ─────────────────────────────────
const roles = [
  'Quality Assurance Engineer',
  'AI / ML Enthusiast',
  'Test Automation Specialist',
  'MSc Candidate in Artificial Intelligence'
];

const twEl = document.getElementById('typewriterText');
let roleIdx = 0, charIdx = 0, deleting = false;

function typewrite() {
  if (!twEl) return;
  const role = roles[roleIdx];
  if (!deleting) {
    twEl.textContent = role.slice(0, ++charIdx);
    if (charIdx === role.length) {
      deleting = true;
      setTimeout(typewrite, 2000);
      return;
    }
  } else {
    twEl.textContent = role.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(typewrite, 500);
      return;
    }
  }
  setTimeout(typewrite, deleting ? 38 : 78);
}

typewrite();

// ── Card Cursor Spotlight ──────────────────────
const spotlightCards = document.querySelectorAll(
  '.info-card, .skill-block, .timeline-card, .edu-card, .cert-item'
);

spotlightCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    card.style.background =
      `radial-gradient(300px circle at ${x}px ${y}px, rgba(99,102,241,0.13) 0%, transparent 70%),
       var(--surface)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});
