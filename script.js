// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const categoryBtns = document.querySelectorAll('.category-btn');
const newsletterForm = document.getElementById('newsletter-form');

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Sample Products Data
const products = [
    {
        id: 1,
        name: "Classic White Shirt",
        category: "men",
        price: 15999,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        badge: "New"
    },
    {
        id: 2,
        name: "Elegant Black Dress",
        category: "women",
        price: 25999,
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        badge: "Sale"
    },
    {
        id: 3,
        name: "Denim Jacket",
        category: "men",
        price: 17999,
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        badge: ""
    },
    {
        id: 4,
        name: "Summer Floral Dress",
        category: "women",
        price: 19199,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        badge: "New"
    },
    {
        id: 5,
        name: "Leather Handbag",
        category: "accessories",
        price: 29999,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        badge: ""
    },
    {
        id: 6,
        name: "Casual Sneakers",
        category: "accessories",
        price: 23999,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        badge: "Sale"
    },
    {
        id: 7,
        name: "Wool Sweater",
        category: "men",
        price: 19999,
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        badge: ""
    },
    {
        id: 8,
        name: "Silk Blouse",
        category: "women",
        price: 17199,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        badge: "New"
    },
    {
        id: 9,
        name: "Designer Watch",
        category: "accessories",
        price: 59999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        badge: ""
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartUI();
    initializeEventListeners();
    handleSmoothScrolling();
    animateOnScroll();
    initializeHeroSlider();
});

// Event Listeners
function initializeEventListeners() {
    // Mobile menu toggle
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Cart modal
    cartBtn.addEventListener('click', openCartModal);
    closeCart.addEventListener('click', closeCartModal);
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            closeCartModal();
        }
    });
    
    // Product filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            filterProducts(filter);
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Category buttons
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProducts(category);
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            const correspondingFilter = document.querySelector(`[data-filter="${category}"]`);
            if (correspondingFilter) {
                correspondingFilter.classList.add('active');
            }
            
            // Scroll to products section
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Newsletter form
    newsletterForm.addEventListener('submit', handleNewsletterSubmission);
    
    // CTA buttons (keeping backward compatibility)
    const ctaBtns = document.querySelectorAll('.cta-btn');
    ctaBtns.forEach(btn => {
        if (!btn.classList.contains('primary') && !btn.classList.contains('secondary')) {
            btn.addEventListener('click', function() {
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            });
        }
    });
    
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

// Mobile Menu Functions
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
}

// Product Functions
function loadProducts(filter = 'all') {
    const filteredProducts = filter === 'all' ? products : products.filter(product => product.category === filter);
    
    productGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
    
    // Add animation to product cards
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach((card, index) => {
            card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
        });
    }, 100);
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-category">${capitalizeFirst(product.category)}</p>
            <div class="product-price">LKR ${product.price.toLocaleString()}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

function filterProducts(filter) {
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease both';
        } else {
            card.style.display = 'none';
        }
    });
}

// Shopping Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showCartNotification();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    renderCartItems();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        saveCart();
        updateCartUI();
        renderCartItems();
    }
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = `LKR ${totalPrice.toLocaleString()}`;
    
    // Hide cart count badge if empty
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">LKR ${item.price.toLocaleString()}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
}

function openCartModal() {
    cartModal.style.display = 'flex';
    renderCartItems();
    document.body.style.overflow = 'hidden';
}

function closeCartModal() {
    cartModal.style.display = 'none';
    document.body.style.overflow = '';
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showCartNotification() {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = 'Item added to cart!';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Newsletter Functions
function handleNewsletterSubmission(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simulate API call
    const submitBtn = e.target.querySelector('button');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert(`Thank you for subscribing with email: ${email}`);
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Smooth Scrolling
function handleSmoothScrolling() {
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
}

// Header Scroll Effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
}

// Animation on Scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease both';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.category-card, .feature, .footer-section').forEach(el => {
        observer.observe(el);
    });
}

// Search Functionality
document.querySelector('.search-btn').addEventListener('click', function() {
    const searchTerm = prompt('Search for products:');
    if (searchTerm) {
        searchProducts(searchTerm);
    }
});

function searchProducts(term) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase())
    );
    
    productGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1/-1; font-size: 1.2rem;">No products found matching your search.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
    
    // Scroll to products section
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    
    // Reset filter buttons
    filterBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-filter="all"]').classList.add('active');
}

// Checkout Function
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('checkout-btn')) {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const confirmed = confirm(`Proceed to checkout?\nTotal: LKR ${total.toLocaleString()}`);
        
        if (confirmed) {
            // Simulate checkout process
            alert('Thank you for your purchase! Your order has been placed.');
            cart = [];
            saveCart();
            updateCartUI();
            closeCartModal();
        }
    }
});

// Utility Functions
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (cartModal.style.display === 'flex') {
            closeCartModal();
        }
        if (navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
});

// Performance optimization: Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add CSS for slide-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(300px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Hero Slider Functionality
function initializeHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const navBtns = document.querySelectorAll('.hero-nav-btn');
    const heroSection = document.querySelector('.hero');
    let currentSlide = 0;
    let slideInterval;
    
    // Auto-slide functionality
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        navBtns[currentSlide].classList.remove('active');
        
        currentSlide = (currentSlide + 1) % slides.length;
        
        slides[currentSlide].classList.add('active');
        navBtns[currentSlide].classList.add('active');
    }
    
    // Start auto-slide
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 7000);
    }
    
    // Stop auto-slide
    function stopSlideshow() {
        clearInterval(slideInterval);
    }
    
    // Pause on hover for better UX
    heroSection.addEventListener('mouseenter', stopSlideshow);
    heroSection.addEventListener('mouseleave', startSlideshow);
    
    // Start the slideshow
    startSlideshow();
    
    // Manual navigation
    navBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (index !== currentSlide) {
                slides[currentSlide].classList.remove('active');
                navBtns[currentSlide].classList.remove('active');
                
                currentSlide = index;
                
                slides[currentSlide].classList.add('active');
                navBtns[currentSlide].classList.add('active');
                
                // Restart slideshow after manual navigation
                stopSlideshow();
                startSlideshow();
            }
        });
    });
    
    // Enhanced CTA button functionality
    const primaryCTA = document.querySelector('.cta-btn.primary');
    const secondaryCTA = document.querySelector('.cta-btn.secondary');
    
    if (primaryCTA) {
        primaryCTA.addEventListener('click', function() {
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (secondaryCTA) {
        secondaryCTA.addEventListener('click', function() {
            // Create a modal for lookbook or redirect to a video
            showLookbookModal();
        });
    }
    
    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
}

// Lookbook Modal (placeholder functionality)
function showLookbookModal() {
    alert('Lookbook feature coming soon! Stay tuned for our fashion videos and style guides.');
}

// Enhanced scroll animations for hero elements
function observeHeroElements() {
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-stats, .hero-actions, .hero-features');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    heroElements.forEach(el => {
        observer.observe(el);
    });
}