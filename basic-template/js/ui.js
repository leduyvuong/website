/**
 * UI Helper Functions
 */

const UI = {
    formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    },

    renderStars(rating = 5) {
        return Array(5).fill(0).map((_, i) => 
            `<i class="ph-fill ph-star ${i < rating ? 'text-yellow-400' : 'text-gray-300'}"></i>`
        ).join('');
    },

    createProductCard(product) {
        return `
            <div class="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full relative">
                <div class="relative overflow-hidden aspect-[4/5]">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        onerror="this.onerror=null; this.src='https://placehold.co/600x800?text=No+Image';">
                    
                    <!-- Badges -->
                    <div class="absolute top-3 left-3 flex flex-col gap-2">
                        ${product.isHot ? '<span class="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1"><i class="ph-fill ph-fire"></i> HOT</span>' : ''}
                        ${product.discount > 0 ? `<span class="bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">-${product.discount}%</span>` : ''}
                    </div>

                    <div class="absolute top-3 right-3">
                        <button class="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-white transition-all shadow-sm transform translate-x-12 group-hover:translate-x-0 duration-300">
                            <i class="ph ph-heart text-xl"></i>
                        </button>
                    </div>
                    <div class="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button onclick="Cart.addItem(${product.id})" class="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg flex items-center justify-center gap-2">
                            <i class="ph ph-shopping-bag"></i> Add to Cart
                        </button>
                    </div>
                </div>
                <div class="p-5 flex-1 flex flex-col">
                    <div class="text-xs text-accent font-semibold uppercase tracking-wider mb-2">${product.category}</div>
                    <h3 class="font-bold text-gray-900 mb-1 text-lg leading-tight group-hover:text-accent transition-colors">
                        <a href="product.html?id=${product.id}">${product.name}</a>
                    </h3>
                    <div class="flex items-center gap-1 text-sm mb-3">
                        ${this.renderStars(5)} <span class="text-gray-400 ml-1">(24)</span>
                    </div>
                    <div class="mt-auto flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <span class="text-xl font-bold text-primary">${this.formatPrice(product.price * (1 - (product.discount || 0)/100))}</span>
                            ${product.discount > 0 ? `<span class="text-sm text-gray-400 line-through">${this.formatPrice(product.price)}</span>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};
