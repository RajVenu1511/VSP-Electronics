import { Injectable, signal, inject } from '@angular/core';
import { AnalyticsService } from './analytics.service';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'drone_shop_users';
  private readonly CURRENT_USER_KEY = 'drone_shop_current_user';
  private readonly RESET_TOKENS_KEY = 'drone_shop_reset_tokens';
  private readonly LAST_ACTIVITY_KEY = 'drone_shop_last_activity';
  private readonly SESSION_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds
  private activityTimer: any;
  private storageListener: any;
  private analyticsService = inject(AnalyticsService);
  
  currentUser = signal<User | null>(null);
  isLoggedIn = signal<boolean>(false);

  constructor() {
    this.initializeDefaultAdmin();
    this.loadCurrentUser();
    this.startActivityTracking();
    this.setupCrossTabSync();
  }

  private initializeDefaultAdmin() {
    let users = this.getUsers();
    
    // Remove old test@gmail.com user if it exists (created via UI without admin role)
    users = users.filter(u => u.email !== 'test@gmail.com');
    
    // Check if admin user exists
    const adminExists = users.some(u => (u as any).role === 'admin');
    
    // Create default admin if no admin exists
    if (!adminExists) {
      const adminUser = {
        id: 'admin_001',
        name: 'Admin User',
        email: 'admin@vspelectronics.com',
        phone: '9999999999',
        role: 'admin' as const,
        password: 'Admin@123',
        createdAt: new Date().toISOString()
      };
      users.push(adminUser);
      
      // Log out current user if they were the test user
      const currentUserJson = localStorage.getItem(this.CURRENT_USER_KEY);
      if (currentUserJson) {
        const currentUser = JSON.parse(currentUserJson);
        if (currentUser.email === 'test@gmail.com') {
          this.logout();
        }
      }
    }
    
    // Create demo users if user count is less than 3 (admin + 2 demo users)
    if (users.length < 3) {
      this.createDemoUsers(users);
    }
    
    this.saveUsers(users);
  }

  private createDemoUsers(users: any[]) {
    const demoUsers = [
      {
        id: 'user_001',
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '9876543210',
        role: 'user' as const,
        password: 'User@123',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ago
      },
      {
        id: 'user_002',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        phone: '9876543211',
        role: 'user' as const,
        password: 'User@123',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() // 15 days ago
      },
      {
        id: 'user_003',
        name: 'Amit Patel',
        email: 'amit@example.com',
        phone: '9876543212',
        role: 'user' as const,
        password: 'User@123',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
      },
      {
        id: 'user_004',
        name: 'Sneha Gupta',
        email: 'sneha@example.com',
        phone: '9876543213',
        role: 'user' as const,
        password: 'User@123',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
      },
      {
        id: 'user_005',
        name: 'Vikram Singh',
        email: 'vikram@example.com',
        phone: '9876543214',
        role: 'user' as const,
        password: 'User@123',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
      }
    ];

    demoUsers.forEach(demoUser => {
      const exists = users.some(u => u.email === demoUser.email);
      if (!exists) {
        users.push(demoUser);
        
        // Create some demo transactions for these users
        this.createDemoTransactions(demoUser.id, demoUser.name);
      }
    });
  }

  private createDemoTransactions(userId: string, userName: string) {
    const analytics = inject(AnalyticsService);
    const randomPurchases = Math.floor(Math.random() * 5) + 1; // 1-5 purchases
    
    for (let i = 0; i < randomPurchases; i++) {
      const daysAgo = Math.floor(Math.random() * 20) + 1;
      const amount = Math.floor(Math.random() * 10000) + 1000; // 1000-11000
      const items = Math.floor(Math.random() * 5) + 1; // 1-5 items
      
      // Manually add transaction to localStorage
      const transactions = analytics.getTransactions();
      transactions.push({
        id: `trans_${Date.now()}_${i}`,
        userId: userId,
        userName: userName,
        type: 'order',
        amount: amount,
        items: items,
        timestamp: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString()
      });
      localStorage.setItem('drone_shop_transactions', JSON.stringify(transactions));
    }
  }

  private loadCurrentUser() {
    const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        // Check if session has expired
        if (this.isSessionExpired()) {
          this.logout();
          return;
        }
        this.currentUser.set(user);
        // Track active user
        this.analyticsService.trackActiveUser(user.id);
        this.isLoggedIn.set(true);
        this.updateLastActivity();
      } catch (e) {
        localStorage.removeItem(this.CURRENT_USER_KEY);
      }
    }
  }

  private isSessionExpired(): boolean {
    const lastActivity = localStorage.getItem(this.LAST_ACTIVITY_KEY);
    if (!lastActivity) return false;
    
    const lastActivityTime = parseInt(lastActivity, 10);
    const now = Date.now();
    return (now - lastActivityTime) > this.SESSION_TIMEOUT;
  }

  private updateLastActivity() {
    localStorage.setItem(this.LAST_ACTIVITY_KEY, Date.now().toString());
  }

  private startActivityTracking() {
    // Update activity on user interactions
    ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'].forEach(event => {
      document.addEventListener(event, () => {
        if (this.isLoggedIn()) {
          this.updateLastActivity();
        }
      }, { passive: true });
    });

    // Check session expiry every minute
    this.activityTimer = setInterval(() => {
      if (this.isLoggedIn() && this.isSessionExpired()) {
        alert('Your session has expired due to inactivity. Please login again.');
        this.logout();
      }
    }, 60000); // Check every 1 minute
  }

  private setupCrossTabSync() {
    // Listen for storage changes from other tabs
    this.storageListener = (event: StorageEvent) => {
      if (event.key === this.CURRENT_USER_KEY) {
        if (event.newValue) {
          // User logged in from another tab
          try {
            const user = JSON.parse(event.newValue);
            this.currentUser.set(user);
            this.isLoggedIn.set(true);
            this.analyticsService.trackActiveUser(user.id);
          } catch (e) {
            console.error('Error parsing user data:', e);
          }
        } else {
          // User logged out from another tab
          this.currentUser.set(null);
          this.isLoggedIn.set(false);
        }
      }
    };
    window.addEventListener('storage', this.storageListener);
  }

  ngOnDestroy() {
    if (this.activityTimer) {
      clearInterval(this.activityTimer);
    }
    if (this.storageListener) {
      window.removeEventListener('storage', this.storageListener);
    }
  }

  private getUsers(): User[] {
    const usersJson = localStorage.getItem(this.USERS_KEY);
    if (!usersJson) return [];
    try {
      return JSON.parse(usersJson);
    } catch (e) {
      return [];
    }
  }

  private saveUsers(users: User[]) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  signup(data: SignupData): { success: boolean; message: string; user?: User } {
    const users = this.getUsers();
    
    // Check if email already exists
    if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, message: 'Email already registered' };
    }

    // Check if phone already exists
    if (users.some(u => u.phone === data.phone)) {
      return { success: false, message: 'Phone number already registered' };
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    // Store password separately (in real app, this should be hashed on backend)
    const userWithPassword = { ...newUser, password: data.password };
    users.push(userWithPassword as any);
    this.saveUsers(users);

    // Auto login after signup
    this.currentUser.set(newUser);
    this.isLoggedIn.set(true);
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(newUser));
    this.updateLastActivity();
    
    // Track active user
    this.analyticsService.trackActiveUser(newUser.id);

    return { success: true, message: 'Registration successful', user: newUser };
  }

  login(credentials: LoginCredentials): { success: boolean; message: string; user?: User } {
    const users = this.getUsers();
    
    const user = users.find((u: any) => 
      u.email.toLowerCase() === credentials.email.toLowerCase() && 
      u.password === credentials.password
    );

    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Don't include password in current user
    const { password, ...userWithoutPassword } = user as any;
    
    this.currentUser.set(userWithoutPassword);
    this.isLoggedIn.set(true);
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    this.updateLastActivity();
    
    // Track active user
    this.analyticsService.trackActiveUser(userWithoutPassword.id);

    return { success: true, message: 'Login successful', user: userWithoutPassword };
  }

  logout() {
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    localStorage.removeItem(this.CURRENT_USER_KEY);
    localStorage.removeItem(this.LAST_ACTIVITY_KEY);
  }

  requireLogin(): boolean {
    return !this.isLoggedIn();
  }

  updateProfile(data: Partial<User>): { success: boolean; message: string } {
    const current = this.currentUser();
    if (!current) {
      return { success: false, message: 'Not logged in' };
    }

    const users = this.getUsers();
    const userIndex = users.findIndex((u: any) => u.id === current.id);
    
    if (userIndex === -1) {
      return { success: false, message: 'User not found' };
    }

    // Update user data
    const updatedUser = { ...users[userIndex], ...data };
    users[userIndex] = updatedUser;
    this.saveUsers(users);

    // Update current user (without password)
    const { password, ...userWithoutPassword } = updatedUser as any;
    this.currentUser.set(userWithoutPassword);
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    return { success: true, message: 'Profile updated successfully' };
  }

  isAdmin(): boolean {
    const user = this.currentUser();
    return user?.role === 'admin';
  }

  getAllUsers(): User[] {
    return this.getUsers().map((u: any) => {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
    });
  }

  // Password Reset Methods
  generateResetToken(email: string): { success: boolean; message: string; token?: string } {
    const users = this.getUsers();
    const user = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return { success: false, message: 'No account found with this email address' };
    }

    // Generate a random 6-digit token
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + (30 * 60 * 1000); // 30 minutes

    // Store reset token
    const resetTokens = this.getResetTokens();
    resetTokens[email.toLowerCase()] = { token, expiresAt };
    localStorage.setItem(this.RESET_TOKENS_KEY, JSON.stringify(resetTokens));

    return { success: true, message: 'Reset code sent to your email', token };
  }

  verifyResetToken(email: string, token: string): { success: boolean; message: string } {
    const resetTokens = this.getResetTokens();
    const storedToken = resetTokens[email.toLowerCase()];

    if (!storedToken) {
      return { success: false, message: 'Invalid or expired reset code' };
    }

    if (Date.now() > storedToken.expiresAt) {
      delete resetTokens[email.toLowerCase()];
      localStorage.setItem(this.RESET_TOKENS_KEY, JSON.stringify(resetTokens));
      return { success: false, message: 'Reset code has expired' };
    }

    if (storedToken.token !== token) {
      return { success: false, message: 'Invalid reset code' };
    }

    return { success: true, message: 'Code verified' };
  }

  resetPassword(email: string, token: string, newPassword: string): { success: boolean; message: string } {
    // First verify the token
    const verifyResult = this.verifyResetToken(email, token);
    if (!verifyResult.success) {
      return verifyResult;
    }

    // Update password
    const users = this.getUsers();
    const userIndex = users.findIndex((u: any) => u.email.toLowerCase() === email.toLowerCase());

    if (userIndex === -1) {
      return { success: false, message: 'User not found' };
    }

    users[userIndex] = { ...users[userIndex], password: newPassword } as any;
    this.saveUsers(users);

    // Remove used token
    const resetTokens = this.getResetTokens();
    delete resetTokens[email.toLowerCase()];
    localStorage.setItem(this.RESET_TOKENS_KEY, JSON.stringify(resetTokens));

    return { success: true, message: 'Password reset successfully' };
  }

  private getResetTokens(): any {
    const tokensJson = localStorage.getItem(this.RESET_TOKENS_KEY);
    if (!tokensJson) return {};
    try {
      return JSON.parse(tokensJson);
    } catch (e) {
      return {};
    }
  }
}
