// SEO-Optimized JavaScript for MoreSneakers E-commerce Website
// Enhanced with SEO tracking, performance monitoring, and user engagement analytics

// Document ready with SEO performance tracking
document.addEventListener('DOMContentLoaded', function() {
    console.log('MoreSneakers SEO-optimized website loaded');
    
    // Track page load performance for SEO
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime}ms - Good for SEO`);
    
    // Initialize all functionality
    initSEOTracking();
    initCart();
    initCountdownTimer();
    initProductFilter();
    initNewsletter();
    initBackToTop();
    initInteractiveElements();
    initMap();
    initSearch();
    initLightbox();
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
            localStorage.setItem('userEngagementTime', timeOnPage);
        }
    }, 1000);

    // Track scroll depth for content engagement
    let maxScrollDepth = 0;
    window.addEventListener('scroll', function() {
        const scrollDepth = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);
        
        // Store scroll depth for SEO insights
        if (maxScrollDepth > 50) {
            localStorage.setItem('scrollDepth', Math.round(maxScrollDepth));
        }
    });

    // Track outbound links for SEO
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.href && !link.href.includes(window.location.hostname)) {
            // Track external links for SEO
            console.log('Outbound link clicked:', link.href);
        }
    });
}

// Enhanced Cart functionality with SEO events
function initCart() {
    const cartCounter = document.getElementById('cartCounter');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.getElementById('closeCart');
    const cartLink = document.getElementById('cartLink');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');
    
    // Load cart count from localStorage
    let cartCount = localStorage.getItem('cartCount') || 0;
    updateCartCounter(cartCount);
    updateCartDisplay();
    
    // Cart toggle functionality
    if (cartLink && cartSidebar && cartOverlay && closeCart) {
        cartLink.addEventListener('click', function(e) {
            e.preventDefault();
            openCartSidebar();
            
            // Track cart view for SEO/analytics
            trackUserAction('cart_viewed');
        });
        
        closeCart.addEventListener('click', closeCartSidebar);
        cartOverlay.addEventListener('click', closeCartSidebar);
        
        function openCartSidebar() {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            updateCartDisplay();
        }
        
        function closeCartSidebar() {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Checkout functionality
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const cart = JSON.parse(localStorage.getItem('moreSneakersCart')) || [];
            if (cart.length === 0) {
                showNotification('Your cart is empty!', 'error');
                return;
            }
            
            // Track checkout initiation for SEO conversion tracking
            trackUserAction('checkout_initiated', {
                items: cart.length,
                total: calculateCartTotal(cart)
            });
            
            showNotification('Proceeding to checkout...', 'success');
            // In a real implementation, redirect to checkout page
            setTimeout(() => {
                window.location.href = 'checkout.html';
            }, 1000);
        });
    }
    
    // Clear cart functionality
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            localStorage.removeItem('moreSneakersCart');
            cartCount = 0;
            updateCartCounter(cartCount);
            updateCartDisplay();
            showNotification('Cart cleared!', 'success');
            
            // Track cart abandonment for SEO insights
            trackUserAction('cart_cleared');
        });
    }
    
    // Enhanced Add to Cart with SEO event tracking
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-product');
            const productPrice = this.getAttribute('data-price');
            const productImage = this.getAttribute('data-image');
            
            // Animation effect
            this.classList.add('added');
            const originalText = this.textContent;
            this.textContent = 'Added!';
            
            setTimeout(() => {
                this.classList.remove('added');
                this.textContent = originalText;
            }, 1000);
            
            // Update cart count
            cartCount++;
            updateCartCounter(cartCount);
            localStorage.setItem('cartCount', cartCount);
            
            // Track add to cart for SEO conversion tracking
            trackUserAction('product_added_to_cart', {
                productId: productId,
                productName: productName,
                price: productPrice
            });
            
            // Show notification
            showNotification(`${productName} added to cart!`, 'success');
            
            // Add to cart storage
            addToCartStorage(productId, productName, productPrice, productImage);
        });
    });
    
    function updateCartCounter(count) {
        if (cartCounter) {
            cartCounter.textContent = count;
            // Update aria-label for accessibility (SEO benefit)
            cartCounter.setAttribute('aria-label', `${count} items in cart`);
        }
    }
    
    function addToCartStorage(id, name, price, image) {
        let cart = JSON.parse(localStorage.getItem('moreSneakersCart')) || [];
        
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: id,
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }
        
        localStorage.setItem('moreSneakersCart', JSON.stringify(cart));
        updateCartDisplay();
    }
    
    function updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const emptyCart = document.getElementById('emptyCart');
        
        if (!cartItems || !cartTotal) return;
        
        const cart = JSON.parse(localStorage.getItem('moreSneakersCart')) || [];
        
        if (cart.length === 0) {
            if (emptyCart) emptyCart.style.display = 'block';
            cartItems.innerHTML = '';
            cartTotal.textContent = '0.00';
            return;
        }
        
        if (emptyCart) emptyCart.style.display = 'none';
        
        let total = 0;
        let cartHTML = '';
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" width="60" height="60">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>R${item.price} x ${item.quantity}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">&times;</button>
                    </div>
                </div>
            `;
        });
        
        cartItems.innerHTML = cartHTML;
        cartTotal.textContent = total.toFixed(2);
        
        // Add event listeners to cart item buttons
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', function() {
                updateCartItemQuantity(this.getAttribute('data-id'), -1);
            });
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', function() {
                updateCartItemQuantity(this.getAttribute('data-id'), 1);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                removeCartItem(this.getAttribute('data-id'));
            });
        });
    }
    
    function updateCartItemQuantity(productId, change) {
        let cart = JSON.parse(localStorage.getItem('moreSneakersCart')) || [];
        const itemIndex = cart.findIndex(item => item.id === productId);
        
        if (itemIndex !== -1) {
            cart[itemIndex].quantity += change;
            
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            } else {
                cart[itemIndex].quantity = Math.max(1, cart[itemIndex].quantity);
            }
            
            localStorage.setItem('moreSneakersCart', JSON.stringify(cart));
            
            // Update cart count
            const newCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount = newCount;
            updateCartCounter(cartCount);
            localStorage.setItem('cartCount', cartCount);
            
            updateCartDisplay();
            showNotification('Cart updated!', 'success');
        }
    }
    
    function removeCartItem(productId) {
        let cart = JSON.parse(localStorage.getItem('moreSneakersCart')) || [];
        cart = cart.filter(item => item.id !== productId);
        
        localStorage.setItem('moreSneakersCart', JSON.stringify(cart));
        
        // Update cart count
        const newCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount = newCount;
        updateCartCounter(cartCount);
        localStorage.setItem('cartCount', cartCount);
        
        updateCartDisplay();
        showNotification('Item removed from cart!', 'success');
    }
    
    function calculateCartTotal(cart) {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}

// Enhanced Countdown timer with SEO urgency signals
function initCountdownTimer() {
    const countdownElement = document.getElementById('countdown');
    
    if (!countdownElement) return;
    
    // Set the end time (24 hours from now)
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);
    
    function updateCountdown() {
        const now = new Date();
        const timeLeft = endTime - now;
        
        if (timeLeft <= 0) {
            countdownElement.textContent = 'Offer expired!';
            countdownElement.parentElement.style.opacity = '0.7';
            
            // Track offer expiration for SEO insights
            trackUserAction('special_offer_expired');
            return;
        }
        
        // Calculate hours, minutes, seconds
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Format and display with urgency colors
        countdownElement.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Change color based on urgency (SEO visual cues)
        if (hours < 1) {
            countdownElement.style.color = '#e74c3c';
            countdownElement.style.fontWeight = 'bold';
        } else if (hours < 6) {
            countdownElement.style.color = '#e67e22';
        }
        
        // Track when users see the countdown (engagement metric)
        if (hours === 23 && minutes === 59) {
            trackUserAction('countdown_viewed');
        }
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Enhanced Product filtering with SEO tracking
function initProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    // Track initial product impressions for SEO
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent;
        trackUserAction('product_impression', { productName: productName });
    });
    
    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
            
            // Track filter usage for SEO insights
            trackUserAction('product_filter_applied', { filter: filter });
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
                    card.style.transform = 'translateY(0)';
                }, 10);
                visibleCount++;
            } else {
                // Hide with animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
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
        
        showNotification(`Showing ${category === 'all' ? 'all' : category} products (${visibleCount} items)`);
    }
}

// Enhanced Newsletter with SEO lead generation tracking
function initNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterSubmit = document.getElementById('newsletterSubmit');
    const newsletterMessage = document.getElementById('newsletterMessage');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = newsletterEmail.value.trim();
        
        if (!isValidEmail(email)) {
            showNewsletterMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        const btnText = newsletterSubmit.querySelector('.btn-text');
        const loading = newsletterSubmit.querySelector('.loading');
        
        if (btnText && loading) {
            btnText.style.display = 'none';
            loading.style.display = 'block';
        }
        newsletterSubmit.disabled = true;
        
        // Simulate API call with SEO tracking
        setTimeout(() => {
            // Reset button
            if (btnText && loading) {
                btnText.style.display = 'block';
                loading.style.display = 'none';
            }
            newsletterSubmit.disabled = false;
            
            // Track successful subscription for SEO conversion
            trackUserAction('newsletter_subscription', { email: email });
            
            // Show success message
            showNewsletterMessage('Thank you for subscribing! You\'ll receive exclusive offers and updates.', 'success');
            
            // Reset form
            newsletterForm.reset();
            
            // Save to localStorage
            saveSubscriber(email);
        }, 1500);
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNewsletterMessage(message, type) {
        if (newsletterMessage) {
            newsletterMessage.textContent = message;
            newsletterMessage.className = `newsletter-message ${type}`;
            newsletterMessage.style.display = 'block';
            
            setTimeout(() => {
                newsletterMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    function saveSubscriber(email) {
        const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
            
            // Track subscriber count for SEO metrics
            console.log(`Total subscribers: ${subscribers.length}`);
        }
    }
}

// Enhanced Back to top with SEO scroll behavior tracking
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        // Track back to top clicks for SEO engagement
        trackUserAction('back_to_top_clicked');
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
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
                trackUserAction('scroll_depth_reached', { depth: `${depth}%` });
            }
        });
    });
}

// Enhanced Interactive elements with SEO engagement tracking
function initInteractiveElements() {
    // Accordion functionality with SEO tracking
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach((item, index) => {
        const header = item.querySelector('.accordion-header');
        
        if (header) {
            header.addEventListener('click', function() {
                const wasActive = item.classList.contains('active');
                
                // Toggle active class
                item.classList.toggle('active');
                
                // Track accordion interactions for SEO engagement
                if (!wasActive) {
                    const accordionTitle = header.textContent.trim();
                    trackUserAction('accordion_opened', { 
                        title: accordionTitle,
                        index: index 
                    });
                }
                
                // Close other accordion items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        }
    });
    
    // Tabs functionality with SEO tracking
    const tabHeaders = document.querySelectorAll('.tab-header');
    
    tabHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabName = this.textContent.trim();
            
            // Update active tab header
            tabHeaders.forEach(h => h.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabPanes = document.querySelectorAll('.tab-pane');
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId) {
                    pane.classList.add('active');
                }
            });
            
            // Track tab interactions for SEO engagement
            trackUserAction('tab_switched', { tabName: tabName });
        });
    });
    
    // Modal functionality
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Open modal with SEO tracking
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Track modal openings for SEO engagement
                trackUserAction('modal_opened', { modalId: modalId });
            }
        });
    });
    
    // Close modal
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // Enhanced Contact form with SEO conversion tracking
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Track contact form submission for SEO conversion
            trackUserAction('contact_form_submitted', formData);
            
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            this.reset();
            const contactModal = document.getElementById('contactModal');
            if (contactModal) {
                closeModal(contactModal);
            }
        });
    }
    
    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
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
                href: linkHref
            });
        }
    });
}

// Interactive map with local SEO enhancement
function initMap() {
    const mapContainer = document.getElementById('map');
    
    if (!mapContainer) return;
    
    // In a real implementation, this would initialize Google Maps
    // For now, we'll track map interactions for local SEO
    
    mapContainer.addEventListener('click', function() {
        trackUserAction('store_location_viewed', {
            address: '48 Bodmas Street, Midrand'
        });
        
        showNotification('Opening store location details...', 'info');
    });
    
    console.log('Map container ready for local SEO implementation');
}

// Enhanced Search functionality with SEO analytics
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (!searchInput || !searchBtn) return;
    
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (query === '') {
            showNotification('Please enter a search term', 'error');
            return;
        }
        
        // Track search queries for SEO keyword insights
        trackUserAction('site_search_performed', { query: query });
        
        const productCards = document.querySelectorAll('.product-card');
        let foundCount = 0;
        
        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productDescription = card.querySelector('p').textContent.toLowerCase();
            const productCategory = card.getAttribute('data-category');
            
            if (productName.includes(query) || productDescription.includes(query) || productCategory.includes(query)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
                foundCount++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Track search results for SEO
        trackUserAction('search_results', {
            query: query,
            results: foundCount
        });
        
        showNotification(`Found ${foundCount} products matching "${query}"`);
    }
    
    searchBtn.addEventListener('click', performSearch);
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
                    trackUserAction('search_abandoned', { query: query });
                }
            }, 3000);
        }
    });
}

// Enhanced Lightbox with SEO image engagement tracking
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.querySelector('.close-lightbox');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    if (!lightbox) return;
    
    // Get all product images
    const productImages = document.querySelectorAll('.product-card img');
    let currentImageIndex = 0;
    const images = [];
    
    // Collect image sources and track image views
    productImages.forEach((img, index) => {
        images.push({
            src: img.src,
            alt: img.alt,
            product: img.closest('.product-card').querySelector('h3').textContent
        });
        
        img.addEventListener('click', function() {
            openLightbox(index);
            
            // Track product image views for SEO engagement
            trackUserAction('product_image_viewed', {
                product: images[index].product,
                altText: images[index].alt || 'No alt text'
            });
        });
    });
    
    function openLightbox(index) {
        currentImageIndex = index;
        if (lightboxImg) {
            lightboxImg.src = images[currentImageIndex].src;
            lightboxImg.alt = images[currentImageIndex].alt;
        }
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightboxFunc() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        if (lightboxImg) {
            lightboxImg.src = images[currentImageIndex].src;
            lightboxImg.alt = images[currentImageIndex].alt;
        }
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        if (lightboxImg) {
            lightboxImg.src = images[currentImageIndex].src;
            lightboxImg.alt = images[currentImageIndex].alt;
        }
    }
    
    // Event listeners
    if (closeLightbox) {
        closeLightbox.addEventListener('click', closeLightboxFunc);
    }
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeLightboxFunc();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
        }
    });
}

// Enhanced notification system with SEO event tracking
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
        type: type
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

// CTA button functionality with SEO conversion tracking
document.addEventListener('DOMContentLoaded', function() {
    const shopNowBtn = document.getElementById('shopNowBtn');
    const viewCollectionBtn = document.getElementById('viewCollectionBtn');
    
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', function() {
            // Track CTA clicks for SEO conversion
            trackUserAction('cta_clicked', { cta: 'shop_now' });
            window.location.href = 'products.html';
        });
    }
    
    if (viewCollectionBtn) {
        viewCollectionBtn.addEventListener('click', function() {
            // Track CTA clicks for SEO conversion
            trackUserAction('cta_clicked', { cta: 'view_collection' });
            window.location.href = 'products.html';
        });
    }
});

// Enhanced keyboard shortcuts with SEO accessibility tracking
document.addEventListener('keydown', function(e) {
    // Escape key to close modals and cart
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal[style*="display: flex"]');
        if (activeModal) {
            const closeBtn = activeModal.querySelector('.close-modal');
            if (closeBtn) closeBtn.click();
        }
        
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar && cartSidebar.classList.contains('active')) {
            const closeCart = document.getElementById('closeCart');
            if (closeCart) closeCart.click();
        }
        
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.style.display === 'flex') {
            const closeLightbox = document.querySelector('.close-lightbox');
            if (closeLightbox) closeLightbox.click();
        }
        
        // Track keyboard navigation for SEO accessibility
        trackUserAction('keyboard_navigation', { key: 'Escape' });
    }
    
    // Ctrl+K or Cmd+K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
            trackUserAction('keyboard_shortcut_used', { shortcut: 'search_focus' });
        }
    }
    
    // Tab navigation tracking for SEO accessibility
    if (e.key === 'Tab') {
        trackUserAction('keyboard_navigation', { key: 'Tab' });
    }
});

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
}

// Initialize cart from localStorage on page load
function initializeCartFromStorage() {
    const cart = JSON.parse(localStorage.getItem('moreSneakersCart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCounter = document.getElementById('cartCounter');
    if (cartCounter) {
        cartCounter.textContent = totalItems;
    }
    
    // Track returning user with existing cart
    if (totalItems > 0) {
        trackUserAction('returning_user_with_cart', { itemsInCart: totalItems });
    }
}

// Performance monitoring for SEO
function monitorPerformance() {
    // Track Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        trackUserAction('performance_metric', { metric: 'LCP', value: lastEntry.startTime });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Track First Input Delay (FID)
    new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
            const delay = entry.processingStart - entry.startTime;
            console.log('FID:', delay);
            trackUserAction('performance_metric', { metric: 'FID', value: delay });
        });
    }).observe({ entryTypes: ['first-input'] });
}

// Call initialization
initializeCartFromStorage();
monitorPerformance();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initSEOTracking,
        trackUserAction,
        showNotification
    };
}