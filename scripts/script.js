/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    // Determine if we're in pages folder or root
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    const footerPath = isInPagesFolder ? 'fixed-element/footer.html' : 'pages/fixed-element/footer.html';
    const navPath = isInPagesFolder ? 'fixed-element/nav.html' : 'pages/fixed-element/nav.html';
    
    // Dynamic Footer Loader
    fetch(footerPath)
        .then(response => {
            if (!response.ok) throw new Error("Failed to load footer");
            return response.text();
        })
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading footer:', error));

    fetch(navPath)
        .then(response => {
            if (!response.ok) throw new Error("Failed to load nav");
            return response.text();
        })
        .then(data => {
            const navPlaceholder = document.getElementById('nav-placeholder');
            if (navPlaceholder) {
                navPlaceholder.innerHTML = data;
                
                // Set active link highlight
                const links = navPlaceholder.querySelectorAll('.nav-links a');
                const currentPath = window.location.pathname;
                links.forEach(link => {
                    const linkPath = new URL(link.href).pathname;
                    if (currentPath === linkPath || (currentPath === '/' && linkPath.includes('index.html'))) {
                        link.classList.add('active');
                    }
                });

                // Hamburger Menu Toggle
                const toggleBtn = navPlaceholder.querySelector('.nav-toggle');
                const navLinksContainer = navPlaceholder.querySelector('.nav-links');
                if (toggleBtn && navLinksContainer) {
                    toggleBtn.addEventListener('click', () => {
                        toggleBtn.classList.toggle('open');
                        navLinksContainer.classList.toggle('open');
                    });
                }
            }
        })
        .catch(error => console.error('Error loading nav:', error));
});
