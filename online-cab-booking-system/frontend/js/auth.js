document.addEventListener('DOMContentLoaded', () => {
    // Check Auth again to be safe
    checkAuth();

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterBtn = document.getElementById('show-register');
    const showLoginBtn = document.getElementById('show-login');

    // Toggle Forms
    showRegisterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        registerForm.querySelector('input').focus();
    });

    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        loginForm.querySelector('input').focus();
    });

    // Handle Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (!email || !password) return;

        UI.showLoader('Verifying credentials...');

        setTimeout(() => {
            const users = Storage.getUsers();
            const user = users.find(u => u.email === email && u.password === password);

            UI.hideLoader();

            if (user) {
                Storage.setCurrentUser(user);
                UI.showToast('Login Successful!', 'success');
                setTimeout(() => window.location.href = 'dashboard.html', 1000);
            } else {
                UI.showToast('Invalid email or password', 'error');
            }
        }, 800); // Fake network delay
    });

    // Handle Register
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value.trim();

        if (!name || !email || !password) return;

        UI.showLoader('Creating account...');

        setTimeout(() => {
            const users = Storage.getUsers();

            if (users.find(u => u.email === email)) {
                UI.hideLoader();
                UI.showToast('Email already exists', 'error');
                return;
            }

            const newUser = {
                id: Date.now(),
                name,
                email,
                password // storing plain text for simulation per requirements
            };

            Storage.saveUser(newUser);
            Storage.setCurrentUser(newUser);

            UI.hideLoader();
            UI.showToast('Account created! specific', 'success');
            setTimeout(() => window.location.href = 'dashboard.html', 1000);
        }, 1000);
    });
});
