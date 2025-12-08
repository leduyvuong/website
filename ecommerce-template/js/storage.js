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
            users: [],
            cart: [],
            orders: []
        };
        this.save(initialData);
        return initialData;
    }
};
