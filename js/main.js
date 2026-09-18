// ===== Header scroll state =====
const header = document.querySelector('.site-header');
const onScroll = () => {
  if (window.scrollY > 30) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Mobile menu =====
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('open'))
  );
}

// ===== Reveal on scroll =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      // animate skill bars if present
      e.target.querySelectorAll('.bar i').forEach(bar => {
        bar.style.width = bar.dataset.val + '%';
      });
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Project filter =====
const filterBtns = document.querySelectorAll('.proj-filter button');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.proj').forEach(p => {
        const show = f === 'all' || p.dataset.cat === f;
        p.style.display = show ? '' : 'none';
      });
    });
  });
}

// ===== Lightbox for gallery =====
const lb = document.querySelector('.lightbox');
if (lb) {
  const lbImg = lb.querySelector('img');
  document.querySelectorAll('.gallery figure img').forEach(img => {
    img.parentElement.addEventListener('click', () => {
      lbImg.src = img.dataset.full || img.src;
      lb.classList.add('open');
    });
  });
  lb.addEventListener('click', (e) => {
    if (e.target === lb || e.target.classList.contains('close'))
      lb.classList.remove('open');
  });
}

// ===== Footer year =====
document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());