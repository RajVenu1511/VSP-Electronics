# Session Management Features

## Overview
Implemented comprehensive session management for the drone frontend application with auto-logout, cross-tab synchronization, and login requirements for cart/wishlist actions.

## Features Implemented

### 1. Auto-Logout After 10 Minutes of Inactivity
- Tracks user activity (mouse, keyboard, scroll, touch, click events)
- Session expires after 10 minutes of no activity
- Shows alert before logging out: "Your session has expired due to inactivity. Please login again."
- Checks session expiry every minute

### 2. Cross-Tab Session Synchronization
- When user logs in one tab, all other tabs automatically update
- When user logs out from any tab, all tabs logout simultaneously
- Uses browser's localStorage events for real-time sync
- No need to refresh other tabs manually

### 3. Login Required for Actions
Users must login to:
- Add items to cart
- Add items to wishlist
- Request quotes

When not logged in, a modal appears with message:
- "Please login to add items to cart"
- "Please login to add items to wishlist"
- "Please login to request a quote"

## Implementation Details

### AuthService (`src/app/services/auth.service.ts`)
**New Properties:**
- `LAST_ACTIVITY_KEY`: Stores timestamp of last user activity
- `SESSION_TIMEOUT`: 10 minutes (600,000 ms)
- `activityTimer`: Interval for checking session expiry
- `storageListener`: Listener for cross-tab sync

**New Methods:**
- `isSessionExpired()`: Checks if current session has exceeded timeout
- `updateLastActivity()`: Updates the last activity timestamp
- `startActivityTracking()`: Sets up activity listeners and expiry checker
- `setupCrossTabSync()`: Listens for localStorage changes from other tabs
- `requireLogin()`: Returns true if user is not logged in
- `ngOnDestroy()`: Cleanup timers and listeners

**Updated Methods:**
- `loadCurrentUser()`: Now checks session expiry on page load
- `login()`: Updates last activity timestamp
- `signup()`: Updates last activity timestamp
- `logout()`: Clears last activity timestamp

### AuthModalComponent
**New Input:**
- `@Input() message`: Custom message to display (default: "Please login to continue")

**Updated Template:**
- Added info alert box to display login requirement message

### ProductCardComponent
**New Output:**
- `@Output() loginRequired`: Emits message when login is required

**Updated Methods:**
- `addToCart()`: Checks login status before adding
- `toggleWishlist()`: Checks login status before adding

### Page Components Updated
All components that use ProductCardComponent or have cart/wishlist actions:

**product-list.component.ts:**
- Added `showAuthModal` and `authModalMessage` properties
- Added `onLoginRequired()` method
- Added `closeAuthModal()` method

**home.component.ts:**
- Added `showAuthModal` and `authModalMessage` properties
- Added `onLoginRequired()` method
- Added `closeAuthModal()` method

**product-detail.component.ts:**
- Added `showAuthModal` and `authModalMessage` properties
- Added login checks to `addToCart()`, `addToQuote()`, `toggleWishlist()`
- Added `closeAuthModal()` method

**header.component.ts:**
- Updated `openAuthModal()` to accept optional message parameter
- Added `authModalMessage` property

## Usage

### For Users
1. **Login:** Use the login button in header
2. **Stay Active:** Interact with the page to keep session alive
3. **Multiple Tabs:** Login in one tab applies to all tabs
4. **Adding Items:** Must be logged in to add to cart/wishlist

### For Developers
To add login requirement to new components:

```typescript
// In component.ts
import { AuthService } from '../../services/auth.service';

export class YourComponent {
  authService = inject(AuthService);
  showAuthModal = false;
  authModalMessage = '';

  someAction() {
    if (this.authService.requireLogin()) {
      this.authModalMessage = 'Please login to perform this action';
      this.showAuthModal = true;
      return;
    }
    // Proceed with action
  }

  closeAuthModal() {
    this.showAuthModal = false;
    this.authModalMessage = '';
  }
}
```

```html
<!-- In component.html -->
<app-auth-modal *ngIf="showAuthModal" [message]="authModalMessage" (close)="closeAuthModal()"></app-auth-modal>
```

## Configuration

To change session timeout duration, modify in `auth.service.ts`:
```typescript
private readonly SESSION_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds
```

To change activity check frequency, modify in `startActivityTracking()`:
```typescript
setInterval(() => {
  // Check logic
}, 60000); // Check every 1 minute
```

## Browser Compatibility
- Requires localStorage support
- Requires Storage Events API (supported in all modern browsers)
- Activity tracking works on desktop and mobile devices

## Security Notes
- Session data stored in localStorage (client-side)
- No server-side session validation (future enhancement)
- Password stored in plain text in localStorage (development only)
- For production: implement JWT tokens and server-side session management
