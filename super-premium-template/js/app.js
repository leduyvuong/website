// Super Premium Template - Interactions

// Super Premium Template - Interactions

document.addEventListener('DOMContentLoaded', () => {
    // Initialize App Data
    initializeApp();

    // 1. Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Sticky Header Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            header.style.padding = '15px 0';
        }
    });

    // 3. Countdown Timer
    const countdownDate = new Date().getTime() + (2 * 60 * 60 * 1000) + (45 * 60 * 1000) + (32 * 1000); // 2h 45m 32s from now

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const countdownEl = document.getElementById('countdown');
        if (!countdownEl) return;

        if (distance < 0) {
            countdownEl.innerHTML = "EXPIRED";
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    };

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // 4. Scroll Animations (Fade In)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
});

function initializeApp() {
    const data = Storage.get();
    
    // Sync products
    if (window.mockProducts && window.mockProducts.length > 0) {
        data.products = window.mockProducts;
        Storage.save(data);
    }
    
    // Update Cart Count
    Cart.updateCartUI();

    // Render Home Page Products if container exists
    const featuredContainer = document.querySelector('.product-grid');
    if (featuredContainer && document.querySelector('.hero')) { // Check if we are on home page
        // We might want to replace the static HTML with dynamic rendering here, 
        // but for now let's keep the static HTML as per the first step, 
        // or replace it to be consistent with data.js.
        // Let's replace it to be dynamic and consistent.
        const featured = data.products.filter(p => p.featured).slice(0, 4);
        // We need to adapt UI.createProductCard to match our Super Premium HTML structure
        // Or update our HTML structure to match UI.createProductCard output?
        // Better to adapt the rendering here.
        
        featuredContainer.innerHTML = featured.map(product => createPremiumProductCard(product)).join('');
    }

    // Render Shop Page Content
    if (document.getElementById('shop-products')) {
        initShopPage(data.products);
    }
}

function createPremiumProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image">
                <a href="product-detail.html?id=${product.id}" style="display: block; width: 100%; height: 100%;">
                    <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='https://placehold.co/600x400?text=No+Image'">
                </a>
                ${product.discount > 0 ? `<div class="badge sale">Sale</div>` : ''}
                ${product.isNew ? `<div class="badge new">Mới</div>` : ''}
                <button class="add-to-cart-btn" onclick="Cart.addItem(${product.id}, 1); UI.showToast('Đã thêm vào giỏ hàng');"><i class="fas fa-shopping-cart"></i> Thêm vào giỏ</button>
            </div>
            <div class="product-info">
                <div class="rating">
                    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    <span>(5.0)</span>
                </div>
                <h3 class="product-name"><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
                <div class="price-box">
                    <span class="current-price">${UI.formatPrice(product.price * (1 - (product.discount || 0)/100))}</span>
                    ${product.discount > 0 ? `<span class="old-price">${UI.formatPrice(product.price)}</span>` : ''}
                </div>
            </div>
        </div>
    `;
}

function initShopPage(products) {
    const container = document.getElementById('shop-products');
    const countEl = document.getElementById('product-count');
    const emptyState = document.getElementById('empty-state');
    const categoryContainer = document.getElementById('category-filters');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const sortSelect = document.getElementById('sort-select');
    const paginationContainer = document.getElementById('pagination');

    let currentCategory = 'all';
    let maxPrice = 2000000;
    let sortBy = 'default';
    let currentPage = 1;
    const itemsPerPage = 9;

    // Extract unique categories
    const categories = [...new Set(products.map(p => p.category))];
    
    // Render Category Filters
    categoryContainer.innerHTML = `
        <label>
            <input type="radio" name="category" value="all" checked>
            <span>Tất cả</span>
        </label>
    `;
    
    categories.forEach(cat => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="radio" name="category" value="${cat}">
            <span>${cat}</span>
        `;
        categoryContainer.appendChild(label);
    });

    // Filter Function
    const filterProducts = () => {
        let filtered = products.filter(p => {
            const matchCat = currentCategory === 'all' || p.category === currentCategory;
            const matchPrice = p.price <= maxPrice;
            return matchCat && matchPrice;
        });

        // Sort
        if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'name') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        // Pagination Logic
        const totalItems = filtered.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        if (currentPage > totalPages) currentPage = 1;
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = filtered.slice(startIndex, endIndex);

        // Render Products
        countEl.textContent = totalItems;
        if (paginatedItems.length > 0) {
            container.innerHTML = paginatedItems.map(p => createPremiumProductCard(p)).join('');
            container.classList.remove('hidden');
            if(emptyState) emptyState.style.display = 'none';
        } else {
            container.innerHTML = '';
            if(emptyState) emptyState.style.display = 'block';
        }

        // Render Pagination
        renderPagination(totalPages);
    };

    const renderPagination = (totalPages) => {
        if (!paginationContainer) return;
        
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }

        let html = '';
        
        // Prev Button
        html += `
            <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        `;

        // Page Numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                html += `<button class="active">${i}</button>`;
            } else {
                html += `<button onclick="changePage(${i})">${i}</button>`;
            }
        }

        // Next Button
        html += `
            <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;

        paginationContainer.innerHTML = html;
    };

    // Expose changePage globally
    window.changePage = (page) => {
        currentPage = page;
        filterProducts();
        document.getElementById('shop-products').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Event Listeners
    categoryContainer.addEventListener('change', (e) => {
        if (e.target.name === 'category') {
            currentCategory = e.target.value;
            currentPage = 1;
            filterProducts();
        }
    });

    priceRange.addEventListener('input', (e) => {
        maxPrice = parseInt(e.target.value);
        priceValue.textContent = UI.formatPrice(maxPrice);
        currentPage = 1;
        filterProducts();
    });

    sortSelect.addEventListener('change', (e) => {
        sortBy = e.target.value;
        currentPage = 1;
        filterProducts();
    });

    // Initial Render
    filterProducts();
}

function initProductPage(products) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = products.find(p => p.id === id);

    if (!product) {
        window.location.href = 'products.html';
        return;
    }

    // Update UI
    document.title = `${product.name} - Super Premium Store`;
    document.getElementById('breadcrumb-name').textContent = product.name;
    
    const img = document.getElementById('product-image');
    img.src = product.image;
    img.onerror = function() {
        this.onerror = null;
        this.src = 'https://placehold.co/600x400?text=No+Image';
    };

    document.getElementById('product-category').textContent = product.category;
    document.getElementById('product-name').textContent = product.name;
    
    // Price with Discount Logic
    const priceEl = document.getElementById('product-price');
    if (product.discount > 0) {
        const discountedPrice = product.price * (1 - product.discount / 100);
        priceEl.innerHTML = `
            <span class="text-red-500 mr-2">${UI.formatPrice(discountedPrice)}</span>
            <span class="text-gray-400 line-through text-xl" style="font-size: 1.2rem; color: #999; text-decoration: line-through;">${UI.formatPrice(product.price)}</span>
        `;
    } else {
        priceEl.textContent = UI.formatPrice(product.price);
    }

    document.getElementById('product-description').textContent = product.description || "Mô tả đang được cập nhật...";

    // Render Badges
    const badgesContainer = document.getElementById('product-badges');
    if (badgesContainer) {
        let badgesHtml = '';
        if (product.isHot) {
            badgesHtml += '<span class="badge sale" style="position: static; display: inline-block; margin-right: 5px;">HOT</span>';
        }
        if (product.discount > 0) {
            badgesHtml += `<span class="badge new" style="position: static; display: inline-block;">-${product.discount}%</span>`;
        }
        badgesContainer.innerHTML = badgesHtml;
    }

    // Add to Cart Listener
    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        const qty = parseInt(document.getElementById('qty-input').value);
        Cart.addItem(product.id, qty);
        UI.showToast('Đã thêm vào giỏ hàng thành công!');
    });
}

// Auth Page Logic
window.switchAuth = function(type) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabs = document.querySelectorAll('.auth-tab');

    if (type === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
};

function initCartPage(products) {
    const container = document.getElementById('cart-items');
    const emptyState = document.getElementById('cart-empty');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    const cartItems = Cart.getCart();

    if (cartItems.length === 0) {
        container.innerHTML = '';
        container.classList.add('hidden');
        if(emptyState) emptyState.style.display = 'block';
        subtotalEl.textContent = '0₫';
        totalEl.textContent = '0₫';
        checkoutBtn.classList.add('disabled');
        checkoutBtn.style.pointerEvents = 'none';
        checkoutBtn.style.opacity = '0.5';
        return;
    }

    container.classList.remove('hidden');
    if(emptyState) emptyState.style.display = 'none';
    checkoutBtn.classList.remove('disabled');
    checkoutBtn.style.pointerEvents = 'auto';
    checkoutBtn.style.opacity = '1';

    // Render Items
    container.innerHTML = cartItems.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return '';
        
        return `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='https://placehold.co/600x400?text=No+Image'">
                </div>
                
                <div class="cart-item-details">
                    <h3 class="cart-item-title"><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
                    <p class="text-sm text-gray-500">${product.category}</p>
                    <div class="cart-item-price">${UI.formatPrice(product.price)}</div>
                </div>

                <div class="cart-item-actions">
                    <div class="quantity-selector">
                        <button onclick="Cart.updateQuantity(${product.id}, ${item.quantity - 1})">-</button>
                        <input type="text" value="${item.quantity}" readonly>
                        <button onclick="Cart.updateQuantity(${product.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button onclick="Cart.removeItem(${product.id})" class="text-red-500 hover:text-red-700">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Update Totals
    const total = Cart.getTotalPrice();
    subtotalEl.textContent = UI.formatPrice(total);
    totalEl.textContent = UI.formatPrice(total);
}

// Ensure initCartPage is called in initializeApp
// We need to modify initializeApp to include this call if we are on the cart page
// But wait, initializeApp is already defined. We should modify it or add the call inside it.
// Let's modify initializeApp in the previous block or just add the check here.
// Actually, I can just add the check at the end of the file or modify initializeApp.
// Modifying initializeApp is cleaner but requires finding it again.
// I'll add a listener for 'cart-updated' to re-render the cart page if it exists.
window.addEventListener('cart-updated', () => {
    if (document.getElementById('cart-items')) {
        const data = Storage.get();
        initCartPage(data.products);
    }
});

// Also call it on load if element exists
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-items')) {
        const data = Storage.get();
        initCartPage(data.products);
    }
    if (document.getElementById('checkout-items')) {
        const data = Storage.get();
        initCheckoutPage(data.products);
    }
    if (document.getElementById('product-name')) {
        const data = Storage.get();
        initProductPage(data.products);
    }
});

function initCheckoutPage(products) {
    const itemsContainer = document.getElementById('checkout-items');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const totalEl = document.getElementById('checkout-total');
    
    const cartItems = Cart.getCart();
    
    if (cartItems.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    // Render Items Summary
    itemsContainer.innerHTML = cartItems.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return '';
        return `
            <div class="checkout-item">
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='https://placehold.co/600x400?text=No+Image'">
                <div class="checkout-item-info">
                    <h4>${product.name}</h4>
                    <p>Số lượng: ${item.quantity}</p>
                    <p class="font-bold text-primary">${UI.formatPrice(product.price * item.quantity)}</p>
                </div>
            </div>
        `;
    }).join('');

    // Update Totals
    const total = Cart.getTotalPrice();
    subtotalEl.textContent = UI.formatPrice(total);
    totalEl.textContent = UI.formatPrice(total);

    // Expose placeOrder globally for the button
    window.placeOrder = function() {
        const form = document.getElementById('checkout-form');
        if (form.checkValidity()) {
            // Simulate processing
            const btn = document.querySelector('button[onclick="placeOrder()"]');
            const originalText = btn.innerText;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
            btn.disabled = true;

            setTimeout(() => {
                // Create Order Object
                const cartItems = Cart.getCart();
                const total = Cart.getTotalPrice();
                const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000); // Random ID
                const date = new Date().toLocaleDateString('vi-VN');
                
                const newOrder = {
                    id: orderId,
                    date: date,
                    status: 'Đang xử lý',
                    total: total,
                    items: cartItems
                };

                // Save to User's History (Mocking User ID 1)
                const data = Storage.get();
                if (data.users && data.users.length > 0) {
                    // Find User (ID 1)
                    const userIndex = data.users.findIndex(u => u.id === 1);
                    if (userIndex !== -1) {
                        if (!data.users[userIndex].orders) {
                            data.users[userIndex].orders = [];
                        }
                        data.users[userIndex].orders.unshift(newOrder); // Add to top
                        Storage.save(data);
                    }
                }

                Cart.clearCart();
                document.getElementById('success-modal').style.display = 'flex';
                document.getElementById('success-modal').classList.remove('hidden');
            }, 1500);
        } else {
            form.reportValidity();
        }
    };
}



// Add CSS for fade-in-section dynamically
const style = document.createElement('style');
style.innerHTML = `
    .fade-in-section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
`;
document.head.appendChild(style);

// Profile Page Logic
window.switchProfileTab = function(tabId) {
    // Update Nav
    document.querySelectorAll('.profile-nav-item').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`.profile-nav-item[onclick="switchProfileTab('${tabId}')"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Update Content
    document.querySelectorAll('.profile-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`tab-${tabId}`).classList.add('active');
};

window.login = function(email, password) {
    const data = Storage.get();
    const user = data.users.find(u => u.email === email && u.password === password);
    
    if (user) {
        data.currentUser = user;
        Storage.save(data);
        UI.showToast('Đăng nhập thành công!');
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 1000);
    } else {
        alert('Email hoặc mật khẩu không đúng!');
    }
};

window.loginAsDemoUser = function() {
    const data = Storage.get();
    let demoUser = data.users.find(u => u.email === 'demo@luxe.com');

    if (!demoUser) {
        // Create Demo User if not exists (handling stale localStorage)
        demoUser = {
            id: 999,
            name: "Nguyễn Văn A",
            email: "demo@luxe.com",
            phone: "0912345678",
            password: "password",
            orders: [
                {
                    id: "ORD-9999",
                    date: "10/12/2023",
                    status: "Đã giao hàng",
                    total: 4500000,
                    items: [
                        { productId: 1, quantity: 1 },
                        { productId: 2, quantity: 2 }
                    ]
                },
                {
                    id: "ORD-8888",
                    date: "05/11/2023",
                    status: "Đang vận chuyển",
                    total: 1200000,
                    items: [
                        { productId: 3, quantity: 1 }
                    ]
                }
            ]
        };
        if (!data.users) data.users = [];
        data.users.push(demoUser);
        Storage.save(data);
    }

    login('demo@luxe.com', 'password');
};

window.logout = function() {
    const data = Storage.get();
    data.currentUser = null;
    Storage.save(data);
    UI.showToast('Đăng xuất thành công!');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
};

function checkAuth() {
    const data = Storage.get();
    const currentUser = data.currentUser;
    const currentPath = window.location.pathname;

    // Update Header User Icon
    const userIcon = document.querySelector('.user-icon');
    if (userIcon) {
        if (currentUser) {
            userIcon.href = 'profile.html';
            // Optional: Add active class if on profile page
            if (currentPath.includes('profile.html')) {
                userIcon.classList.add('active');
            }
        } else {
            userIcon.href = 'login.html';
        }
    }

    // Redirect if on login page and logged in
    if (currentPath.includes('login.html') && currentUser) {
        window.location.href = 'profile.html';
    }

    // Redirect if on profile page and not logged in
    if (currentPath.includes('profile.html') && !currentUser) {
        window.location.href = 'login.html';
    }
}

function initProfilePage() {
    const data = Storage.get();
    const user = data.currentUser;

    if (!user) return;

    // Populate User Info
    document.getElementById('sidebar-username').textContent = user.name;
    document.getElementById('sidebar-email').textContent = user.email;
    
    // Populate Form
    const form = document.getElementById('profile-form');
    if (form) {
        const inputs = form.querySelectorAll('input');
        if (inputs.length >= 3) {
            inputs[0].value = user.name;
            inputs[1].value = user.email;
            inputs[2].value = user.phone;
        }
    }

    // Populate Orders
    const ordersList = document.getElementById('orders-list');
    if (user.orders && user.orders.length > 0) {
        ordersList.innerHTML = user.orders.map(order => {
            // Calculate total items
            const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
            
            // Get first item image for preview
            const firstItem = order.items[0];
            const product = data.products.find(p => p.id === firstItem.productId);
            const image = product ? product.image : 'https://placehold.co/600x400?text=No+Image';

            // Determine status class
            let statusClass = 'processing';
            if (order.status === 'Đã giao hàng') statusClass = 'delivered';
            else if (order.status === 'Đang vận chuyển') statusClass = 'shipped';
            else if (order.status === 'Đã hủy') statusClass = 'cancelled';

            return `
                <div class="order-card">
                    <div class="order-header">
                        <div>
                            <span class="order-id">#${order.id}</span>
                            <span class="order-date">${order.date}</span>
                        </div>
                        <span class="order-status ${statusClass}">${order.status}</span>
                    </div>
                    <div class="order-body">
                        <div class="order-items">
                            ${order.items.map(item => {
                                const p = data.products.find(prod => prod.id === item.productId);
                                if (!p) return '';
                                return `
                                    <div class="order-item">
                                        <img src="${p.image}" alt="${p.name}" onerror="this.onerror=null; this.src='https://placehold.co/600x400?text=No+Image'">
                                        <div class="order-item-info">
                                            <div class="order-item-name">${p.name}</div>
                                            <div class="order-item-meta">Số lượng: ${item.quantity} | ${UI.formatPrice(p.price)}</div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                        <div class="order-footer">
                            <div class="order-total">
                                Tổng cộng: <span>${UI.formatPrice(order.total)}</span>
                            </div>
                            <button class="btn btn-outline btn-sm">Xem Chi Tiết</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } else {
        // Keep empty state
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    if (document.getElementById('profile-form')) {
        initProfilePage();
    }
});
