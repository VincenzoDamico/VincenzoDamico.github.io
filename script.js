document.addEventListener('DOMContentLoaded', () => {
    // Elegant Scroll Reveal Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the visible class to trigger the CSS transition
                entry.target.classList.add('visible');
                // Stop observing once it's revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with the 'reveal-elem' class
    const elementsToReveal = document.querySelectorAll('.reveal-elem');
    elementsToReveal.forEach(el => observer.observe(el));
});
