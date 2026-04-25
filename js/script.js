
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const heroContent = document.querySelector('.hero-content');
    const scrollPos = window.scrollY;

    if (scrollPos > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (heroContent) {
        const opacity = 1 - (scrollPos / 500);
        heroContent.style.opacity = Math.max(0, opacity);
        heroContent.style.transform = `translateY(${scrollPos * 0.3}px)`;
    }
});

const setupSlider = (sliderId, prevClass, nextClass, gap) => {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    const nextBtn = slider.parentElement.parentElement.querySelector(nextClass);
    const prevBtn = slider.parentElement.parentElement.querySelector(prevClass);
    let currentPos = 0;

    const slide = (direction) => {
        const containerWidth = slider.parentElement.offsetWidth;
        const cardWidth = slider.querySelector(':first-child').offsetWidth;
        const totalWidthPerCard = cardWidth + gap;
        const maxScroll = slider.scrollWidth - containerWidth;

        if (direction === 'next') {
            currentPos = Math.min(currentPos + totalWidthPerCard, maxScroll);
        } else {
            currentPos = Math.max(currentPos - totalWidthPerCard, 0);
        }

        slider.style.transform = `translateX(-${currentPos}px)`;
    };

    if (nextBtn) nextBtn.addEventListener('click', () => slide('next'));
    if (prevBtn) prevBtn.addEventListener('click', () => slide('prev'));
};

setupSlider('newsSlider', '.nav-arrow.left', '.nav-arrow.right', 80);
setupSlider('storiesSlider', '.nav-arrow.left', '.nav-arrow.right', 15);
setupSlider('insightsSlider', '.news-insights-section .nav-arrow.left', '.news-insights-section .nav-arrow.right', 60);

const hamburger = document.getElementById('hamburger');
const header = document.querySelector('.header');
const navItems = document.querySelectorAll('.nav-item.has-dropdown');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        header.classList.toggle('menu-open');
    });
}

navItems.forEach(item => {
    const link = item.querySelector('a');
    
    if (link) {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            const isActive = item.classList.contains('active');
            
            navItems.forEach(i => {
                if (i !== item) i.classList.remove('active');
            });
            
            item.classList.toggle('active');
            
            if (window.innerWidth > 1024) {
                if (item.classList.contains('active')) {
                    header.classList.add('menu-open');
                } else {
                    header.classList.remove('menu-open');
                }
            }
        });
    }
});

document.addEventListener('click', (e) => {
    if (header && !header.contains(e.target)) {
        navItems.forEach(i => i.classList.remove('active'));
        header.classList.remove('menu-open');
    }
});

const searchBtn = document.querySelector('.search-btn');
const searchOverlay = document.getElementById('searchOverlay');
const closeSearch = document.getElementById('closeSearch');

if (searchBtn && searchOverlay) {
    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        const input = document.querySelector('.search-input');
        if (input) input.focus();
    });
}

if (closeSearch && searchOverlay) {
    closeSearch.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (searchOverlay) searchOverlay.classList.remove('active');
        navItems.forEach(i => i.classList.remove('active'));
        if (header) header.classList.remove('menu-open');
    }
});

