document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            menuIcon.classList.remove('ph-list');
            menuIcon.classList.add('ph-x');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu open
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            menuIcon.classList.remove('ph-x');
            menuIcon.classList.add('ph-list');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // 2. Navbar Background on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-surface/95', 'backdrop-blur-md', 'border-b', 'border-white/5', 'shadow-xl');
            navbar.classList.remove('py-6');
            navbar.classList.add('py-4');
        } else {
            navbar.classList.remove('bg-surface/95', 'backdrop-blur-md', 'border-b', 'border-white/5', 'shadow-xl');
            navbar.classList.add('py-6');
            navbar.classList.remove('py-4');
        }
    });

    // 3. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before the element is fully in view
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up-element').forEach(el => {
        observer.observe(el);
    });
});
