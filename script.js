document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // BOLD BRANDING AGENCY ANIMATIONS
    // ==========================================

    // Initialize bold geometric animations
    initBoldAnimations();
    initScrollFadeEffects();
    initPencilUnderlines();
    initSectionReveals();
    initNeonGlowEffects();

    // Smooth scrolling for navigation links
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

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe service cards and project cards with staggered animation
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const neuralNetwork = document.querySelector('.neural-network');
        if (neuralNetwork) {
            neuralNetwork.style.transform = `translate(-50%, -50%) translateY(${rate}px)`;
        }
    });

    // Dynamic neural network animation
    function createFloatingParticles() {
        const hero = document.querySelector('.hero');
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(74, 222, 128, ${Math.random() * 0.5 + 0.2})`;
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1';
            
            // Random animation
            particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            hero.appendChild(particle);
        }
    }

    // Add floating particles CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) translateX(0px);
                opacity: 0.3;
            }
            25% {
                transform: translateY(-20px) translateX(10px);
                opacity: 0.8;
            }
            50% {
                transform: translateY(-10px) translateX(-10px);
                opacity: 0.5;
            }
            75% {
                transform: translateY(-15px) translateX(5px);
                opacity: 0.7;
            }
        }
        
        .nav-menu.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(10, 10, 10, 0.98);
            flex-direction: column;
            padding: 2rem;
            gap: 1rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

    createFloatingParticles();

    // Button hover effects with ripple
    document.querySelectorAll('button, .cta-button, .hero-cta, .cta-button-large').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple effect CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        button, .cta-button, .hero-cta, .cta-button-large {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);

    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        
        typing();
    }

    // Initialize typing effect after a delay
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }, 1000);

    // Service card interactive hover
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1.1) rotateY(180deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            icon.style.transform = 'scale(1) rotateY(0deg)';
        });
    });

    // Scroll progress indicator
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.width = '0%';
        progressBar.style.height = '3px';
        progressBar.style.background = 'linear-gradient(90deg, #4ade80, #22d3ee)';
        progressBar.style.zIndex = '9999';
        progressBar.style.transition = 'width 0.3s ease';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    createScrollProgress();

    // Image lazy loading simulation
    const images = document.querySelectorAll('.project-image, .client-logo');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.filter = 'blur(0px)';
                observer.unobserve(entry.target);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0.5';
        img.style.filter = 'blur(5px)';
        img.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
        imageObserver.observe(img);
    });

    // Counter animation for stats (if you want to add them later)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Form validation (for contact forms if added)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Add smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });

    // Dynamic text cycling animation
    function initDynamicTextCycling() {
        const dynamicTexts = document.querySelectorAll('.dynamic-text');
        if (dynamicTexts.length === 0) return;
        
        let currentIndex = 0;
        const cycleInterval = 3000; // 3 seconds per text
        
        // Hide all texts initially except the first one
        dynamicTexts.forEach((text, index) => {
            text.style.position = 'absolute';
            text.style.top = '0';
            text.style.left = '0';
            text.style.opacity = index === 0 ? '1' : '0';
            text.style.transform = index === 0 ? 'translateY(0)' : 'translateY(20px)';
            text.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        function cycleText() {
            // Fade out current text
            dynamicTexts[currentIndex].style.opacity = '0';
            dynamicTexts[currentIndex].style.transform = 'translateY(-20px)';
            
            // Move to next text
            currentIndex = (currentIndex + 1) % dynamicTexts.length;
            
            // Fade in next text with delay
            setTimeout(() => {
                dynamicTexts[currentIndex].style.opacity = '1';
                dynamicTexts[currentIndex].style.transform = 'translateY(0)';
            }, 250);
        }
        
        // Start cycling after initial delay
        setTimeout(() => {
            setInterval(cycleText, cycleInterval);
        }, 2000);
    }
    
    // Initialize dynamic text cycling - run immediately
    initDynamicTextCycling();
    
    // Also run on window load as fallback
    window.addEventListener('load', initDynamicTextCycling);

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.form-submit');
            const originalText = submitBtn.querySelector('span').textContent;
            
            // Show loading state
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success state
                submitBtn.querySelector('span').textContent = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(45deg, #10b981, #059669)';
                
                // Reset form
                this.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.opacity = '1';
                    submitBtn.disabled = false;
                }, 3000);
            }, 2000);
        });
    }

    // Enhanced scroll animations for mobile
    let ticking = false;
    function updateScrollAnimations() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        
        // Parallax for gradient orbs
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.1;
            orb.style.transform = `translate(-50%, -50%) translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollAnimations);
            ticking = true;
        }
    });

    // Enhanced mobile menu functionality
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    });

    // Add loading animation for the page
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Add some delay before showing content
        setTimeout(() => {
            document.querySelectorAll('.hero-content-advanced > *').forEach((element, index) => {
                element.style.animationDelay = `${index * 0.2}s`;
                element.classList.add('fade-in-up');
            });
        }, 500);
    });

    // ==========================================
    // BOLD GEOMETRIC ANIMATION FUNCTIONS
    // ==========================================

    function initBoldAnimations() {
        // Animate stroke text on load
        const strokeTexts = document.querySelectorAll('.stroke-text');
        strokeTexts.forEach((text, index) => {
            setTimeout(() => {
                text.style.opacity = '1';
                text.style.transform = 'translateY(0) scale(1)';
            }, index * 200);
        });

        // Initialize marquee animations
        initMarqueeEnhanced();
    }

    function initScrollFadeEffects() {
        const scrollFadeElements = document.querySelectorAll('.scroll-fade-text');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add highlight effect with delay
                    setTimeout(() => {
                        entry.target.classList.add('highlight');
                    }, 500);
                } else {
                    entry.target.classList.remove('visible', 'highlight');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-10% 0px -10% 0px'
        });

        scrollFadeElements.forEach(element => {
            scrollObserver.observe(element);
        });
    }

    function initPencilUnderlines() {
        const pencilElements = document.querySelectorAll('.pencil-underline');
        
        pencilElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('active');
            });
            
            element.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    element.classList.remove('active');
                }, 300);
            });
        });

        // Auto-activate on scroll
        const pencilObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, Math.random() * 500);
                }
            });
        }, { threshold: 0.5 });

        pencilElements.forEach(element => {
            pencilObserver.observe(element);
        });
    }

    function initSectionReveals() {
        const revealElements = document.querySelectorAll('.section-reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    function initNeonGlowEffects() {
        const neonButtons = document.querySelectorAll('.neon-glow-btn, .cta-bold');
        
        neonButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.boxShadow = '0 0 30px var(--neon-blue-glow), 0 0 60px var(--neon-blue-glow)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.boxShadow = '';
            });

            // Add ripple effect on click
            button.addEventListener('click', function(e) {
                // Handle "Get Started" button functionality
                if (this.classList.contains('cta-bold') || 
                    (this.classList.contains('neon-glow-btn') && 
                     this.querySelector('span') && 
                     this.querySelector('span').textContent.includes('Get Started'))) {
                    
                    // Add loading state
                    const originalText = this.querySelector('span').textContent;
                    this.querySelector('span').textContent = 'Loading...';
                    this.style.opacity = '0.8';
                    this.disabled = true;
                    
                    // Create ripple effect
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.className = 'ripple-effect';
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = x + 'px';
                    ripple.style.top = y + 'px';
                    
                    this.appendChild(ripple);
                    
                    // Navigate to contact page with smooth transition
                    setTimeout(() => {
                        window.location.href = 'contact.html';
                    }, 800);
                    return;
                }
                
                // Handle other CTA buttons (like "EXPLORE SERVICES", "WATCH DEMO")
                if (this.querySelector('span') && 
                    this.querySelector('span').textContent.includes('EXPLORE SERVICES')) {
                    // Smooth scroll to services section
                    const servicesSection = document.querySelector('#services');
                    if (servicesSection) {
                        servicesSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                    return;
                }
                
                if (this.querySelector('span') && 
                    this.querySelector('span').textContent.includes('WATCH DEMO')) {
                    // Add loading state
                    const originalText = this.querySelector('span').textContent;
                    this.querySelector('span').textContent = 'Loading...';
                    this.style.opacity = '0.8';
                    
                    // Open demo video or project showcase
                    setTimeout(() => {
                        window.location.href = 'project.html';
                    }, 600);
                    return;
                }
                
                // Create ripple effect for visual feedback
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.className = 'ripple-effect';
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    function initMarqueeEnhanced() {
        const marqueeItems = document.querySelectorAll('.marquee-item-bold');
        
        // Add hover effects for marquee items
        marqueeItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.animationPlayState = 'paused';
                item.style.transform = 'scale(1.1)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.animationPlayState = 'running';
                item.style.transform = 'scale(1)';
            });
        });
    }

    // Enhanced scroll effects for bold design
    function handleBoldScrollEffects() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Update navbar glow effect
        const navbar = document.querySelector('.navbar');
        if (scrollY > 50) {
            navbar.style.borderBottomColor = 'var(--neon-blue)';
            navbar.style.boxShadow = '0 2px 20px var(--neon-blue-glow)';
        } else {
            navbar.style.borderBottomColor = 'var(--neon-blue-dim)';
            navbar.style.boxShadow = 'none';
        }

        // Parallax effect for hero elements
        const heroContent = document.querySelector('.hero-content-advanced');
        if (heroContent) {
            const heroOffset = scrollY * 0.5;
            heroContent.style.transform = `translateY(${heroOffset}px)`;
        }
    }

    // Enhanced window scroll listener
    window.addEventListener('scroll', () => {
        handleBoldScrollEffects();
        
        // Update scroll indicators if they exist
        updateScrollIndicators();
    });

    function updateScrollIndicators() {
        const indicators = document.querySelectorAll('.scroll-dot');
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY;
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const indicator = indicators[index];
            
            if (indicator && rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                indicators.forEach(dot => dot.classList.remove('active'));
                indicator.classList.add('active');
            }
        });
    }

    // Geometric card hover effects
    const geometricCards = document.querySelectorAll('.geometric-card');
    geometricCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0)';
        });
    });

    // Micro interactions for design elements
    const microElements = document.querySelectorAll('.micro-bounce, .micro-slide');
    microElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.willChange = 'transform';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.willChange = 'auto';
        });
    });

    // Performance optimization for animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.innerHTML = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
});
