/**
 * Mock Data for LuxeMarket
 */

const products = [
    // Accessories
    {
        id: 1,
        name: "Minimalist Leather Watch",
        price: 149.00,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        description: "A premium leather watch with a minimalist dial. Perfect for any occasion.",
        featured: true,
        isHot: true,
        discount: 0
    },
    {
        id: 4,
        name: "Designer Sunglasses",
        price: 120.00,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
        description: "Protect your eyes in style with these designer frames.",
        featured: true,
        isHot: false,
        discount: 20
    },
    {
        id: 9,
        name: "Silk Scarf",
        price: 85.00,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=600&q=80",
        description: "Elegant silk scarf with a timeless pattern.",
        featured: false,
        isHot: false,
        discount: 0
    },
    {
        id: 10,
        name: "Leather Wallet",
        price: 65.00,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1517254797898-04ecd2529395?auto=format&fit=crop&w=600&q=80",
        description: "Handcrafted leather wallet with RFID protection.",
        featured: false,
        isHot: false,
        discount: 0
    },
    {
        id: 11,
        name: "Gold Plated Necklace",
        price: 180.00,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=600&q=80",
        description: "Delicate gold plated necklace for a touch of luxury.",
        featured: true,
        isHot: true,
        discount: 0
    },
    {
        id: 12,
        name: "Classic Fedora Hat",
        price: 55.00,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1533827432537-70133748f5c8?auto=format&fit=crop&w=600&q=80",
        description: "Stylish fedora hat to complete your look.",
        featured: false,
        isHot: false,
        discount: 10
    },

    // Electronics
    {
        id: 2,
        name: "Premium Noise-Cancelling Headphones",
        price: 299.00,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        description: "Experience silence with our top-tier noise-cancelling headphones.",
        featured: true,
        isHot: false,
        discount: 15
    },
    {
        id: 5,
        name: "Smart Fitness Tracker",
        price: 89.00,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80",
        description: "Track your health and fitness goals with precision.",
        featured: false,
        isHot: false,
        discount: 0
    },
    {
        id: 8,
        name: "Wireless Charging Pad",
        price: 29.00,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1586810165616-94c631fc2f79?auto=format&fit=crop&w=600&q=80",
        description: "Fast and convenient wireless charging for all your devices.",
        featured: false,
        isHot: true,
        discount: 5
    },
    {
        id: 13,
        name: "Bluetooth Speaker",
        price: 129.00,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
        description: "Portable speaker with 360-degree sound.",
        featured: false,
        isHot: true,
        discount: 0
    },
    {
        id: 14,
        name: "4K Action Camera",
        price: 249.00,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
        description: "Capture your adventures in stunning 4K resolution.",
        featured: false,
        isHot: false,
        discount: 0
    },
    {
        id: 15,
        name: "Mechanical Keyboard",
        price: 159.00,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80",
        description: "Tactile mechanical keyboard for productivity and gaming.",
        featured: false,
        isHot: false,
        discount: 10
    },

    // Clothing
    {
        id: 3,
        name: "Organic Cotton T-Shirt",
        price: 35.00,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
        description: "Soft, breathable, and sustainable. 100% organic cotton.",
        featured: false,
        isHot: true,
        discount: 0
    },
    {
        id: 16,
        name: "Denim Jacket",
        price: 89.00,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=600&q=80",
        description: "Classic denim jacket that never goes out of style.",
        featured: true,
        isHot: false,
        discount: 0
    },
    {
        id: 17,
        name: "Cashmere Sweater",
        price: 199.00,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80",
        description: "Luxuriously soft cashmere sweater for winter.",
        featured: false,
        isHot: false,
        discount: 0
    },
    {
        id: 18,
        name: "Summer Linen Dress",
        price: 110.00,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1596783439305-d8b07e16071d?auto=format&fit=crop&w=600&q=80",
        description: "Breezy linen dress perfect for hot summer days.",
        featured: false,
        isHot: true,
        discount: 20
    },
    {
        id: 19,
        name: "Slim Fit Chinos",
        price: 65.00,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80",
        description: "Versatile chinos that work for office and casual wear.",
        featured: false,
        isHot: false,
        discount: 0
    },
    {
        id: 20,
        name: "Wool Overcoat",
        price: 299.00,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
        description: "Elegant wool overcoat to keep you warm and stylish.",
        featured: true,
        isHot: false,
        discount: 0
    },

    // Travel
    {
        id: 6,
        name: "Leather Weekend Bag",
        price: 249.00,
        category: "Travel",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
        description: "The perfect companion for your weekend getaways.",
        featured: true,
        isHot: true,
        discount: 10
    },
    {
        id: 21,
        name: "Hardshell Carry-On",
        price: 180.00,
        category: "Travel",
        image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=600&q=80",
        description: "Durable hardshell suitcase for frequent flyers.",
        featured: false,
        isHot: false,
        discount: 0
    },
    {
        id: 22,
        name: "Travel Toiletry Bag",
        price: 45.00,
        category: "Travel",
        image: "https://images.unsplash.com/photo-1585909696016-3987034c4425?auto=format&fit=crop&w=600&q=80",
        description: "Organize your essentials with this water-resistant bag.",
        featured: false,
        isHot: false,
        discount: 0
    },
    {
        id: 23,
        name: "Passport Holder",
        price: 35.00,
        category: "Travel",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
        description: "Leather passport holder with card slots.",
        featured: false,
        isHot: false,
        discount: 0
    },
    {
        id: 24,
        name: "Travel Neck Pillow",
        price: 25.00,
        category: "Travel",
        image: "https://images.unsplash.com/photo-1520962889616-a598612af60b?auto=format&fit=crop&w=600&q=80",
        description: "Memory foam neck pillow for comfortable flights.",
        featured: false,
        isHot: false,
        discount: 0
    },

    // Home
    {
        id: 7,
        name: "Ceramic Coffee Mug Set",
        price: 45.00,
        category: "Home",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80",
        description: "Handcrafted ceramic mugs for your morning brew.",
        featured: false,
        isHot: false,
        discount: 0
    },
    {
        id: 25,
        name: "Scented Soy Candle",
        price: 32.00,
        category: "Home",
        image: "https://images.unsplash.com/photo-1602825389660-3f574932798c?auto=format&fit=crop&w=600&q=80",
        description: "Relaxing lavender scented soy candle.",
        featured: false,
        isHot: true,
        discount: 0
    },
    {
        id: 26,
        name: "Linen Throw Pillow",
        price: 40.00,
        category: "Home",
        image: "https://images.unsplash.com/photo-1579656381226-5fc70ac1698a?auto=format&fit=crop&w=600&q=80",
        description: "Soft linen throw pillow for your sofa.",
        featured: false,
        isHot: false,
        discount: 0
    },
    {
        id: 27,
        name: "Modern Table Lamp",
        price: 120.00,
        category: "Home",
        image: "https://images.unsplash.com/photo-1507473888900-52e1adad5452?auto=format&fit=crop&w=600&q=80",
        description: "Minimalist table lamp with warm light.",
        featured: true,
        isHot: false,
        discount: 15
    },
    {
        id: 28,
        name: "Succulent Plant Set",
        price: 35.00,
        category: "Home",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
        description: "Set of 3 easy-care succulent plants.",
        featured: false,
        isHot: false,
        discount: 0
    },
    {
        id: 29,
        name: "Woven Wall Hanging",
        price: 75.00,
        category: "Home",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
        description: "Boho style woven wall hanging for your bedroom.",
        featured: false,
        isHot: false,
        discount: 0
    },

    // Beauty
    {
        id: 30,
        name: "Organic Face Serum",
        price: 68.00,
        category: "Beauty",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
        description: "Rejuvenating organic face serum with Vitamin C.",
        featured: true,
        isHot: true,
        discount: 0
    },
    {
        id: 31,
        name: "Matte Lipstick Set",
        price: 45.00,
        category: "Beauty",
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
        description: "Set of 3 long-lasting matte lipsticks.",
        featured: false,
        isHot: false,
        discount: 0
    },
    {
        id: 32,
        name: "Hydrating Face Mask",
        price: 25.00,
        category: "Beauty",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=600&q=80",
        description: "Deeply hydrating sheet mask for glowing skin.",
        featured: false,
        isHot: false,
        discount: 10
    },
    {
        id: 33,
        name: "Luxury Perfume",
        price: 150.00,
        category: "Beauty",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
        description: "Signature scent with notes of jasmine and sandalwood.",
        featured: true,
        isHot: false,
        discount: 0
    },
    {
        id: 34,
        name: "Bamboo Hairbrush",
        price: 20.00,
        category: "Beauty",
        image: "https://images.unsplash.com/photo-1590159763121-7c9fd312190d?auto=format&fit=crop&w=600&q=80",
        description: "Eco-friendly bamboo hairbrush for all hair types.",
        featured: false,
        isHot: false,
        discount: 0
    },

    // Shoes
    {
        id: 35,
        name: "Leather Loafers",
        price: 160.00,
        category: "Shoes",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80",
        description: "Classic leather loafers for formal occasions.",
        featured: false,
        isHot: false,
        discount: 0
    },
    {
        id: 36,
        name: "Running Sneakers",
        price: 120.00,
        category: "Shoes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
        description: "Lightweight running sneakers with high cushioning.",
        featured: true,
        isHot: true,
        discount: 0
    },
    {
        id: 37,
        name: "Canvas Slip-Ons",
        price: 55.00,
        category: "Shoes",
        image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=600&q=80",
        description: "Casual canvas slip-ons for everyday wear.",
        featured: false,
        isHot: false,
        discount: 15
    },
    {
        id: 38,
        name: "Suede Boots",
        price: 180.00,
        category: "Shoes",
        image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=600&q=80",
        description: "Stylish suede boots for the fall season.",
        featured: false,
        isHot: false,
        discount: 0
    },
    {
        id: 39,
        name: "High Heels",
        price: 130.00,
        category: "Shoes",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
        description: "Elegant high heels for evening wear.",
        featured: false,
        isHot: false,
        discount: 0
    },
    {
        id: 40,
        name: "Hiking Boots",
        price: 190.00,
        category: "Shoes",
        image: "https://images.unsplash.com/photo-1542840410-3092f4742370?auto=format&fit=crop&w=600&q=80",
        description: "Rugged hiking boots for outdoor adventures.",
        featured: false,
        isHot: true,
        discount: 0
    }
];

// Export for use in other files (if using modules) or just global
window.mockProducts = products;
