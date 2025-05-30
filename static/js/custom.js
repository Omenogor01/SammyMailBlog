// Custom JavaScript for SammyMail Blog

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add copy button to code blocks
    const codeBlocks = document.querySelectorAll('pre > code');
    
    codeBlocks.forEach((codeBlock) => {
        // Only add button if not already added
        if (!codeBlock.parentNode.querySelector('.copy-button')) {
            const button = document.createElement('button');
            button.className = 'copy-button';
            button.title = 'Copy to clipboard';
            button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
            
            button.addEventListener('click', () => {
                const code = codeBlock.innerText;
                navigator.clipboard.writeText(code).then(() => {
                    button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                    setTimeout(() => {
                        button.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
                    }, 2000);
                });
            });
            
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper';
            codeBlock.parentNode.parentNode.insertBefore(wrapper, codeBlock.parentNode);
            wrapper.appendChild(codeBlock.parentNode);
            codeBlock.parentNode.appendChild(button);
        }
    });

    // Add responsive table wrapper
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });

    // Add active class to current menu item
    const currentPath = window.location.pathname;
    document.querySelectorAll('.menu a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Add fade-in animation for content
    const fadeElements = document.querySelectorAll('.post-entry, .post-content > *');
    const fadeOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, fadeOptions);

    fadeElements.forEach(element => {
        fadeInOnScroll.observe(element);
    });
});