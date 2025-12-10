/**
 * Main Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('LuxeMarket App Initialized');
    
    // Initialize Data if empty
    initializeApp();

    // Initialize Cart UI
    Cart.updateCartUI();

    // Initialize Mobile Menu
    initMobileMenu();
});

function initializeApp() {
    const data = Storage.get();
    
    // Always sync products from data.js to ensure updates (like new tags) are reflected
    // In a real app, this would be an API call.
    if (window.mockProducts && window.mockProducts.length > 0) {
        console.log('Syncing products from data.js...');
        data.products = window.mockProducts;
        Storage.save(data);
    } else if (!data.products || data.products.length === 0) {
        // Fallback if window.mockProducts is missing (shouldn't happen)
        console.log('Seeding initial products...');
        data.products = window.mockProducts || [];
        Storage.save(data);
    }

    // Sync Users
    if (window.mockUsers && window.mockUsers.length > 0) {
        console.log('Syncing users from data.js...');
        data.users = window.mockUsers;
        Storage.save(data);
    }
    
    // Render Home Page Content
    renderHomePage(data.products);
    renderCategories(data.products);

    // Render Shop Page Content
    if (document.getElementById('shop-products')) {
        initShopPage(data.products);
    }

    // Render Product Detail Page
    if (document.getElementById('product-name')) {
        initProductPage(data.products);
    }

    // Render Cart Page
    if (document.getElementById('cart-items')) {
        initCartPage(data.products);
        // Listen for cart updates to re-render
        window.addEventListener('cart-updated', () => initCartPage(data.products));
    }

    // Render Checkout Page
    if (document.getElementById('checkout-form')) {
        initCheckoutPage(data.products);
    }

    // Render Profile Page
    if (document.getElementById('order-history-body')) {
        initProfilePage(data.products);
    }
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.classList.remove('translate-x-full');
        });
    }

    if (closeBtn && menu) {
        closeBtn.addEventListener('click', () => {
            menu.classList.add('translate-x-full');
        });
    }
}

function renderHomePage(products) {
    const featuredContainer = document.getElementById('featured-products');
    if (featuredContainer) {
        // Get featured products (limit 4)
        const featured = products.filter(p => p.featured).slice(0, 4);
        featuredContainer.innerHTML = featured.map(product => UI.createProductCard(product)).join('');
    }
}

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
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden flex-shrink-0">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-bold text-primary truncate">${product.name}</h4>
                    <p class="text-xs text-gray-500">Qty: ${item.quantity}</p>
                </div>
                <div class="text-sm font-bold text-primary">${UI.formatPrice(product.price * item.quantity)}</div>
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
            btn.innerHTML = '<i class="ph ph-spinner animate-spin text-xl"></i> Processing...';
            btn.disabled = true;

            setTimeout(() => {
                // Create Order Object
                const cartItems = Cart.getCart();
                const total = Cart.getTotalPrice();
                const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000); // Random ID
                const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                
                const newOrder = {
                    id: orderId,
                    date: date,
                    status: 'Processing',
                    total: total,
                    items: cartItems
                };

                // Save to User's History (Mocking User ID 1)
                const data = Storage.get();
                if (data.users && data.users.length > 0) {
                    // Find John Doe (ID 1)
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
                document.getElementById('success-modal').classList.remove('hidden');
            }, 1500);
        } else {
            form.reportValidity();
        }
    };
}

function initProfilePage(products) {
    const orderContainer = document.getElementById('order-history-body');
    if (!orderContainer) return;

    const data = Storage.get();
    // Default to User 1 (John Doe)
    const user = data.users ? data.users.find(u => u.id === 1) : null;

    if (!user || !user.orders || user.orders.length === 0) {
        orderContainer.innerHTML = `
            <tr>
                <td colspan="5" class="py-8 text-center text-gray-500">No orders found.</td>
            </tr>
        `;
        return;
    }

    // Check if Luxury Template
    const isLuxury = window.location.href.includes('luxury-template') || document.body.classList.contains('bg-dark');

    // Tab Switching Logic
    const navAccount = document.getElementById('nav-account');
    const navOrders = document.getElementById('nav-orders');
    const sectionAccount = document.getElementById('section-account');
    const sectionOrders = document.getElementById('section-orders');

    if (navAccount && navOrders && sectionAccount && sectionOrders) {
        navAccount.addEventListener('click', (e) => {
            e.preventDefault();
            // Update Active State
            if (isLuxury) {
                navAccount.className = 'flex items-center gap-4 px-4 py-4 bg-white/5 text-gold border-l-2 border-gold transition-all';
                navOrders.className = 'flex items-center gap-4 px-4 py-4 text-gray-400 hover:text-white hover:bg-white/5 transition-all border-l-2 border-transparent hover:border-white/20';
            } else {
                navAccount.className = 'flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-xl font-medium transition-colors';
                navOrders.className = 'flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors';
            }
            // Show Section
            sectionAccount.classList.remove('hidden');
            sectionOrders.classList.add('hidden');
        });

        navOrders.addEventListener('click', (e) => {
            e.preventDefault();
            // Update Active State
            if (isLuxury) {
                navOrders.className = 'flex items-center gap-4 px-4 py-4 bg-white/5 text-gold border-l-2 border-gold transition-all';
                navAccount.className = 'flex items-center gap-4 px-4 py-4 text-gray-400 hover:text-white hover:bg-white/5 transition-all border-l-2 border-transparent hover:border-white/20';
            } else {
                navOrders.className = 'flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-xl font-medium transition-colors';
                navAccount.className = 'flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors';
            }
            // Show Section
            sectionOrders.classList.remove('hidden');
            sectionAccount.classList.add('hidden');
        });
    }

    orderContainer.innerHTML = user.orders.map(order => {
        if (isLuxury) {
            // Luxury Template Row
            let statusColor = 'text-blue-400';
            if (order.status === 'Delivered') statusColor = 'text-green-400';
            if (order.status === 'Cancelled') statusColor = 'text-red-400';

            return `
                <tr class="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                    <td class="py-6 font-serif text-white">#${order.id}</td>
                    <td class="py-6 text-gray-400">${order.date}</td>
                    <td class="py-6"><span class="text-xs uppercase tracking-wider ${statusColor}">${order.status}</span></td>
                    <td class="py-6 font-serif text-white">${UI.formatPrice(order.total)}</td>
                    <td class="py-6 text-right"><button class="text-gold hover:text-white transition-colors text-xs uppercase tracking-widest">Details</button></td>
                </tr>
            `;
        } else {
            // Standard Template Row
            let statusClass = 'bg-blue-100 text-blue-600';
            if (order.status === 'Delivered') statusClass = 'bg-green-100 text-green-600';
            if (order.status === 'Cancelled') statusClass = 'bg-red-100 text-red-600';

            return `
                <tr class="border-b border-gray-50 group hover:bg-gray-50 transition-colors">
                    <td class="py-4 font-bold text-primary">#${order.id}</td>
                    <td class="py-4 text-gray-500">${order.date}</td>
                    <td class="py-4"><span class="px-3 py-1 ${statusClass} rounded-full text-xs font-bold">${order.status}</span></td>
                    <td class="py-4 font-bold text-primary">${UI.formatPrice(order.total)}</td>
                    <td class="py-4"><button class="text-accent font-bold hover:underline">View</button></td>
                </tr>
            `;
        }
    }).join('');
}

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
        emptyState.classList.remove('hidden');
        subtotalEl.textContent = '$0.00';
        totalEl.textContent = '$0.00';
        checkoutBtn.classList.add('opacity-50', 'pointer-events-none');
        return;
    }

    container.classList.remove('hidden');
    emptyState.classList.add('hidden');
    checkoutBtn.classList.remove('opacity-50', 'pointer-events-none');

    // Render Items
    container.innerHTML = cartItems.map(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return '';
        
        return `
            <div class="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div class="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                </div>
                
                <div class="flex-1 text-center sm:text-left">
                    <h3 class="font-bold text-primary mb-1">${product.name}</h3>
                    <p class="text-sm text-gray-500 mb-2">${product.category}</p>
                    <div class="font-bold text-accent">${UI.formatPrice(product.price)}</div>
                </div>

                <div class="flex items-center gap-4">
                    <div class="flex items-center border border-gray-200 rounded-lg">
                        <button onclick="Cart.updateQuantity(${product.id}, ${item.quantity - 1})" class="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-500 transition-colors"><i class="ph ph-minus"></i></button>
                        <span class="w-10 text-center text-sm font-bold text-primary">${item.quantity}</span>
                        <button onclick="Cart.updateQuantity(${product.id}, ${item.quantity + 1})" class="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-500 transition-colors"><i class="ph ph-plus"></i></button>
                    </div>
                    <button onclick="Cart.removeItem(${product.id})" class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50">
                        <i class="ph ph-trash text-lg"></i>
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

function initProductPage(products) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = products.find(p => p.id === id);

    if (!product) {
        window.location.href = 'shop.html';
        return;
    }

    // Update UI
    document.title = `${product.name} - LuxeMarket`;
    document.getElementById('breadcrumb-name').textContent = product.name;
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-category').textContent = product.category;
    document.getElementById('product-name').textContent = product.name;
    
    // Price with Discount Logic
    const priceEl = document.getElementById('product-price');
    if (product.discount > 0) {
        const discountedPrice = product.price * (1 - product.discount / 100);
        priceEl.innerHTML = `
            <span class="text-red-500 mr-2">${UI.formatPrice(discountedPrice)}</span>
            <span class="text-gray-400 line-through text-xl">${UI.formatPrice(product.price)}</span>
        `;
    } else {
        priceEl.textContent = UI.formatPrice(product.price);
    }

    document.getElementById('product-description').textContent = product.description;

    // Render Badges
    const badgesContainer = document.getElementById('product-badges');
    if (badgesContainer) {
        let badgesHtml = '';
        if (product.isHot) {
            // Check if we are in Luxury Template
            const isLuxury = window.location.href.includes('luxury-template') || document.body.classList.contains('bg-dark');
            if (isLuxury) {
                badgesHtml += '<span class="text-[10px] uppercase tracking-widest text-white bg-red-600 px-2 py-1 font-bold">Hot</span>';
            } else {
                badgesHtml += '<span class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1"><i class="ph-fill ph-fire"></i> HOT</span>';
            }
        }
        if (product.discount > 0) {
            const isLuxury = window.location.href.includes('luxury-template') || document.body.classList.contains('bg-dark');
            if (isLuxury) {
                badgesHtml += `<span class="text-[10px] uppercase tracking-widest text-dark bg-gold px-2 py-1 font-bold">-${product.discount}%</span>`;
            } else {
                badgesHtml += `<span class="bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">-${product.discount}% OFF</span>`;
            }
        }
        badgesContainer.innerHTML = badgesHtml;
    }

    // Add to Cart Listener
    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        const qty = parseInt(document.getElementById('qty-input').value);
        Cart.addItem(product.id, qty);
    });
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
    let maxPrice = 500;
    let sortBy = 'default';
    let currentPage = 1;
    const itemsPerPage = 12;

    // Extract unique categories
    const categories = [...new Set(products.map(p => p.category))];
    
    // Render Category Filters
    // Clear existing to avoid duplicates if re-initialized
    if (categoryContainer) {
        categoryContainer.innerHTML = `
            <label class="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="category" value="all" checked class="w-4 h-4 text-accent border-gray-300 focus:ring-accent">
                <span class="text-gray-600 group-hover:text-primary transition-colors">All</span>
            </label>
        `;
        
        categories.forEach(cat => {
            const label = document.createElement('label');
            label.className = 'flex items-center gap-2 cursor-pointer group';
            label.innerHTML = `
                <input type="radio" name="category" value="${cat}" class="w-4 h-4 text-accent border-gray-300 focus:ring-accent">
                <span class="text-gray-600 group-hover:text-primary transition-colors">${cat}</span>
            `;
            categoryContainer.appendChild(label);
        });
    }

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
        
        // Ensure current page is valid
        if (currentPage > totalPages) currentPage = 1;
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = filtered.slice(startIndex, endIndex);

        // Render Products
        countEl.textContent = totalItems;
        if (paginatedItems.length > 0) {
            container.innerHTML = paginatedItems.map(p => UI.createProductCard(p)).join('');
            container.classList.remove('hidden');
            emptyState.classList.add('hidden');
        } else {
            container.classList.add('hidden');
            emptyState.classList.remove('hidden');
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
            <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} class="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <i class="ph ph-caret-left"></i>
            </button>
        `;

        // Page Numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                html += `
                    <button class="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold shadow-md">
                        ${i}
                    </button>
                `;
            } else {
                html += `
                    <button onclick="changePage(${i})" class="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                        ${i}
                    </button>
                `;
            }
        }

        // Next Button
        html += `
            <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} class="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <i class="ph ph-caret-right"></i>
            </button>
        `;

        paginationContainer.innerHTML = html;
    };

    // Expose changePage globally
    window.changePage = (page) => {
        currentPage = page;
        filterProducts();
        // Scroll to top of products
        document.getElementById('shop-products').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Event Listeners
    categoryContainer.addEventListener('change', (e) => {
        if (e.target.name === 'category') {
            currentCategory = e.target.value;
            currentPage = 1; // Reset to first page
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

function renderCategories(products) {
    const container = document.getElementById('home-categories');
    if (!container) return;

    const categories = [...new Set(products.map(p => p.category))];
    
    // Map categories to images (using the first product image of that category)
    const categoryData = categories.map(cat => {
        const product = products.find(p => p.category === cat);
        return {
            name: cat,
            image: product ? product.image : ''
        };
    });

    container.innerHTML = categoryData.map(cat => `
        <a href="shop.html?category=${cat.name}" class="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-sm hover:shadow-xl transition-all">
            <img src="${cat.image}" alt="${cat.name}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
            <div class="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
            <div class="absolute inset-0 flex items-center justify-center">
                <h3 class="text-2xl font-bold text-white tracking-wide group-hover:-translate-y-2 transition-transform duration-300">${cat.name}</h3>
                <span class="absolute opacity-0 group-hover:opacity-100 group-hover:translate-y-6 transition-all duration-300 text-white text-sm font-medium border-b border-white pb-1">Shop Now</span>
            </div>
        </a>
    `).join('');
}
