// Custom JavaScript for SammyMail Blog

document.addEventListener('DOMContentLoaded', function() {
    // ===== SMOOTH SCROLLING =====
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

    // ===== COPY CODE BUTTONS =====
    const codeBlocks = document.querySelectorAll('pre > code');
    
    codeBlocks.forEach((codeBlock) => {
        if (!codeBlock.parentNode.querySelector('.copy-button')) {
            const button = document.createElement('button');
            button.className = 'copy-button';
            button.title = 'Copy to clipboard';
            button.setAttribute('aria-label', 'Copy code to clipboard');
            button.innerHTML = `
                <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>`;
            
            button.addEventListener('click', async () => {
                try {
                    const code = codeBlock.innerText;
                    await navigator.clipboard.writeText(code);
                    
                    // Show success state
                    const copyIcon = button.querySelector('.copy-icon');
                    const checkIcon = button.querySelector('.check-icon');
                    
                    copyIcon.style.display = 'none';
                    checkIcon.style.display = 'block';
                    button.classList.add('copied');
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        copyIcon.style.display = 'block';
                        checkIcon.style.display = 'none';
                        button.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                }
            });
            
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper';
            codeBlock.parentNode.parentNode.insertBefore(wrapper, codeBlock.parentNode);
            wrapper.appendChild(codeBlock.parentNode);
            codeBlock.parentNode.appendChild(button);
        }
    });

    // ===== RESPONSIVE TABLES =====
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        // Skip if already wrapped
        if (table.parentElement.classList.contains('table-responsive')) return;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });

    // ===== LAZY LOADING IMAGES =====
    const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
    
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    if (img.dataset.srcset) img.srcset = img.dataset.srcset;
                    img.classList.remove('lazy');
                    lazyImageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => lazyImageObserver.observe(img));
    }

    // ===== SCROLL PROGRESS BAR =====
    const createScrollProgressBar = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };
    
    createScrollProgressBar();

    // ===== DARK MODE TOGGLE =====
    const initDarkMode = () => {
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        if (!darkModeToggle) return;
        
        // Check for saved user preference, if any
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
            document.documentElement.classList.add('dark');
            darkModeToggle.setAttribute('aria-pressed', 'true');
        }
        
        // Toggle dark/light mode
        darkModeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            darkModeToggle.setAttribute('aria-pressed', isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    };
    
    initDarkMode();

    // ===== WEB VITALS MONITORING =====
    const reportWebVitals = (onPerfEntry) => {
        if (onPerfEntry && onPerfEntry instanceof Function) {
            import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(onPerfEntry);
                getFID(onPerfEntry);
                getFCP(onPerfEntry);
                getLCP(onPerfEntry);
                getTTFB(onPerfEntry);
            });
        }
    };
    
    // Log Web Vitals to console (replace with your analytics in production)
    reportWebVitals(metric => {
        console.log(metric);
    });

    // ===== ADDITIONAL ENHANCEMENTS =====
    
    // Add focus styles for keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
        }
    });
    
    // Remove focus styles for mouse users
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('user-is-tabbing');
    });
    
    // Print button for articles
    const printButton = document.querySelector('.print-article');
    if (printButton) {
        printButton.addEventListener('click', () => window.print());
    }

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