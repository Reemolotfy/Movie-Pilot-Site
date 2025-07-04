// script.ts
type User = {
  email: string;
  password: string;
  name?: string; // For registration
};

class AuthSystem {
  private users: User[] = [];
  private currentForm: 'login' | 'register' = 'login';

  constructor() {
    this.initForms();
    this.renderForm();
  }

  private initForms() {
    document.getElementById('toggleForm')?.addEventListener('click', (e) => {
      e.preventDefault();
      this.currentForm = this.currentForm === 'login' ? 'register' : 'login';
      this.renderForm();
    });

    document.getElementById('authForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  private renderForm() {
    const formContainer = document.getElementById('formContainer');
    if (!formContainer) return;

    formContainer.innerHTML = `
      <h2 class="text-2xl font-semibold text-center mb-8 text-gray-800">
        ${this.currentForm === 'login' ? 'Login to your account' : 'Create an account'}
      </h2>
      
      <div id="error" class="mb-4 text-red-600 text-sm"></div>
      
      <form id="authForm" class="space-y-5">
        ${this.currentForm === 'register' ? `
          <div>
            <label class="block text-sm font-medium mb-2 text-gray-600">Name</label>
            <input id="name" type="text" placeholder="Your name"
              class="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition">
          </div>
        ` : ''}
        
        <div>
          <label class="block text-sm font-medium mb-2 text-gray-600">Email</label>
          <input id="email" type="email" placeholder="you@example.com"
            class="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition">
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-2 text-gray-600">Password</label>
          <input id="password" type="password" placeholder="••••••••"
            class="w-full px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition">
        </div>
        
        <button type="submit"
          class="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-red-400/30">
          ${this.currentForm === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      
      <p class="text-center text-sm mt-6 text-gray-600">
        ${this.currentForm === 'login' 
          ? 'Don\'t have an account?' 
          : 'Already have an account?'} 
        <a href="#" id="toggleForm" class="text-red-600 hover:text-red-500 underline transition">
          ${this.currentForm === 'login' ? 'Register' : 'Login'}
        </a>
      </p>
    `;

    // Reinitialize event listeners
    this.initForms();
  }

  private validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private validatePassword(password: string): boolean {
    return password.length >= 6;
  }

  private showError(message: string) {
    const errorElement = document.getElementById('error');
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  private handleSubmit() {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const nameInput = document.getElementById('name') as HTMLInputElement | null;

    const user: User = {
      email: emailInput.value.trim(),
      password: passwordInput.value
    };

    if (this.currentForm === 'register' && nameInput) {
      user.name = nameInput.value.trim();
    }

    // Clear previous error
    this.showError('');

    // Validation
    if (this.currentForm === 'register' && !user.name) {
      this.showError('Name is required');
      return;
    }

    if (!this.validateEmail(user.email)) {
      this.showError('Please enter a valid email');
      return;
    }

    if (!this.validatePassword(user.password)) {
      this.showError('Password must be at least 6 characters');
      return;
    }

    if (this.currentForm === 'login') {
      this.handleLogin(user);
    } else {
      this.handleRegister(user);
    }
  }

  private handleLogin(user: User) {
    const foundUser = this.users.find(u => u.email === user.email && u.password === user.password);
    if (foundUser) {
      alert('Login successful!');
      // Redirect or do something after login
    } else {
      this.showError('Invalid email or password');
    }
  }

  private handleRegister(user: User) {
    if (this.users.some(u => u.email === user.email)) {
      this.showError('Email already registered');
      return;
    }

    this.users.push(user);
    alert('Registration successful! Please login.');
    this.currentForm = 'login';
    this.renderForm();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AuthSystem();
});