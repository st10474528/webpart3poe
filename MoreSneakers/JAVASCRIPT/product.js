// SEO-Optimized JavaScript for MoreSneakers Products Page
// Enhanced with SEO tracking, performance monitoring, and user engagement analytics

document.addEventListener('DOMContentLoaded', function() {
    console.log('MoreSneakers Products Page - SEO Optimized JavaScript Loaded');
    
    // Track page load performance for SEO
    const loadTime = performance.now();
    console.log(`Products page loaded in ${loadTime}ms - Good for SEO`);
    
    // Initialize all functionality
    initSEOTracking();
    initCart();
    initProductFilter();
    initSearch();
    initAnimations();
    initSEOScrollTracking();
    initImageLazyLoading();
    initInternalLinkingAnalytics();
});

// SEO Performance and User Engagement Tracking
function initSEOTracking() {
    // Track user engagement time (signals to search engines)
    let timeOnPage = 0;
    const engagementTimer = setInterval(() => {
        timeOnPage++;
        // Store engagement data for analytics
        if (timeOnPage % 30 === 0) { // Every 30 seconds
            localStorage.setItem('productsPageEngagementTime', timeOnPage);
        }
    }, 1000);

    // Track scroll depth for content engagement
    let maxScrollDepth = 0;
    window.addEventListener('scroll', function() {
        const scrollDepth = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);
        
        // Store scroll depth for SEO insights
        if (maxScrollDepth > 50) {
            localStorage.setItem('productsScrollDepth', Math.round(maxScrollDepth));
        }
    });

    // Track product impressions for SEO
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const productName = card.querySelector('h3').textContent;
                    trackUserAction('product_impression', {
                        productName: productName,
                        position: index + 1,
                        timestamp: new Date().toISOString()
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(card);
    });
}

// Enhanced Cart Management with SEO Analytics
function initCart() {
    const cartToggle = document.getElementById('cartToggle');
    const closeCart = document.getElementById('closeCart');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const emptyCart = document.getElementById('emptyCart');

    // Check if elements exist before adding event listeners
    if (!cartToggle || !closeCart || !cartSidebar || !cartOverlay) {
        console.error('Cart elements not found - SEO impact: Reduced user engagement tracking');
        return;
    }

    let cart = JSON.parse(localStorage.getItem('moreSneakersCart')) || [];

    // Toggle cart sidebar with SEO tracking
    cartToggle.addEventListener('click', function(e) {
        e.preventDefault();
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Track cart view for SEO/analytics
        trackUserAction('cart_viewed', {
            itemsInCart: cart.length,
            cartTotal: calculateCartTotal(cart)
        });
    });

    // Close cart sidebar
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);

    function closeCartSidebar() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Enhanced Add to cart functionality with SEO tracking
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-product');
            const productPrice = parseFloat(this.getAttribute('data-price'));
            const productImage = this.getAttribute('data-image');

            // Track add to cart for SEO conversion tracking
            trackUserAction('product_added_to_cart', {
                productId: productId,
                productName: productName,
                price: productPrice,
                category: this.closest('.product-card').getAttribute('data-category')
            });

            addToCart(productId, productName, productPrice, productImage);
            
            // Animation feedback
            this.classList.add('added');
            const originalText = this.textContent;
            this.textContent = 'Added!';
            
            setTimeout(() => {
                this.classList.remove('added');
                this.textContent = originalText;
            }, 1000);
        });
    });

    function addToCart(id, name, price, image) {
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: id,
                name: name,
                price: price,
                image: image,
                quantity: 1,
                addedAt: new Date().toISOString()
            });
        }
        
        updateCart();
        saveCart();
        showNotification(`${name} added to cart!`, 'success');
    }

    function updateCart() {
        // Update cart count with accessibility
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.setAttribute('aria-label', `${totalItems} items in cart`);
        }

        // Update cart items display
        if (cartItems) {
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                if (emptyCart) {
                    emptyCart.style.display = 'block';
                    cartItems.appendChild(emptyCart);
                }
            } else {
                if (emptyCart) {
                    emptyCart.style.display = 'none';
                }
                
                cart.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.setAttribute('data-product-id', item.id);
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" width="60" height="60" loading="lazy" onerror="this.src='https://via.placeholder.com/60x60/0d7feb/ffffff?text=Product'">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p>R${item.price.toFixed(2)} x ${item.quantity}</p>
                        </div>
                        <div class="cart-item-actions">
                            <button class="quantity-btn minus" data-id="${item.id}" aria-label="Decrease quantity">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
                            <button class="remove-item" data-id="${item.id}" aria-label="Remove item">&times;</button>
                        </div>
                    `;
                    cartItems.appendChild(cartItem);
                });

                // Add event listeners to quantity buttons
                document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const productId = this.getAttribute('data-id');
                        const product = cart.find(item => item.id === productId);
                        if (product) {
                            trackUserAction('cart_quantity_decreased', {
                                productId: productId,
                                productName: product.name,
                                newQuantity: product.quantity - 1
                            });
                        }
                        updateQuantity(productId, -1);
                    });
                });

                document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const productId = this.getAttribute('data-id');
                        const product = cart.find(item => item.id === productId);
                        if (product) {
                            trackUserAction('cart_quantity_increased', {
                                productId: productId,
                                productName: product.name,
                                newQuantity: product.quantity + 1
                            });
                        }
                        updateQuantity(productId, 1);
                    });
                });

                // Add event listeners to remove buttons
                document.querySelectorAll('.remove-item').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const productId = this.getAttribute('data-id');
                        const product = cart.find(item => item.id === productId);
                        if (product) {
                            trackUserAction('product_removed_from_cart', {
                                productId: productId,
                                productName: product.name
                            });
                        }
                        removeFromCart(productId);
                    });
                });
            }
        }

        // Update total
        const total = calculateCartTotal(cart);
        if (cartTotal) {
            cartTotal.textContent = total.toFixed(2);
        }
    }

    function calculateCartTotal(cartItems) {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    function updateQuantity(id, change) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += change;
            
            if (item.quantity <= 0) {
                removeFromCart(id);
            } else {
                updateCart();
                saveCart();
            }
        }
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        updateCart();
        saveCart();
        showNotification('Item removed from cart', 'info');
    }

    function saveCart() {
        localStorage.setItem('moreSneakersCart', JSON.stringify(cart));
    }

    // Clear cart with SEO tracking
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                if (confirm('Are you sure you want to clear your cart?')) {
                    // Track cart abandonment for SEO insights
                    trackUserAction('cart_cleared', {
                        itemsCount: cart.length,
                        totalValue: calculateCartTotal(cart)
                    });
                    
                    cart = [];
                    updateCart();
                    saveCart();
                    showNotification('Cart cleared', 'info');
                }
            }
        });
    }

    // Enhanced Checkout with SEO conversion tracking
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification('Your cart is empty!', 'error');
                return;
            }
            
            // Track checkout initiation for SEO conversion tracking
            trackUserAction('checkout_initiated', {
                items: cart.length,
                total: calculateCartTotal(cart),
                products: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity
                }))
            });
            
            // Simulate checkout process
            showNotification('Proceeding to checkout...', 'success');
            setTimeout(() => {
                closeCartSidebar();
                // In a real application, redirect to checkout page
                // window.location.href = 'checkout.html';
            }, 1000);
        });
    }

    // Initialize cart on page load
    updateCart();
}

// Enhanced Product Filtering with SEO Analytics
function initProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const previousFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            const newFilter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Track filter usage for SEO insights
            trackUserAction('product_filter_applied', {
                previousFilter: previousFilter,
                newFilter: newFilter,
                totalProducts: productCards.length
            });

            // Filter products
            filterProducts(newFilter);
        });
    });

    function filterProducts(category) {
        let visibleCount = 0;
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                // Show with animation
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
                visibleCount++;
            } else {
                // Hide with animation
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        // Track filter results for SEO
        trackUserAction('filter_results', {
            category: category,
            visibleProducts: visibleCount,
            totalProducts: productCards.length
        });

        showNotification(`Showing ${category === 'all' ? 'all' : category} products (${visibleCount} items)`, 'info');
    }
}

// Enhanced Search Functionality with SEO Analytics
function initSearch() {
    // Add search container if it doesn't exist
    if (!document.querySelector('.search-container')) {
        const filterSection = document.querySelector('.filter-section .container');
        if (filterSection) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'search-container';
            searchContainer.innerHTML = `
                <div class="search-box">
                    <input type="text" placeholder="Search for sneakers..." id="searchInput" aria-label="Search for sneakers">
                    <button id="searchBtn" aria-label="Search">
                        <i class="fas fa-search"></i> Search
                    </button>
                </div>
            `;
            filterSection.appendChild(searchContainer);
        }
    }

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const productCards = document.querySelectorAll('.product-card');

    if (searchInput && searchBtn) {
        let searchTimeout;

        function performSearch() {
            const query = searchInput.value.toLowerCase().trim();
            
            // Track search queries for SEO keyword insights
            if (query) {
                trackUserAction('site_search_performed', { 
                    query: query,
                    page: 'products'
                });
            }
            
            if (query === '') {
                // Show all products if search is empty
                productCards.forEach(card => {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                });
                return;
            }

            let foundCount = 0;
            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                const productDescription = card.querySelector('p').textContent.toLowerCase();
                const productCategory = card.getAttribute('data-category');
                
                if (productName.includes(query) || productDescription.includes(query) || productCategory.includes(query)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                    foundCount++;
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });

            // Track search results for SEO
            trackUserAction('search_results', {
                query: query,
                results: foundCount,
                page: 'products'
            });

            showNotification(`Found ${foundCount} products matching "${query}"`, 'info');
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
                        trackUserAction('search_abandoned', { 
                            query: query,
                            page: 'products'
                        });
                    }
                }, 3000);
            }
        });
    }
}

// Enhanced Animations with Performance Optimization
function initAnimations() {
    // Performance-optimized fade-in animation for elements
    const animatedElements = document.querySelectorAll('.product-card, .service-card');
    
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
                trackUserAction('scroll_depth_reached', { 
                    depth: `${depth}%`,
                    page: 'products'
                });
            }
        });
    });
}

// Image lazy loading for SEO performance
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
                
                // Track image loads for SEO performance
                trackUserAction('image_lazy_loaded', { 
                    src: img.src,
                    alt: img.alt || 'No alt text'
                });
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Internal linking analytics for SEO
function initInternalLinkingAnalytics() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.href && link.href.includes(window.location.hostname)) {
            // Track internal link clicks for SEO insights
            const linkText = link.textContent.trim();
            const linkHref = link.getAttribute('href');
            
            trackUserAction('internal_link_clicked', {
                text: linkText,
                href: linkHref,
                page: 'products'
            });
        }
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
        page: 'products'
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
    const events = JSON.parse(localStorage.getItem('seoUserEvents')) || [];
    events.push(eventData);
    localStorage.setItem('seoUserEvents', JSON.stringify(events.slice(-100))); // Keep last 100 events
    
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
    // Escape key to close cart
    if (e.key === 'Escape') {
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar && cartSidebar.classList.contains('active')) {
            const closeCart = document.getElementById('closeCart');
            if (closeCart) {
                closeCart.click();
                trackUserAction('keyboard_navigation', { 
                    key: 'Escape',
                    action: 'close_cart'
                });
            }
        }
    }
    
    // Ctrl+K or Cmd+K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
            trackUserAction('keyboard_shortcut_used', { 
                shortcut: 'search_focus',
                page: 'products'
            });
        }
    }
    
    // Tab navigation tracking for SEO accessibility
    if (e.key === 'Tab') {
        trackUserAction('keyboard_navigation', { 
            key: 'Tab',
            page: 'products'
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
            page: 'products'
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
                page: 'products'
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
        page: 'products'
    });
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initSEOTracking,
        trackUserAction,
        showNotification,
        initCart,
        initProductFilter,
        initSearch
    };
}

console.log('MoreSneakers Products Page - SEO Enhanced JavaScript Initialized');