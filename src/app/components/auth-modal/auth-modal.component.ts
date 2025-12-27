import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, SignupData, LoginCredentials } from '../../services/auth.service';
import { EmailService } from '../../services/email.service';

declare const google: any;

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent {
  @Output() close = new EventEmitter<void>();
  @Input() message: string = 'Please login to continue';
  
  private authService = inject(AuthService);
  private emailService = inject(EmailService);
  private router = inject(Router);

  activeTab: 'login' | 'signup' | 'forgot' = 'login';
  showPassword = false;
  rememberMe = false;
  
  // Forgot password
  forgotPasswordStep = 1; // 1: enter email, 2: enter code, 3: new password
  forgotPasswordData = {
    email: '',
    code: '',
    newPassword: '',
    confirmPassword: '',
    resetToken: ''
  };
  
  // Login form
  loginData: LoginCredentials = {
    email: '',
    password: ''
  };

  // Signup form
  signupData: SignupData = {
    name: '',
    email: '',
    phone: '',
    password: ''
  };

  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  ngAfterViewInit() {
    // Delay Google Sign-In initialization to ensure DOM is ready
    setTimeout(() => {
      this.initializeGoogleSignIn();
    }, 100);
  }

  private initializeGoogleSignIn() {
    // Only initialize if Google Sign-In is available
    if (typeof google === 'undefined' || !google.accounts) {
      console.log('Google Sign-In not available');
      return;
    }

    try {
      google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com', // Replace with actual client ID
        callback: this.handleGoogleSignIn.bind(this)
      });

      // Render button for the active tab
      const buttonId = this.activeTab === 'login' ? 'google-signin-login' : 'google-signin-signup';
      const buttonElement = document.getElementById(buttonId);
      
      if (buttonElement) {
        google.accounts.id.renderButton(
          buttonElement,
          { 
            theme: 'outline', 
            size: 'large',
            width: '100%',
            text: 'signin_with'
          }
        );
      }
    } catch (error) {
      console.error('Google Sign-In initialization failed:', error);
    }
  }

  private handleGoogleSignIn(response: any) {
    try {
      // Decode the JWT token to get user info
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      // Create user data from Google response
      const googleUser: SignupData = {
        name: payload.name,
        email: payload.email,
        phone: '', // Google doesn't provide phone
        password: 'google_' + payload.sub // Use Google ID as password
      };

      // Try to login first, if fails then signup
      const loginResult = this.authService.login({
        email: googleUser.email,
        password: googleUser.password
      });

      if (!loginResult.success) {
        // User doesn't exist, create account
        const signupResult = this.authService.signup(googleUser);
        if (signupResult.success) {
          this.successMessage = 'Google Sign-In successful!';
          this.closeModal();
        }
      } else {
        this.successMessage = 'Google Sign-In successful!';
        this.closeModal();
      }
    } catch (error) {
      this.errorMessage = 'Google Sign-In failed. Please try again.';
    }
  }

  switchTab(tab: 'login' | 'signup' | 'forgot') {
    this.activeTab = tab;
    this.errorMessage = '';
    this.successMessage = '';
    this.resetForms();
    
    // Reset forgot password step when switching to forgot tab
    if (tab === 'forgot') {
      this.forgotPasswordStep = 1;
    }
    
    // Re-initialize Google Sign-In for the new tab (only for login/signup)
    if (tab === 'login' || tab === 'signup') {
      setTimeout(() => {
        this.initializeGoogleSignIn();
      }, 100);
    }
  }

  resetForms() {
    this.loginData = { email: '', password: '' };
    this.signupData = { name: '', email: '', phone: '', password: '' };
    this.confirmPassword = '';
    this.showPassword = false;
    this.forgotPasswordData = {
      email: '',
      code: '',
      newPassword: '',
      confirmPassword: '',
      resetToken: ''
    };
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    this.errorMessage = '';
    this.successMessage = '';

    // Trim whitespace
    this.loginData.email = this.loginData.email.trim();

    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    // Validate email format (not phone number)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.loginData.email)) {
      this.errorMessage = 'Please enter a valid email address (phone numbers not accepted)';
      return;
    }

    // Check if it looks like a phone number
    const phonePattern = /^[0-9]{10,}$/;
    if (phonePattern.test(this.loginData.email.replace(/[@._-]/g, ''))) {
      this.errorMessage = 'Please use email address for login, not phone number';
      return;
    }

    const result = this.authService.login(this.loginData);
    
    if (result.success) {
      this.successMessage = result.message;
      setTimeout(() => {
        this.closeModal();
      }, 500);
    } else {
      this.errorMessage = result.message;
    }
  }

  onSignup() {
    this.errorMessage = '';
    this.successMessage = '';

    // Trim whitespace from all fields
    this.signupData.name = this.signupData.name.trim();
    this.signupData.email = this.signupData.email.trim();
    this.signupData.phone = this.signupData.phone.trim();

    // Validation - all fields required
    if (!this.signupData.name || !this.signupData.email || !this.signupData.phone || !this.signupData.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    // Validate name (at least 2 characters, only letters and spaces)
    if (this.signupData.name.length < 2) {
      this.errorMessage = 'Name must be at least 2 characters long';
      return;
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(this.signupData.name)) {
      this.errorMessage = 'Name should contain only letters and spaces';
      return;
    }

    // Validate email format (strict - no phone numbers)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.signupData.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    // Check if email looks like a phone number
    const phonePattern = /^[0-9]{10,}$/;
    if (phonePattern.test(this.signupData.email.replace(/[@._-]/g, ''))) {
      this.errorMessage = 'Email cannot be a phone number';
      return;
    }

    // Validate phone number (Indian format: 10 digits starting with 6-9)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(this.signupData.phone)) {
      this.errorMessage = 'Phone number must be 10 digits starting with 6, 7, 8, or 9';
      return;
    }

    // Validate passwords match
    if (this.signupData.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Password strength validation
    if (this.signupData.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long';
      return;
    }

    // Check for uppercase
    if (!/[A-Z]/.test(this.signupData.password)) {
      this.errorMessage = 'Password must contain at least one uppercase letter';
      return;
    }

    // Check for lowercase
    if (!/[a-z]/.test(this.signupData.password)) {
      this.errorMessage = 'Password must contain at least one lowercase letter';
      return;
    }

    // Check for number
    if (!/[0-9]/.test(this.signupData.password)) {
      this.errorMessage = 'Password must contain at least one number';
      return;
    }

    // Check for special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.signupData.password)) {
      this.errorMessage = 'Password must contain at least one special character (!@#$%^&*...)';
      return;
    }

    const result = this.authService.signup(this.signupData);
    
    if (result.success) {
      this.successMessage = result.message;
      setTimeout(() => {
        this.closeModal();
      }, 500);
    } else {
      this.errorMessage = result.message;
    }
  }

  closeModal() {
    this.close.emit();
  }

  // Forgot Password Methods
  onRequestResetCode() {
    this.errorMessage = '';
    this.successMessage = '';

    // Validate email
    if (!this.forgotPasswordData.email) {
      this.errorMessage = 'Please enter your email address';
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.forgotPasswordData.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    // Generate reset token
    const result = this.authService.generateResetToken(this.forgotPasswordData.email);
    
    if (!result.success) {
      this.errorMessage = result.message + '. Please create an account first or use a registered email.';
      return;
    }

    // Store token for later verification
    this.forgotPasswordData.resetToken = result.token || '';

    // Send email (using test mode for now)
    const emailResult = this.emailService.sendPasswordResetEmailTest(
      this.forgotPasswordData.email,
      this.forgotPasswordData.resetToken,
      'User'
    );

    if (emailResult.success) {
      this.successMessage = emailResult.message;
      this.forgotPasswordStep = 2;
    } else {
      this.errorMessage = emailResult.message;
    }
  }

  onVerifyResetCode() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.forgotPasswordData.code) {
      this.errorMessage = 'Please enter the reset code';
      return;
    }

    if (this.forgotPasswordData.code.length !== 6) {
      this.errorMessage = 'Reset code must be 6 digits';
      return;
    }

    // Verify code
    const result = this.authService.verifyResetToken(
      this.forgotPasswordData.email,
      this.forgotPasswordData.code
    );

    if (result.success) {
      this.successMessage = result.message;
      this.forgotPasswordStep = 3;
    } else {
      this.errorMessage = result.message;
    }
  }

  onResetPassword() {
    this.errorMessage = '';
    this.successMessage = '';

    // Validate passwords
    if (!this.forgotPasswordData.newPassword || !this.forgotPasswordData.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.forgotPasswordData.newPassword !== this.forgotPasswordData.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Password strength validation
    if (this.forgotPasswordData.newPassword.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long';
      return;
    }

    if (!/[A-Z]/.test(this.forgotPasswordData.newPassword)) {
      this.errorMessage = 'Password must contain at least one uppercase letter';
      return;
    }

    if (!/[a-z]/.test(this.forgotPasswordData.newPassword)) {
      this.errorMessage = 'Password must contain at least one lowercase letter';
      return;
    }

    if (!/[0-9]/.test(this.forgotPasswordData.newPassword)) {
      this.errorMessage = 'Password must contain at least one number';
      return;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(this.forgotPasswordData.newPassword)) {
      this.errorMessage = 'Password must contain at least one special character';
      return;
    }

    // Reset password
    const result = this.authService.resetPassword(
      this.forgotPasswordData.email,
      this.forgotPasswordData.code,
      this.forgotPasswordData.newPassword
    );

    if (result.success) {
      this.successMessage = result.message + ' - Redirecting to login...';
      setTimeout(() => {
        this.switchTab('login');
        this.successMessage = 'Password reset successful! Please login with your new password.';
      }, 2000);
    } else {
      this.errorMessage = result.message;
    }
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}
