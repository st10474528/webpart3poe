// SEO-Optimized JavaScript for MoreSneakers Contact Page
// Enhanced with SEO tracking, performance monitoring, and user engagement analytics

document.addEventListener('DOMContentLoaded', function() {
    console.log('MoreSneakers Contact Page - SEO Optimized JavaScript Loaded');
    
    // Track page load performance for SEO
    const loadTime = performance.now();
    console.log(`Contact page loaded in ${loadTime}ms - Good for SEO`);
    
    // Initialize all functionality
    initSEOTracking();
    initFormValidation();
    initDynamicContent();
    initAccordion();
    initSearch();
    initMapInteraction();
    initSEOScrollTracking();
    initFormAnalytics();
    
    console.log('All SEO-enhanced JavaScript functionality initialized');
    
    // SEO Performance and User Engagement Tracking
    function initSEOTracking() {
        // Track user engagement time (signals to search engines)
        let timeOnPage = 0;
        const engagementTimer = setInterval(() => {
            timeOnPage++;
            // Store engagement data for analytics
            if (timeOnPage % 30 === 0) { // Every 30 seconds
                localStorage.setItem('contactPageEngagementTime', timeOnPage);
            }
        }, 1000);

        // Track scroll depth for content engagement
        let maxScrollDepth = 0;
        window.addEventListener('scroll', function() {
            const scrollDepth = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);
            
            // Store scroll depth for SEO insights
            if (maxScrollDepth > 50) {
                localStorage.setItem('contactScrollDepth', Math.round(maxScrollDepth));
            }
        });

        // Track form section visibility for engagement
        const formSection = document.querySelector('.contact-form');
        if (formSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        trackUserAction('contact_form_section_viewed', {
                            timestamp: new Date().toISOString(),
                            duration: timeOnPage
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(formSection);
        }
    }

    // Scroll depth tracking for SEO content engagement
    function initSEOScrollTracking() {
        let scrollDepthTracked = {
            25: false,
            50: false,
            75: false,
            90: false
        };
        
        window.addEventListener('scroll', function() {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            // Track milestone scroll depths for SEO
            Object.keys(scrollDepthTracked).forEach(depth => {
                if (scrollPercent >= parseInt(depth) && !scrollDepthTracked[depth]) {
                    scrollDepthTracked[depth] = true;
                    trackUserAction('contact_scroll_depth_reached', { 
                        depth: `${depth}%`,
                        page: 'contact'
                    });
                }
            });
        });
    }

    // Enhanced Form Analytics
    function initFormAnalytics() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        let formStartTime = Date.now();
        let fieldInteractions = new Set();

        // Track form view
        trackUserAction('contact_form_viewed', {
            timestamp: new Date().toISOString()
        });

        // Track field interactions
        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('focus', function() {
                fieldInteractions.add(this.id);
                trackUserAction('form_field_focused', {
                    fieldId: this.id,
                    fieldName: this.name,
                    timestamp: new Date().toISOString()
                });
            });

            field.addEventListener('blur', function() {
                trackUserAction('form_field_completed', {
                    fieldId: this.id,
                    fieldName: this.name,
                    valueLength: this.value.length,
                    timestamp: new Date().toISOString()
                });
            });
        });

        // Track form abandonment
        window.addEventListener('beforeunload', function() {
            if (form.querySelectorAll('input, textarea').some(field => field.value.trim() !== '')) {
                const formDuration = Date.now() - formStartTime;
                trackUserAction('contact_form_abandoned', {
                    fieldsInteracted: fieldInteractions.size,
                    timeSpent: Math.round(formDuration / 1000),
                    timestamp: new Date().toISOString()
                });
            }
        });
    }
    
    // ===== ENHANCED FORM VALIDATION WITH SEO TRACKING =====
    function initFormValidation() {
        const contactForm = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const successMessage = document.getElementById('successMessage');
        
        if (!contactForm) return;
        
        let formSubmissionAttempts = 0;
        let validationErrors = 0;

        // Enhanced form validation with analytics
        function validateField(field, errorElement, validationFn, fieldName) {
            const value = field.value.trim();
            const isValid = validationFn(value);
            
            if (!isValid) {
                field.parentElement.classList.add('error');
                field.parentElement.classList.remove('success');
                errorElement.style.display = 'block';
                
                // Track validation errors for SEO insights
                if (fieldName && !field.getAttribute('data-error-tracked')) {
                    field.setAttribute('data-error-tracked', 'true');
                    trackUserAction('form_validation_error', {
                        field: fieldName,
                        errorType: 'invalid_input',
                        timestamp: new Date().toISOString()
                    });
                }
                return false;
            } else {
                field.parentElement.classList.remove('error');
                field.parentElement.classList.add('success');
                errorElement.style.display = 'none';
                return true;
            }
        }
        
        // Validation functions
        function validateName(name) {
            return name.length >= 2;
        }
        
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        function validatePhone(phone) {
            if (phone === '') return true; // Optional field
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            return phoneRegex.test(phone);
        }
        
        function validateMessage(message) {
            return message.length >= 10;
        }

        function validateSubject(subject) {
            return subject !== '';
        }
        
        // Real-time validation with analytics
        const fields = [
            { id: 'fullName', validator: validateName, name: 'full_name' },
            { id: 'email', validator: validateEmail, name: 'email' },
            { id: 'phone', validator: validatePhone, name: 'phone' },
            { id: 'subject', validator: validateSubject, name: 'subject' },
            { id: 'message', validator: validateMessage, name: 'message' }
        ];

        fields.forEach(({ id, validator, name }) => {
            const field = document.getElementById(id);
            const errorElement = document.getElementById(`${id}Error`);
            
            if (field && errorElement) {
                field.addEventListener('blur', function() {
                    validateField(this, errorElement, validator, name);
                });

                // Track field completion for user behavior
                field.addEventListener('input', function() {
                    if (this.value.length > 0 && !this.getAttribute('data-interaction-tracked')) {
                        this.setAttribute('data-interaction-tracked', 'true');
                        trackUserAction('form_field_interaction', {
                            field: name,
                            timestamp: new Date().toISOString()
                        });
                    }
                });
            }
        });
        
        // Enhanced form submission with SEO conversion tracking
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            formSubmissionAttempts++;

            // Validate all fields
            const validations = fields.map(({ id, validator, name }) => {
                const field = document.getElementById(id);
                const errorElement = document.getElementById(`${id}Error`);
                return field && errorElement ? 
                    validateField(field, errorElement, validator, name) : false;
            });

            const isFormValid = validations.every(valid => valid === true);
            
            if (isFormValid) {
                // Track successful form validation
                trackUserAction('contact_form_validation_success', {
                    submissionAttempt: formSubmissionAttempts,
                    timestamp: new Date().toISOString()
                });

                // Show loading state
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                
                // Collect form data for analytics
                const formData = {
                    name: document.getElementById('fullName').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    subject: document.getElementById('subject').value,
                    messageLength: document.getElementById('message').value.length,
                    submissionTime: new Date().toISOString()
                };

                // Track form submission for SEO conversion
                trackUserAction('contact_form_submitted', formData);
                
                // Simulate form submission
                setTimeout(() => {
                    // Hide loading state
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    
                    // Track successful submission
                    trackUserAction('contact_form_success', {
                        ...formData,
                        processingTime: 2000
                    });
                    
                    // Show success message with animation
                    successMessage.style.display = 'block';
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.style.opacity = '1';
                    }, 10);
                    
                    // Reset form
                    this.reset();
                    
                    // Remove success classes from form fields
                    const formGroups = document.querySelectorAll('.form-group');
                    formGroups.forEach(group => {
                        group.classList.remove('success');
                    });

                    // Reset tracking attributes
                    fields.forEach(({ id }) => {
                        const field = document.getElementById(id);
                        if (field) {
                            field.removeAttribute('data-error-tracked');
                            field.removeAttribute('data-interaction-tracked');
                        }
                    });
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        setTimeout(() => {
                            successMessage.style.display = 'none';
                        }, 300);
                    }, 5000);
                }, 2000);
            } else {
                // Track form validation failure
                validationErrors++;
                trackUserAction('contact_form_validation_failed', {
                    submissionAttempt: formSubmissionAttempts,
                    totalErrors: validationErrors,
                    timestamp: new Date().toISOString()
                });
            }
        });
    }
    
    // ===== ENHANCED DYNAMIC CONTENT WITH SCHEMA MARKUP =====
    function initDynamicContent() {
        // Load enhanced contact details with schema support
        function loadContactDetails() {
            const contactDetails = document.getElementById('contactDetails');
            if (contactDetails) {
                contactDetails.innerHTML = `
                    <p><strong><i class="fas fa-phone"></i> Phone:</strong><br>
                    <a href="tel:+27812723183" itemprop="telephone">+27 81 272 3183</a></p>
                    
                    <p><strong><i class="fab fa-whatsapp"></i> WhatsApp:</strong><br>
                    <a href="https://wa.me/27812723183" target="_blank">+27 81 272 3183</a></p>
                    
                    <p><strong><i class="fas fa-envelope"></i> Email:</strong><br>
                    <a href="mailto:moresneakers@gmail.com" itemprop="email">moresneakers@gmail.com</a></p>
                    
                    <p><strong><i class="fas fa-clock"></i> Response Time:</strong><br>
                    Within 24 hours</p>
                `;

                // Track contact details view
                trackUserAction('contact_details_viewed', {
                    element: 'contact_details',
                    timestamp: new Date().toISOString()
                });
            }
        }
        
        // Load enhanced social media with tracking
        function loadSocialMedia() {
            const socialMedia = document.getElementById('socialMedia');
            if (socialMedia) {
                socialMedia.innerHTML = `
                    <div class="social-links">
                        <a href="https://instagram.com/moresneakers" onclick="trackUserAction('social_media_click', {platform: 'instagram', source: 'contact_page'})" aria-label="Follow MoreSneakers on Instagram">
                            <i class="fab fa-instagram"></i> @moresneakers
                        </a>
                        <a href="https://facebook.com/moresneakers" onclick="trackUserAction('social_media_click', {platform: 'facebook', source: 'contact_page'})" aria-label="Follow MoreSneakers on Facebook">
                            <i class="fab fa-facebook"></i> @moresneakers
                        </a>
                        <a href="https://twitter.com/moresneakers" onclick="trackUserAction('social_media_click', {platform: 'twitter', source: 'contact_page'})" aria-label="Follow MoreSneakers on Twitter">
                            <i class="fab fa-twitter"></i> @moresneakers
                        </a>
                        <a href="https://tiktok.com/@moresneakers" onclick="trackUserAction('social_media_click', {platform: 'tiktok', source: 'contact_page'})" aria-label="Follow MoreSneakers on TikTok">
                            <i class="fab fa-tiktok"></i> @moresneakers
                        </a>
                    </div>
                    <p><small>Follow us for new releases and exclusive drops</small></p>
                `;
            }
        }
        
        // Load business hours with schema markup
        function loadBusinessHours() {
            const businessHours = document.getElementById('businessHours');
            if (businessHours) {
                businessHours.innerHTML = `
                    <p><strong>Monday - Friday:</strong><br>
                    <span itemprop="opens" content="09:00">9:00 AM</span> - <span itemprop="closes" content="18:00">6:00 PM</span></p>
                    
                    <p><strong>Saturday:</strong><br>
                    <span itemprop="opens" content="09:00">9:00 AM</span> - <span itemprop="closes" content="14:00">2:00 PM</span></p>
                    
                    <p><strong>Sunday:</strong><br>
                    <span>10:00 AM</span> - <span>1:00 PM</span></p>
                    
                    <p class="holiday-note"><small>Holiday hours may vary</small></p>
                `;
            }
        }
        
        // Load all dynamic content
        loadContactDetails();
        loadSocialMedia();
        loadBusinessHours();

        // Track dynamic content load
        trackUserAction('dynamic_content_loaded', {
            components: ['contact_details', 'social_media', 'business_hours'],
            timestamp: new Date().toISOString()
        });
    }
    
    // ===== ENHANCED ACCORDION WITH SEO TRACKING =====
    function initAccordion() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        let accordionInteractions = 0;
        
        accordionHeaders.forEach((header, index) => {
            header.addEventListener('click', function() {
                const item = this.parentElement;
                const isActive = item.classList.contains('active');
                const question = this.querySelector('span').textContent;
                
                // Track accordion interaction
                accordionInteractions++;
                trackUserAction('faq_accordion_interaction', {
                    question: question,
                    action: isActive ? 'close' : 'open',
                    interactionCount: accordionInteractions,
                    questionIndex: index,
                    timestamp: new Date().toISOString()
                });
                
                // Close all accordion items
                document.querySelectorAll('.accordion-item').forEach(accordionItem => {
                    accordionItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't already active
                if (!isActive) {
                    item.classList.add('active');
                    
                    // Track FAQ question view for content engagement
                    trackUserAction('faq_question_viewed', {
                        question: question,
                        category: item.getAttribute('data-category'),
                        timestamp: new Date().toISOString()
                    });
                }
            });

            // Track initial FAQ impressions
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const question = header.querySelector('span').textContent;
                        trackUserAction('faq_question_impression', {
                            question: question,
                            category: entry.target.parentElement.getAttribute('data-category'),
                            position: index + 1,
                            timestamp: new Date().toISOString()
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(header);
        });
    }
    
    // ===== ENHANCED SEARCH WITH SEO ANALYTICS =====
    function initSearch() {
        const faqSearch = document.getElementById('faqSearch');
        const noResults = document.getElementById('noResults');
        const accordionItems = document.querySelectorAll('.accordion-item');
        
        if (!faqSearch) return;

        let searchQueries = [];
        let lastSearchTime = 0;
        
        faqSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const currentTime = Date.now();
            let hasResults = false;
            let resultCount = 0;

            // Track search queries (debounced)
            if (searchTerm && currentTime - lastSearchTime > 1000) {
                lastSearchTime = currentTime;
                searchQueries.push(searchTerm);
                
                trackUserAction('faq_search_performed', {
                    query: searchTerm,
                    queryLength: searchTerm.length,
                    totalSearches: searchQueries.length,
                    timestamp: new Date().toISOString()
                });
            }
            
            accordionItems.forEach(item => {
                const question = item.querySelector('.accordion-header span').textContent.toLowerCase();
                const answer = item.querySelector('.accordion-content p').textContent.toLowerCase();
                const category = item.getAttribute('data-category');
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    hasResults = true;
                    resultCount++;
                    
                    // Track search results
                    if (searchTerm) {
                        trackUserAction('faq_search_result_found', {
                            query: searchTerm,
                            question: question,
                            category: category,
                            timestamp: new Date().toISOString()
                        });
                    }
                    
                    // Highlight matching text
                    if (searchTerm) {
                        highlightText(item, searchTerm);
                    } else {
                        removeHighlights(item);
                    }
                } else {
                    item.style.display = 'none';
                    removeHighlights(item);
                }
            });
            
            // Track search results summary
            if (searchTerm) {
                trackUserAction('faq_search_results', {
                    query: searchTerm,
                    resultsCount: resultCount,
                    totalQuestions: accordionItems.length,
                    timestamp: new Date().toISOString()
                });
            }
            
            // Show/hide no results message
            if (noResults) {
                noResults.style.display = hasResults ? 'none' : 'block';
                
                if (!hasResults && searchTerm) {
                    trackUserAction('faq_search_no_results', {
                        query: searchTerm,
                        timestamp: new Date().toISOString()
                    });
                }
            }
        });
        
        function highlightText(element, searchTerm) {
            const headers = element.querySelectorAll('.accordion-header span');
            const contents = element.querySelectorAll('.accordion-content p');
            
            // Remove existing highlights
            removeHighlights(element);
            
            // Highlight in headers
            headers.forEach(header => {
                const text = header.innerHTML;
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                header.innerHTML = text.replace(regex, '<mark class="search-highlight">$1</mark>');
            });
            
            // Highlight in contents
            contents.forEach(content => {
                const text = content.innerHTML;
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                content.innerHTML = text.replace(regex, '<mark class="search-highlight">$1</mark>');
            });
        }
        
        function removeHighlights(element) {
            const marks = element.querySelectorAll('mark.search-highlight');
            marks.forEach(mark => {
                const parent = mark.parentNode;
                parent.replaceChild(document.createTextNode(mark.textContent), mark);
                parent.normalize();
            });
        }
    }
    
    // ===== ENHANCED MAP INTERACTION WITH TRACKING =====
    function initMapInteraction() {
        const mapOverlay = document.getElementById('mapOverlay');
        const storeMap = document.getElementById('storeMap');
        
        if (mapOverlay) {
            mapOverlay.addEventListener('click', function() {
                // Track map interaction
                trackUserAction('store_map_interaction', {
                    action: 'open_larger_map',
                    timestamp: new Date().toISOString()
                });
                
                window.open('https://www.google.com/maps/place/1+Stiemens+St,+Braamfontein,+Johannesburg,+2001/@-26.1915736,28.0328892,17z/data=!3m1!4b1!4m6!3m5!1s0x1e950c1bac578e57:0x6fab502cabc50689!8m2!3d-26.1915736!4d28.0354641!16s%2Fg%2F11c22m_5_0?entry=ttu', '_blank');
            });
        }

        // Track map visibility
        if (storeMap) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        trackUserAction('store_map_viewed', {
                            timestamp: new Date().toISOString()
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(storeMap);
        }
    }

    // User action tracking for SEO analytics
    function trackUserAction(action, data = {}) {
        const eventData = {
            action: action,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            ...data
        };
        
        // In a real implementation, this would send to analytics service
        console.log('SEO Event:', eventData);
        
        // Store in localStorage for temporary analytics
        const events = JSON.parse(localStorage.getItem('seoContactEvents')) || [];
        events.push(eventData);
        localStorage.setItem('seoContactEvents', JSON.stringify(events.slice(-100))); // Keep last 100 events
        
        // Send to analytics endpoint (simulated)
        sendToAnalytics(eventData);
    }

    // Simulated analytics endpoint
    function sendToAnalytics(data) {
        // In production, this would be your analytics endpoint
        if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            navigator.sendBeacon('/api/analytics', blob);
        }
    }

    // Performance monitoring for SEO
    function monitorPerformance() {
        // Track Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
            trackUserAction('performance_metric', { 
                metric: 'LCP', 
                value: lastEntry.startTime,
                page: 'contact'
            });
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // Track First Input Delay (FID)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                const delay = entry.processingStart - entry.startTime;
                console.log('FID:', delay);
                trackUserAction('performance_metric', { 
                    metric: 'FID', 
                    value: delay,
                    page: 'contact'
                });
            });
        }).observe({ entryTypes: ['first-input'] });
    }

    // Initialize performance monitoring
    monitorPerformance();

    // Error tracking for SEO insights
    window.addEventListener('error', function(e) {
        trackUserAction('javascript_error', {
            message: e.message,
            filename: e.filename,
            lineno: e.lineno,
            colno: e.colno,
            page: 'contact'
        });
    });

    // Enhanced Keyboard shortcuts with SEO accessibility tracking
    document.addEventListener('keydown', function(e) {
        // Tab navigation tracking for SEO accessibility
        if (e.key === 'Tab') {
            trackUserAction('keyboard_navigation', { 
                key: 'Tab',
                page: 'contact'
            });
        }
    });
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initFormValidation,
        initAccordion,
        initSearch,
        trackUserAction
    };
}

console.log('MoreSneakers Contact Page - SEO Enhanced JavaScript Initialized');