// Sample product data
const products = [
    // Men's Products
    {
        id: 1,
        name: "قميص رجالي كلاسيكي",
        description: "قميص قطني عالي الجودة مناسب للمناسبات الرسمية",
        price: 250,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop",
        category: "men"
    },
    {
        id: 2,
        name: "بنطلون جينز رجالي",
        description: "جينز عصري بتصميم مريح وأنيق",
        price: 180,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop",
        category: "men"
    },
    {
        id: 3,
        name: "جاكيت رجالي شتوي",
        description: "جاكيت دافئ وأنيق للطقس البارد",
        price: 450,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
        category: "men"
    },
    
    // Women's Products
    {
        id: 4,
        name: "فستان نسائي أنيق",
        description: "فستان بتصميم عصري مناسب للمناسبات الخاصة",
        price: 320,
        image: "https://images.unsplash.com/photo-1566479179817-c0f5b7b0a33b?w=300&h=300&fit=crop",
        category: "women"
    },
    {
        id: 5,
        name: "بلوزة نسائية حريرية",
        description: "بلوزة ناعمة من الحرير الطبيعي",
        price: 280,
        image: "https://images.unsplash.com/photo-1564257577633-0ed51cffdaaf?w=300&h=300&fit=crop",
        category: "women"
    },
    {
        id: 6,
        name: "تنورة كاجوال",
        description: "تنورة مريحة بتصميم عصري",
        price: 150,
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?w=300&h=300&fit=crop",
        category: "women"
    },
    
    // Accessories
    {
        id: 7,
        name: "ساعة يد كلاسيكية",
        description: "ساعة أنيقة بتصميم كلاسيكي",
        price: 380,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop",
        category: "accessories"
    },
    {
        id: 8,
        name: "حقيبة يد جلدية",
        description: "حقيبة يد من الجلد الطبيعي عالي الجودة",
        price: 420,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
        category: "accessories"
    },
    {
        id: 9,
        name: "نظارة شمسية عصرية",
        description: "نظارة شمسية أنيقة بحماية من الأشعة فوق البنفسجية",
        price: 120,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=300&fit=crop",
        category: "accessories"
    }
];

let cart = [];
let currentCategory = 'all';
let currentSection = 'products';

// Initialize the store
function initStore() {
    displayProducts(products);
    updateCartCount();
}

// Enhanced showSection function with mobile support
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName + '-section').classList.add('active');
    currentSection = sectionName;

    // Update desktop navigation active states
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });

    // Update mobile navigation active states
    document.querySelectorAll('.mobile-nav-item').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current section links
    document.querySelectorAll(`[onclick="showSection('${sectionName}')"]`).forEach(link => {
        link.classList.add('active');
    });

    // Scroll to top on section change for mobile
    if (window.innerWidth <= 768) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Display products
function displayProducts(productsToShow) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">${product.price} درهم</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        إضافة إلى السلة
                    </button>
                </div>
            </div>
        `;
        grid.innerHTML += productCard;
    });
}

// Enhanced filter products function with mobile optimization
function filterProducts(category) {
    currentCategory = category;
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter and display products
    let filteredProducts;
    if (category === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    displayProducts(filteredProducts);

    // Smooth scroll to products grid on mobile
    if (window.innerWidth <= 768) {
        const productsGrid = document.getElementById('productsGrid');
        productsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCartCount();
    
    // Visual feedback
    const button = event.target;
    const originalText = button.innerHTML;
    const originalBg = button.style.background;
    
    button.innerHTML = '✓ تم الإضافة';
    button.style.background = 'var(--success-green)';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = originalBg;
        button.disabled = false;
    }, 1500);
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
    
    // Update mobile cart count
    const mobileCartCount = document.getElementById('mobileCartCount');
    if (count > 0) {
        mobileCartCount.textContent = count;
        mobileCartCount.style.display = 'flex';
    } else {
        mobileCartCount.style.display = 'none';
    }
}

// Enhanced mobile-friendly modal handling
function openCart() {
    displayCartItems();
    const modal = document.getElementById('cartModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Prevent background scrolling on mobile
    if (window.innerWidth <= 768) {
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    }
}

function closeCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
    
    // Reset forms
    document.getElementById('orderForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
}

// Display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--dark-gray);">السلة فارغة</p>';
        document.getElementById('totalPrice').textContent = '0';
        return;
    }

    cart.forEach(item => {
        const cartItem = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">${item.price} درهم</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
                        <span style="margin: 0 1rem; font-weight: bold;">الكمية: ${item.quantity}</span>
                        <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">حذف</button>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItem;
    });

    updateTotalPrice();
}

// Update total price
function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('totalPrice').textContent = total;
}

// Increase quantity
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        displayCartItems();
        updateCartCount();
    }
}

// Decrease quantity
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        displayCartItems();
        updateCartCount();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    displayCartItems();
    updateCartCount();
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('السلة فارغة!');
        return;
    }
    document.getElementById('orderForm').style.display = 'block';
}

// Handle customer form submission
document.getElementById('customerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = document.querySelector('.submit-order-btn');
    const submitText = document.getElementById('submitText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    // Show loading state
    submitText.style.display = 'none';
    loadingSpinner.style.display = 'inline-block';
    submitButton.disabled = true;

    // Prepare order data
    const formData = new FormData(e.target);
    const customerInfo = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        phone: formData.get('phone'),
        city: formData.get('city'),
        address: formData.get('address')
    };

    const orderData = {
        customer: customerInfo,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        orderDate: new Date().toISOString(),
        orderId: 'ORDER_' + Date.now()
    };

    try {
        // Simulate API call - replace with actual endpoint
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('Order data:', orderData);
        
        // Success
        document.getElementById('orderForm').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
        
        // Clear cart
        cart = [];
        updateCartCount();
        
        // Reset form
        e.target.reset();
        
    } catch (error) {
        alert('حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
        // Reset button state
        submitText.style.display = 'inline';
        loadingSpinner.style.display = 'none';
        submitButton.disabled = false;
    }
});

// Handle contact form submission
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = e.target.querySelector('.submit-contact-btn');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'جاري الإرسال...';
    submitButton.disabled = true;

    // Prepare contact data
    const formData = new FormData(e.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        date: new Date().toISOString()
    };

    try {
        // Simulate sending message
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log('Contact data:', contactData);
        
        alert('شكراً لك! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.');
        e.target.reset();
        
    } catch (error) {
        alert('حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        closeCart();
    }
};

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCart();
    }
});

// Enhanced initialization with mobile detection
document.addEventListener('DOMContentLoaded', function() {
    initStore();
    
    // Add viewport height adjustment for mobile browsers
    function adjustViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    adjustViewportHeight();
    window.addEventListener('resize', adjustViewportHeight);
    
    // Optimize images loading for mobile
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }

    // Add touch event optimization
    document.addEventListener('touchstart', function() {}, { passive: true });
    document.addEventListener('touchmove', function() {}, { passive: true });
});