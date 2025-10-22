document.addEventListener('DOMContentLoaded', function() {
            
    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');
    
    menuBtn.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        menuIconOpen.classList.toggle('hidden', !isOpen);
        menuIconClose.classList.toggle('hidden', isOpen);
    });
    
    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuIconOpen.classList.remove('hidden');
            menuIconClose.classList.add('hidden');
        });
    });

    // --- Back to Top Button ---
    const toTopBtn = document.getElementById('to-top-btn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            toTopBtn.classList.remove('opacity-0', 'translate-y-4');
        } else {
            toTopBtn.classList.add('opacity-0', 'translate-y-4');
        }
    });
    
    toTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('a.nav-link');
    
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.4 // 40% of the section must be visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Remove 'active' from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    // Match link's data-section (or href) to the sectionId
                    if (link.dataset.section === sectionId || link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });
    
});