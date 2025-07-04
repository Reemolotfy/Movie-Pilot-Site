"use strict";
class LoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.errorElement = document.getElementById('error');
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    validatePassword(password) {
        return password.length >= 6;
    }
    handleSubmit(event) {
        event.preventDefault();
        const user = {
            email: this.emailInput.value.trim(),
            password: this.passwordInput.value
        };
        // Clear previous error
        this.errorElement.textContent = '';
        // Validate
        if (!this.validateEmail(user.email)) {
            this.showError('Please enter a valid email');
            return;
        }
        if (!this.validatePassword(user.password)) {
            this.showError('Password must be at least 6 characters');
            return;
        }
        // If valid, proceed with login
        this.login(user);
    }
    showError(message) {
        this.errorElement.textContent = message;
    }
    login(user) {
        // Replace this with actual login logic
        console.log('Logging in:', user);
        alert('Login successful!');
    }
}
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LoginForm();
});
