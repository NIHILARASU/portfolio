/* =========================================================
   main.js — interactivity for the portfolio site
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Typed.js hero text ---------- */
    if (window.Typed) {
        new Typed('.text', {
            strings: ['CS Student', 'Software Developer', 'Problem Solver'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    }

    /* ---------- Element refs ---------- */
    var header = document.querySelector('.header');
    var menuIcon = document.getElementById('menu-icon');
    var navbar = document.querySelector('.navbar');
    var navLinks = document.querySelectorAll('.navbar a');
    var sections = document.querySelectorAll('section[id]');
    var topBtn = document.getElementById('top-btn');
    var reveals = document.querySelectorAll('.reveal');
    var skillBoxes = document.querySelectorAll('.skill-box');
    var filterBtns = document.querySelectorAll('.filter-btn');
    var portfolioBoxes = document.querySelectorAll('.portfolio-box');
    var contactForm = document.getElementById('contact-form');
    var formStatus = document.getElementById('form-status');

    /* ---------- Mobile menu toggle ---------- */
    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', function () {
            navbar.classList.toggle('active');
            var icon = menuIcon.querySelector('i');
            var open = navbar.classList.contains('active');
            icon.classList.toggle('bx-menu', !open);
            icon.classList.toggle('bx-x', open);
        });

        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navbar.classList.remove('active');
                var icon = menuIcon.querySelector('i');
                icon.classList.add('bx-menu');
                icon.classList.remove('bx-x');
            });
        });
    }

    /* ---------- Header style + active-link scrollspy + reveal + back-to-top ---------- */
    function onScroll() {
        var scrollY = window.scrollY || window.pageYOffset;

        if (header) {
            header.classList.toggle('scrolled', scrollY > 50);
        }

        var current = '';
        sections.forEach(function (section) {
            var sectionTop = section.offsetTop - 120;
            var sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        if (current) {
            navLinks.forEach(function (link) {
                link.classList.toggle('active', link.getAttribute('data-target') === current);
            });
        }

        reveals.forEach(function (el) {
            var top = el.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) {
                el.classList.add('active');
            }
        });

        skillBoxes.forEach(function (box) {
            var top = box.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) {
                var bar = box.querySelector('.bar span');
                if (bar) bar.classList.add('animate');
            }
        });

        if (topBtn) {
            topBtn.classList.toggle('show', scrollY > 400);
        }
    }

    window.addEventListener('scroll', onScroll);
    onScroll();

    /* ---------- Portfolio filtering ---------- */
    if (filterBtns.length) {
        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                var filter = btn.getAttribute('data-filter');
                portfolioBoxes.forEach(function (box) {
                    var match = filter === 'all' || box.getAttribute('data-category') === filter;
                    box.classList.toggle('hide', !match);
                });
            });
        });
    }

    /* ---------- Contact form validation (submits to Formspree on success) ---------- */
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {

            var fields = [
                { el: document.getElementById('name'), check: function (v) { return v.trim().length > 1; }, msg: 'Please enter your name' },
                { el: document.getElementById('email'), check: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }, msg: 'Please enter a valid email' },
                { el: document.getElementById('message'), check: function (v) { return v.trim().length > 5; }, msg: 'Message is too short' }
            ];

            var valid = true;

            fields.forEach(function (field) {
                var wrapper = field.el.closest('.input-field');
                var errorMsg = wrapper.querySelector('.error-msg');
                if (!field.check(field.el.value)) {
                    wrapper.classList.add('error');
                    errorMsg.textContent = field.msg;
                    valid = false;
                } else {
                    wrapper.classList.remove('error');
                    errorMsg.textContent = '';
                }
            });

            if (!valid) {
                e.preventDefault();
                formStatus.textContent = 'Please fix the errors above.';
                formStatus.className = 'form-status error';
                return;
            }

            // valid — let the browser submit the form to Formspree normally
        });
    }

    /* ---------- Smooth scroll for in-page links (fallback for older browsers) ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href').slice(1);
            var target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
