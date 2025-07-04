
type User = {
  email: string;
  password: string;
};

class LoginForm {
  private form: HTMLFormElement;
  private emailInput: HTMLInputElement;
  private passwordInput: HTMLInputElement;
  private errorElement: HTMLElement;

  constructor() {
    this.form = document.getElementById('loginForm') as HTMLFormElement;
    this.emailInput = document.getElementById('email') as HTMLInputElement;
    this.passwordInput = document.getElementById('password') as HTMLInputElement;
    this.errorElement = document.getElementById('error') as HTMLElement;

    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  private validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private validatePassword(password: string): boolean {
    return password.length >= 6;
  }

  private handleSubmit(event: Event) {
    event.preventDefault();
    
    const user: User = {
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

  private showError(message: string) {
    this.errorElement.textContent = message;
  }

  private login(user: User) {
    
    console.log('Logging in:', user);
    alert('Login successful!');
  }
}


document.addEventListener('DOMContentLoaded', () => {
  new LoginForm();
});