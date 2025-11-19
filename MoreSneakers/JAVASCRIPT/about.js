// Complete SEO-optimized JavaScript functionality for MoreSneakers About page
document.addEventListener('DOMContentLoaded', function() {
    console.log('MoreSneakers About page loaded successfully - SEO Optimized');
    
    // Performance monitoring
    const loadTime = performance.now();
    
    try {
        // Initialize all functionality
        initMissionVisionToggle();
        initStatsCounter();
        initBenefitsAnimation();
        initLightbox();
        initTeamMemberInteractions();
        initLazyLoading();
        initPerformanceMonitoring();
        
        console.log(`All JavaScript functionality initialized in ${performance.now() - loadTime}ms`);
        
    } catch (error) {
        console.error('Error initializing page functionality:', error);
        // Graceful degradation - ensure basic functionality still works
        initFallbackFunctionality();
    }
    
    // ===== MISSION/VISION TOGGLE =====
    function initMissionVisionToggle() {
        const toggleBtns = document.querySelectorAll('.toggle-btn');
        const missionContent = document.querySelector('.mission-content');
        const visionContent = document.querySelector('.vision-content');
        
        if (!toggleBtns.length) {
            console.warn('Mission/Vision toggle buttons not found');
            return;
        }
        
        toggleBtns.forEach(btn => {
            // Add ARIA attributes for accessibility
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-selected', btn.classList.contains('active'));
            
            btn.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                
                // Update ARIA attributes and classes
                toggleBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
                
                // Update content visibility
                if (target === 'mission') {
                    missionContent.classList.add('active');
                    visionContent.classList.remove('active');
                    missionContent.setAttribute('aria-hidden', 'false');
                    visionContent.setAttribute('aria-hidden', 'true');
                } else if (target === 'vision') {
                    missionContent.classList.remove('active');
                    visionContent.classList.add('active');
                    missionContent.setAttribute('aria-hidden', 'true');
                    visionContent.setAttribute('aria-hidden', 'false');
                }
                
                // Track this interaction for analytics
                trackUserInteraction('mission_vision_toggle', target);
            });
            
            // Add keyboard navigation
            btn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        
        // Initialize ARIA attributes for content
        if (missionContent && visionContent) {
            missionContent.setAttribute('role', 'tabpanel');
            visionContent.setAttribute('role', 'tabpanel');
            missionContent.setAttribute('aria-hidden', 'false');
            visionContent.setAttribute('aria-hidden', 'true');
        }
    }
    
    // ===== STATS COUNTER ANIMATION =====
    function initStatsCounter() {
        const statItems = document.querySelectorAll('.stat-item h4');
        
        if (!statItems.length) {
            console.warn('Stats counter elements not found');
            return;
        }
        
        // Function to animate counting with performance optimization
        function animateCounter(element, target) {
            const startTime = performance.now();
            const duration = 2000; // 2 seconds
            const startValue = 0;
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
                
                element.textContent = currentValue.toLocaleString(); // Format numbers
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target.toLocaleString(); // Ensure final value
                }
            }
            
            requestAnimationFrame(updateCounter);
        }
        
        // Create intersection observer for stats section
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statItems.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        if (!isNaN(target)) {
                            animateCounter(stat, target);
                        }
                    });
                    observer.disconnect();
                    
                    // Track stats visibility for analytics
                    trackUserInteraction('stats_section_viewed', 'visible');
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '50px' // Trigger slightly before element is fully visible
        });
        
        // Observe stats section
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
    
    // ===== BENEFITS LIST ANIMATION =====
    function initBenefitsAnimation() {
        const benefitsItems = document.querySelectorAll('.benefits-list li');
        
        if (!benefitsItems.length) {
            console.warn('Benefits list items not found');
            return;
        }
        
        // Create intersection observer for benefits section
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    benefitsItems.forEach((item, index) => {
                        // Add accessibility attributes
                        item.setAttribute('aria-hidden', 'true');
                        
                        setTimeout(() => {
                            item.classList.add('visible');
                            item.setAttribute('aria-hidden', 'false');
                        }, index * 200); // Stagger animation
                    });
                    observer.disconnect();
                    
                    // Track benefits visibility for analytics
                    trackUserInteraction('benefits_section_viewed', 'visible');
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '100px' // Trigger earlier for better UX
        });
        
        // Observe benefits section
        const benefitsSection = document.querySelector('.benefits-list');
        if (benefitsSection) {
            observer.observe(benefitsSection);
        }
    }
    
    // ===== LIGHTBOX FUNCTIONALITY =====
    function initLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxClose = document.getElementById('lightboxClose');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');
        
        if (!lightbox) {
            console.warn('Lightbox elements not found');
            return;
        }
        
        let currentImageIndex = 0;
        const images = Array.from(galleryItems).map((item, index) => {
            const img = item.querySelector('img');
            return {
                src: img.src,
                alt: img.alt || `Sneaker collection image ${index + 1}`,
                element: item
            };
        });
        
        // Set ARIA attributes for accessibility
        lightbox.setAttribute('aria-label', 'Image gallery viewer');
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        
        // Open lightbox when gallery item is clicked
        galleryItems.forEach((item, index) => {
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');
            item.setAttribute('aria-label', `View ${images[index].alt} in larger view`);
            
            const openLightboxHandler = () => {
                currentImageIndex = index;
                openLightbox(images[currentImageIndex]);
            };
            
            item.addEventListener('click', openLightboxHandler);
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightboxHandler();
                }
            });
        });
        
        // Open lightbox with specific image
        function openLightbox(imageData) {
            lightboxImage.src = imageData.src;
            lightboxImage.alt = imageData.alt;
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            
            // Set focus for accessibility
            lightboxClose.focus();
            
            // Update lightbox title for screen readers
            lightbox.setAttribute('aria-label', `Viewing: ${imageData.alt}`);
            
            // Track lightbox opening for analytics
            trackUserInteraction('lightbox_opened', `image_${currentImageIndex + 1}`);
        }
        
        // Close lightbox
        function closeLightbox() {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            
            // Return focus to the gallery item that was opened
            if (galleryItems[currentImageIndex]) {
                galleryItems[currentImageIndex].focus();
            }
            
            // Track lightbox closing for analytics
            trackUserInteraction('lightbox_closed', `image_${currentImageIndex + 1}`);
        }
        
        // Navigate to previous image
        function prevImage() {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            lightboxImage.src = images[currentImageIndex].src;
            lightboxImage.alt = images[currentImageIndex].alt;
            lightbox.setAttribute('aria-label', `Viewing: ${images[currentImageIndex].alt}`);
            
            // Track navigation for analytics
            trackUserInteraction('lightbox_navigation', 'previous');
        }
        
        // Navigate to next image
        function nextImage() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            lightboxImage.src = images[currentImageIndex].src;
            lightboxImage.alt = images[currentImageIndex].alt;
            lightbox.setAttribute('aria-label', `Viewing: ${images[currentImageIndex].alt}`);
            
            // Track navigation for analytics
            trackUserInteraction('lightbox_navigation', 'next');
        }
        
        // Event listeners with error handling
        try {
            lightboxClose.addEventListener('click', closeLightbox);
            lightboxPrev.addEventListener('click', prevImage);
            lightboxNext.addEventListener('click', nextImage);
        } catch (error) {
            console.error('Error attaching lightbox event listeners:', error);
        }
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'Tab':
                    // Trap focus within lightbox
                    e.preventDefault();
                    const focusableElements = lightbox.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];
                    
                    if (e.shiftKey && document.activeElement === firstElement) {
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        firstElement.focus();
                    }
                    break;
            }
        });
    }
    
    // ===== TEAM MEMBER INTERACTIONS =====
    function initTeamMemberInteractions() {
        const teamMembers = document.querySelectorAll('.team-member');
        const socialIcons = document.querySelectorAll('.social-icon');
        
        if (!teamMembers.length) {
            console.warn('Team member elements not found');
            return;
        }
        
        // Add accessibility attributes to team members
        teamMembers.forEach(member => {
            member.setAttribute('role', 'button');
            member.setAttribute('tabindex', '0');
            member.setAttribute('aria-label', `View details for ${member.querySelector('h3').textContent}`);
        });
        
        // Add click handlers for social icons
        socialIcons.forEach(icon => {
            // Add accessibility attributes
            icon.setAttribute('role', 'button');
            icon.setAttribute('tabindex', '0');
            
            const handleSocialClick = function(e) {
                e.stopPropagation();
                
                const member = this.closest('.team-member');
                const memberName = member.querySelector('h3').textContent;
                const memberRole = member.querySelector('p').textContent;
                
                // Different actions based on icon with proper ARIA labels
                if (this.textContent === '📧') {
                    this.setAttribute('aria-label', `Send email to ${memberName}`);
                    // In a real implementation, this would open mail client
                    console.log(`Email action for: ${memberName}`);
                    trackUserInteraction('team_member_email', memberName);
                } else if (this.textContent === '💼') {
                    this.setAttribute('aria-label', `View portfolio for ${memberName}`);
                    console.log(`Portfolio action for: ${memberName}`);
                    trackUserInteraction('team_member_portfolio', memberName);
                } else if (this.textContent === '👔') {
                    this.setAttribute('aria-label', `Connect with ${memberName} on LinkedIn`);
                    console.log(`LinkedIn action for: ${memberName}`);
                    trackUserInteraction('team_member_linkedin', memberName);
                }
            };
            
            icon.addEventListener('click', handleSocialClick);
            icon.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSocialClick.call(icon, e);
                }
            });
        });
        
        // Add team member click handlers
        teamMembers.forEach(member => {
            member.addEventListener('click', function() {
                const memberName = this.querySelector('h3').textContent;
                const memberRole = this.querySelector('p').textContent;
                
                // Track team member interaction
                trackUserInteraction('team_member_clicked', memberName);
                
                // In a real implementation, this would show a detailed modal
                console.log(`Team member details: ${memberName} - ${memberRole}`);
            });
            
            // Keyboard support
            member.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    member.click();
                }
            });
        });
    }
    
    // ===== LAZY LOADING FOR IMAGES =====
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if (!images.length) return;
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // ===== PERFORMANCE MONITORING =====
    function initPerformanceMonitoring() {
        // Monitor largest contentful paint
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('LCP candidate:', entry.startTime, entry);
                trackPerformanceMetric('lcp', entry.startTime);
            }
        });
        
        observer.observe({entryTypes: ['largest-contentful-paint']});
        
        // Monitor cumulative layout shift
        let clsValue = 0;
        let clsEntries = [];
        
        const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsEntries.push(entry);
                    clsValue += entry.value;
                    trackPerformanceMetric('cls', clsValue);
                }
            }
        });
        
        clsObserver.observe({entryTypes: ['layout-shift']});
    }
    
    // ===== ANALYTICS AND TRACKING =====
    function trackUserInteraction(action, label) {
        // In a real implementation, this would send data to analytics
        console.log(`User interaction: ${action} - ${label}`);
        
        // Example: Send to Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': 'User Interaction',
                'event_label': label
            });
        }
    }
    
    function trackPerformanceMetric(metric, value) {
        console.log(`Performance metric: ${metric} = ${value}`);
        
        // Send to analytics if needed
        if (typeof gtag !== 'undefined') {
            gtag('event', 'performance_metric', {
                'metric_name': metric,
                'metric_value': value,
                'non_interaction': true
            });
        }
    }
    
    // ===== FALLBACK FUNCTIONALITY =====
    function initFallbackFunctionality() {
        // Ensure basic functionality works even if other scripts fail
        const missionVisionToggle = document.querySelector('.mission-vision-toggle');
        if (missionVisionToggle) {
            missionVisionToggle.style.display = 'flex'; // Ensure it's visible
        }
        
        // Ensure all interactive elements are accessible
        const interactiveElements = document.querySelectorAll('button, [role="button"]');
        interactiveElements.forEach(el => {
            el.setAttribute('tabindex', '0');
        });
        
        console.log('Fallback functionality initialized');
    }
});

// Additional global functions for SEO and performance
window.addEventListener('load', function() {
    // Mark page as fully loaded for SEO
    document.documentElement.setAttribute('data-loaded', 'true');
    
    // Remove loading states if any
    const loadingElements = document.querySelectorAll('[data-loading]');
    loadingElements.forEach(el => {
        el.removeAttribute('data-loading');
    });
});

// Error handling for better user experience
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Export functions for potential module use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMissionVisionToggle,
        initStatsCounter,
        initBenefitsAnimation,
        initLightbox,
        initTeamMemberInteractions
    };
}