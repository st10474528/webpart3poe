// SEO-Optimized JavaScript for MoreSneakers News & Updates Page
// Enhanced with SEO tracking, performance monitoring, and user engagement analytics

document.addEventListener('DOMContentLoaded', function() {
    console.log('MoreSneakers News & Updates Page - SEO Optimized JavaScript Loaded');
    
    // Track page load performance for SEO
    const loadTime = performance.now();
    console.log(`News page loaded in ${loadTime}ms - Good for SEO`);
    
    // Initialize all functionality
    initSEOTracking();
    initCountdown();
    initNewsletter();
    initNewsFilter();
    initNewsSearch();
    initAnimations();
    initSEOScrollTracking();
    initNewsEngagementTracking();
    initSocialShareTracking();
});

// SEO Performance and User Engagement Tracking
function initSEOTracking() {
    // Track user engagement time (signals to search engines)
    let timeOnPage = 0;
    const engagementTimer = setInterval(() => {
        timeOnPage++;
        // Store engagement data for analytics
        if (timeOnPage % 30 === 0) { // Every 30 seconds
            localStorage.setItem('newsPageEngagementTime', timeOnPage);
        }
    }, 1000);

    // Track scroll depth for content engagement
    let maxScrollDepth = 0;
    window.addEventListener('scroll', function() {
        const scrollDepth = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);
        
        // Store scroll depth for SEO insights
        if (maxScrollDepth > 50) {
            localStorage.setItem('newsScrollDepth', Math.round(maxScrollDepth));
        }
    });

    // Track news article impressions
    const newsArticles = document.querySelectorAll('.news-item, .news-article');
    newsArticles.forEach((article, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const articleTitle = article.querySelector('h2, h3')?.textContent || 'Untitled Article';
                    trackUserAction('news_article_impression', {
                        articleTitle: articleTitle,
                        position: index + 1,
                        timestamp: new Date().toISOString()
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(article);
    });
}

// Enhanced Countdown Timer with SEO Event Tracking
function initCountdown() {
    const saleDate = new Date('May 15, 2025 00:00:00').getTime();
    let countdownViewed = false;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = saleDate - now;
        
        if (distance < 0) {
            // Sale has started - track conversion opportunity
            document.querySelector('.sale-countdown').innerHTML = `
                <h3>🎉 Sale is Live! 🎉</h3>
                <p>Don't miss out on amazing discounts!</p>
                <a href="products.html" class="cta-button" onclick="trackUserAction('sale_countdown_clicked', {action: 'shop_now'})">Shop Now</a>
            `;
            
            // Track sale activation
            trackUserAction('sale_activated', {
                saleName: 'Summer Sale 2025',
                timestamp: new Date().toISOString()
            });
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update countdown display
        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
        
        // Track countdown view (only once per session)
        if (!countdownViewed && days < 7) {
            countdownViewed = true;
            trackUserAction('sale_countdown_viewed', {
                daysRemaining: days,
                urgencyLevel: days < 3 ? 'high' : days < 7 ? 'medium' : 'low'
            });
        }
        
        // Add animation for last minute
        if (days === 0 && hours === 0 && minutes < 5) {
            document.querySelector('.sale-countdown').style.animation = 'pulse 0.5s infinite';
            
            // Track high urgency
            if (minutes === 4) {
                trackUserAction('sale_countdown_high_urgency', {
                    minutesRemaining: minutes
                });
            }
        }
    }
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
}

// Enhanced Newsletter Subscription with SEO Analytics
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    const newsletterInput = newsletterForm.querySelector('input[type="email"]');
    
    // Create message element if it doesn't exist
    if (!document.querySelector('.newsletter-message')) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'newsletter-message';
        messageDiv.setAttribute('aria-live', 'polite');
        newsletterForm.parentNode.insertBefore(messageDiv, newsletterForm.nextSibling);
    }
    
    const messageDiv = document.querySelector('.newsletter-message');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = newsletterInput.value.trim();
        
        if (!isValidEmail(email)) {
            showNewsletterMessage('Please enter a valid email address.', 'error');
            trackUserAction('newsletter_subscription_failed', {
                reason: 'invalid_email',
                email: email
            });
            return;
        }
        
        // Track subscription attempt
        trackUserAction('newsletter_subscription_attempt', {
            email: email,
            source: 'news_page'
        });
        
        // Simulate API call
        showNewsletterMessage('Subscribing...', 'info');
        const submitButton = newsletterForm.querySelector('button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            // Track successful subscription
            trackUserAction('newsletter_subscription_success', {
                email: email,
                source: 'news_page',
                timestamp: new Date().toISOString()
            });
            
            showNewsletterMessage('Thank you for subscribing to our newsletter! You\'ll receive the latest sneaker news and exclusive offers.', 'success');
            newsletterForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Save to localStorage
            saveSubscriber(email);
        }, 1500);
    });
    
    // Track newsletter form focus for engagement
    newsletterInput.addEventListener('focus', function() {
        trackUserAction('newsletter_form_focused', {
            element: 'email_input'
        });
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNewsletterMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `newsletter-message ${type}`;
        messageDiv.style.display = 'block';
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
    
    function saveSubscriber(email) {
        const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
        if (!subscribers.includes(email)) {
            subscribers.push({
                email: email,
                subscribedAt: new Date().toISOString(),
                source: 'news_page'
            });
            localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
        }
    }
}

// Enhanced News Filtering with SEO Analytics
function initNewsFilter() {
    // Add filter section if it doesn't exist
    if (!document.querySelector('.news-filter')) {
        const newsContent = document.querySelector('.news-content .container');
        const filterSection = document.createElement('div');
        filterSection.className = 'news-filter';
        filterSection.setAttribute('role', 'navigation');
        filterSection.setAttribute('aria-label', 'News categories filter');
        filterSection.innerHTML = `
            <h3>Filter News by Category</h3>
            <div class="filter-options" role="tablist">
                <button class="filter-btn active" data-filter="all" role="tab" aria-selected="true">All News</button>
                <button class="filter-btn" data-filter="sale" role="tab" aria-selected="false">Sales & Promotions</button>
                <button class="filter-btn" data-filter="new" role="tab" aria-selected="false">New Arrivals</button>
                <button class="filter-btn" data-filter="event" role="tab" aria-selected="false">Store Events</button>
                <button class="filter-btn" data-filter="update" role="tab" aria-selected="false">Company Updates</button>
            </div>
        `;
        newsContent.insertBefore(filterSection, document.querySelector('.news-grid'));
    }
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsItems = document.querySelectorAll('.news-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const previousFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            const newFilter = this.getAttribute('data-filter');
            
            // Update active button with accessibility
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Track filter usage for SEO insights
            trackUserAction('news_filter_applied', {
                previousFilter: previousFilter,
                newFilter: newFilter,
                totalArticles: newsItems.length
            });
            
            // Filter news items
            filterNewsItems(newFilter);
        });
        
        // Keyboard navigation for filters
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    function filterNewsItems(category) {
        let visibleCount = 0;
        
        newsItems.forEach(item => {
            if (category === 'all') {
                item.style.display = 'flex';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
                visibleCount++;
            } else {
                // Enhanced category detection based on content and data attributes
                const text = item.textContent.toLowerCase();
                let matches = false;
                
                switch(category) {
                    case 'sale':
                        matches = text.includes('sale') || text.includes('discount') || text.includes('promotion') || text.includes('free shipping');
                        break;
                    case 'new':
                        matches = text.includes('new') || text.includes('arrived') || text.includes('collection') || text.includes('latest');
                        break;
                    case 'event':
                        matches = text.includes('event') || text.includes('opening') || text.includes('workshop') || text.includes('announcement');
                        break;
                    case 'update':
                        matches = text.includes('update') || text.includes('program') || text.includes('loyalty') || text.includes('expansion');
                        break;
                }
                
                if (matches) {
                    item.style.display = 'flex';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                    visibleCount++;
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
        
        // Track filter results for SEO
        trackUserAction('news_filter_results', {
            category: category,
            visibleArticles: visibleCount,
            totalArticles: newsItems.length
        });
    }
}

// Enhanced News Search with SEO Analytics
function initNewsSearch() {
    // Add search box if it doesn't exist
    if (!document.querySelector('.search-box')) {
        const filterSection = document.querySelector('.news-filter');
        const searchBox = document.createElement('div');
        searchBox.className = 'search-box';
        searchBox.innerHTML = `
            <input type="text" placeholder="Search news articles..." id="newsSearch" aria-label="Search news articles">
            <button id="searchNewsBtn" aria-label="Search news">
                <i class="fas fa-search"></i> Search
            </button>
        `;
        filterSection.appendChild(searchBox);
    }
    
    const searchInput = document.getElementById('newsSearch');
    const searchBtn = document.getElementById('searchNewsBtn');
    const newsItems = document.querySelectorAll('.news-item');
    
    let searchTimeout;
    
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        // Track search queries for SEO keyword insights
        if (query) {
            trackUserAction('news_search_performed', { 
                query: query,
                resultsCount: 0 // Will update below
            });
        }
        
        if (query === '') {
            // Show all items if search is empty
            newsItems.forEach(item => {
                item.style.display = 'flex';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            });
            return;
        }
        
        let foundCount = 0;
        
        newsItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const content = item.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(query) || content.includes(query)) {
                item.style.display = 'flex';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
                foundCount++;
                
                // Track which articles were found in search
                trackUserAction('news_article_found_in_search', {
                    query: query,
                    articleTitle: title,
                    position: foundCount
                });
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Update search results tracking
        if (query) {
            trackUserAction('news_search_results', {
                query: query,
                results: foundCount
            });
        }
        
        showNotification(`Found ${foundCount} news articles matching "${query}"`, 'info');
    }
    
    // Debounced search for performance
    function debouncedSearch() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300);
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('input', debouncedSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Track search abandonment
    searchInput.addEventListener('blur', function() {
        const query = this.value.trim();
        if (query !== '') {
            setTimeout(() => {
                if (this.value === query) { // Query wasn't cleared
                    trackUserAction('news_search_abandoned', { 
                        query: query
                    });
                }
            }, 3000);
        }
    });
}

// News Article Engagement Tracking
function initNewsEngagementTracking() {
    const newsArticles = document.querySelectorAll('.news-item, .news-article');
    
    newsArticles.forEach(article => {
        // Track clicks on news articles
        article.addEventListener('click', function() {
            const title = this.querySelector('h2, h3')?.textContent || 'Untitled Article';
            const isFeatured = this.classList.contains('featured');
            
            trackUserAction('news_article_clicked', {
                articleTitle: title,
                isFeatured: isFeatured,
                timestamp: new Date().toISOString()
            });
            
            showNotification(`Opening: ${title}`, 'success');
            // In a real application, this would navigate to the full article
        });
        
        // Track time spent reading each article
        let readingStartTime;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    readingStartTime = Date.now();
                } else if (readingStartTime) {
                    const readingTime = Date.now() - readingStartTime;
                    if (readingTime > 2000) { // Only track if read for more than 2 seconds
                        const title = article.querySelector('h2, h3')?.textContent || 'Untitled Article';
                        trackUserAction('news_article_read', {
                            articleTitle: title,
                            readingTime: Math.round(readingTime / 1000), // in seconds
                            timestamp: new Date().toISOString()
                        });
                    }
                    readingStartTime = null;
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(article);
    });
}

// Social Share Tracking
function initSocialShareTracking() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('aria-label')?.replace('Follow MoreSneakers on ', '') || 'unknown';
            
            trackUserAction('social_media_click', {
                platform: platform,
                source: 'news_page',
                timestamp: new Date().toISOString()
            });
            
            // Allow the link to proceed normally
        });
    });
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
                trackUserAction('news_scroll_depth_reached', { 
                    depth: `${depth}%`,
                    timestamp: new Date().toISOString()
                });
            }
        });
    });
}

// Enhanced Animations with Performance Optimization
function initAnimations() {
    // Performance-optimized fade-in animation for elements
    const animatedElements = document.querySelectorAll('.news-item, .news-article, .newsletter-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100 + (index * 50));
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '50px' 
    });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Enhanced Notification System with SEO Event Tracking
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Track notification displays for SEO engagement
    trackUserAction('notification_displayed', {
        message: message,
        type: type,
        page: 'news'
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
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
    const events = JSON.parse(localStorage.getItem('seoNewsEvents')) || [];
    events.push(eventData);
    localStorage.setItem('seoNewsEvents', JSON.stringify(events.slice(-100))); // Keep last 100 events
    
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

// Enhanced Keyboard shortcuts with SEO accessibility tracking
document.addEventListener('keydown', function(e) {
    // Ctrl+F or Cmd+F to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.getElementById('newsSearch');
        if (searchInput) {
            searchInput.focus();
            trackUserAction('keyboard_shortcut_used', { 
                shortcut: 'search_focus',
                page: 'news'
            });
        }
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('newsSearch');
        if (searchInput && document.activeElement === searchInput) {
            searchInput.value = '';
            const event = new Event('keypress');
            event.key = 'Enter';
            searchInput.dispatchEvent(event);
            trackUserAction('keyboard_navigation', { 
                key: 'Escape',
                action: 'clear_search'
            });
        }
    }
    
    // Tab navigation tracking for SEO accessibility
    if (e.key === 'Tab') {
        trackUserAction('keyboard_navigation', { 
            key: 'Tab',
            page: 'news'
        });
    }
});

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
            page: 'news'
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
                page: 'news'
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
        page: 'news'
    });
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initSEOTracking,
        trackUserAction,
        showNotification,
        initCountdown,
        initNewsletter,
        initNewsFilter,
        initNewsSearch
    };
}

console.log('MoreSneakers News & Updates Page - SEO Enhanced JavaScript Initialized');