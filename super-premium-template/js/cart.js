/**
 * Cart Logic
 */

const Cart = {
    getCart() {
        const data = Storage.get();
        return data.cart || [];
    },

    addItem(productId, quantity = 1) {
        const data = Storage.get();
        const cart = data.cart;
        const existingItemIndex = cart.findIndex(item => item.productId === productId);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({ productId, quantity });
        }

        data.cart = cart;
        Storage.save(data);
        this.updateCartUI();
        this.showNotification('Item added to cart');
    },

    removeItem(productId) {
        const data = Storage.get();
        data.cart = data.cart.filter(item => item.productId !== productId);
        Storage.save(data);
        this.updateCartUI();
    },

    updateQuantity(productId, quantity) {
        const data = Storage.get();
        const cart = data.cart;
        const item = cart.find(item => item.productId === productId);

        if (item) {
            item.quantity = parseInt(quantity);
            if (item.quantity <= 0) {
                this.removeItem(productId);
                return;
            }
        }

        data.cart = cart;
        Storage.save(data);
        this.updateCartUI();
    },

    clearCart() {
        const data = Storage.get();
        data.cart = [];
        Storage.save(data);
        this.updateCartUI();
    },

    getTotalItems() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    },

    getTotalPrice() {
        const cart = this.getCart();
        const products = Storage.get().products;
        return cart.reduce((total, item) => {
            const product = products.find(p => p.id === item.productId);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    },

    updateCartUI() {
        // Update badge
        const count = this.getTotalItems();
        const badge = document.getElementById('cart-count');
        if (badge) {
            badge.textContent = count;
            if (count > 0) {
                badge.classList.remove('scale-0');
            } else {
                badge.classList.add('scale-0');
            }
        }
        
        // Dispatch event for other components to listen
        window.dispatchEvent(new CustomEvent('cart-updated'));
    },

    showNotification(message) {
        // Simple toast notification
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 right-4 bg-primary text-white px-6 py-3 rounded-lg shadow-lg transform translate-y-10 opacity-0 transition-all duration-300 z-50 flex items-center gap-2';
        toast.innerHTML = `<i class="ph ph-check-circle text-xl text-green-400"></i> <span>${message}</span>`;
        document.body.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-10', 'opacity-0');
        });

        // Remove after 3s
        setTimeout(() => {
            toast.classList.add('translate-y-10', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};
