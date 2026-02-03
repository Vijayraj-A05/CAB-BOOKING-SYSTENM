/**
 * storage.js
 * Handles LocalStorage wrappers, Authentication checks, and UI utilities.
 */

const Storage = {
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from storage', e);
            return null;
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error writing to storage', e);
        }
    },
    remove: (key) => {
        localStorage.removeItem(key);
    },
    
    // Auth Helpers
    getUsers: () => Storage.get('users') || [],
    saveUser: (user) => {
        const users = Storage.getUsers();
        users.push(user);
        Storage.set('users', users);
    },
    getCurrentUser: () => Storage.get('currentUser'),
    setCurrentUser: (user) => Storage.set('currentUser', user),
    logout: () => {
        Storage.remove('currentUser');
        window.location.href = 'index.html';
    }
};

const UI = {
    showToast: (message, type = 'info') => {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        container.appendChild(toast);

        // Remove after animation
        setTimeout(() => {
            toast.remove();
        }, 3000);
    },
    
    showLoader: (text = 'Loading...') => {
        if (document.querySelector('.loader-overlay')) return;
        const overlay = document.createElement('div');
        overlay.className = 'loader-overlay animate-fade-in';
        overlay.innerHTML = `
            <div class="spinner"></div>
            <p class="mt-2 text-muted" style="font-weight:500">${text}</p>
        `;
        document.body.appendChild(overlay);
    },
    
    hideLoader: () => {
        const overlay = document.querySelector('.loader-overlay');
        if (overlay) overlay.remove();
    }
};

// Global formatters
const Currency = {
    format: (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    }
};

// Guard clause for protected pages
function checkAuth() {
    const user = Storage.getCurrentUser();
    const isAuthPage = window.location.pathname.includes('index.html');
    
    if (!user && !isAuthPage) {
        window.location.href = 'index.html';
    } else if (user && isAuthPage) {
        window.location.href = 'dashboard.html';
    }
}
