/**
 * Storage Manager
 * Handles all interactions with localStorage
 */

const STORAGE_KEY = 'ecommerce_db';

const Storage = {
    get() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : this.initialize();
    },

    save(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    initialize() {
        const initialData = {
            products: [],
            cart: [],
            orders: [],
            currentUser: null,
            users: [
                {
                    id: 1,
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
                }
            ]
        };
        this.save(initialData);
        return initialData;
    }
};
