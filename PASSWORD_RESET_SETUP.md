# Password Reset Email Configuration Guide

## Overview
The "Lost your password" feature is now fully implemented! It includes a 3-step password reset process:
1. Enter email address
2. Verify 6-digit code sent to email
3. Create new password

## Current Setup (Testing Mode)

Right now, the system works in **TEST MODE** - the reset code is displayed in the browser console instead of being sent via email. This is perfect for testing without email configuration.

### How to Test Now:
1. Click "Lost your password?" on the login form
2. Enter an email address (must be registered)
3. Click "Send Reset Code"
4. **Check the browser console (F12)** - you'll see:
   ```
   📧 PASSWORD RESET EMAIL
   ============================================================
   To: user@example.com
   Name: User
   Reset Code: 123456
   Expires: 30 minutes from now
   ============================================================
   ```
5. Copy the 6-digit code from console
6. Enter it in the verification form
7. Create your new password

## Setting Up Real Email Sending

To send actual emails, you need to configure SMTP.js with your test email account.

### Option 1: Using Gmail (Recommended for Testing)

1. **Get an App Password from Gmail:**
   - Go to your Gmail account settings
   - Enable 2-Factor Authentication if not already enabled
   - Go to Security → App Passwords
   - Create a new app password for "Mail"
   - Copy the 16-character password

2. **Get Your SMTP Token from SmtpJS.com:**
   - Go to https://smtpjs.com/
   - Click "Get Your Secure Token"
   - Enter your details:
     - **Email**: Your Gmail address (e.g., test@gmail.com)
     - **Password**: The app password from step 1
     - **SMTP Server**: smtp.gmail.com
     - **Port**: 587 or 465
   - Click "Get Token"
   - Copy the secure token

3. **Update the Email Service:**
   Open `src/app/services/email.service.ts` and update line 21:
   ```typescript
   SecureToken: "YOUR_SMTP_TOKEN_HERE", // Replace with your token from SmtpJS
   ```

4. **Update the From Address:**
   On line 22, update:
   ```typescript
   From: "test@gmail.com", // Your Gmail address
   ```

5. **Switch to Real Email Mode:**
   In `src/app/components/auth-modal/auth-modal.component.ts`, find the `onRequestResetCode()` method (around line 285) and replace:
   ```typescript
   // Current (test mode):
   const emailResult = this.emailService.sendPasswordResetEmailTest(
     this.forgotPasswordData.email,
     this.forgotPasswordData.resetToken,
     'User'
   );

   // Change to (real email mode):
   const emailResult = await this.emailService.sendPasswordResetEmail(
     this.forgotPasswordData.email,
     this.forgotPasswordData.resetToken,
     'User'
   );
   ```

   And update the method signature to async:
   ```typescript
   async onRequestResetCode() {
   ```

### Option 2: Using ElasticEmail (Alternative)

ElasticEmail offers a free tier with 100 emails/day:

1. Sign up at https://elasticemail.com/
2. Verify your email
3. Go to Settings → SMTP/API
4. Create API Key
5. Use the same process as Gmail above with ElasticEmail's SMTP settings

## Test Accounts

Here are some test accounts you can use:

### Admin Account
- **Email**: admin@agarwalelectronics.com
- **Password**: Admin@123

### Create Test User
1. Click "Sign up" in the auth modal
2. Fill in the form with test data
3. Try the password reset feature

## Features

✅ **Security Features:**
- 6-digit random code generation
- 30-minute expiration on reset tokens
- Token validation before password reset
- Password strength requirements enforced

✅ **User Experience:**
- Clear 3-step process
- Visual feedback at each step
- Resend code option
- Return to login option

✅ **Email Template:**
- Professional HTML email design
- Clear instructions
- Security warnings
- Branded design

## Troubleshooting

### "Email service not available"
- Make sure SMTP.js script is loaded in index.html
- Check browser console for errors
- Verify your secure token is correct

### "No account found with this email"
- The email must be registered in the system
- Check the email spelling
- Try creating a test account first

### "Invalid or expired reset code"
- Codes expire after 30 minutes
- Request a new code
- Make sure you're copying the full 6-digit code

### Still using test mode?
- Check that you updated the secure token in email.service.ts
- Verify you changed `sendPasswordResetEmailTest` to `sendPasswordResetEmail`
- Check browser console for any errors

## Code Structure

- **auth.service.ts**: Password reset logic, token generation/verification
- **email.service.ts**: Email sending via SMTP.js
- **auth-modal.component.ts**: UI logic for 3-step process
- **auth-modal.component.html**: Form templates
- **auth-modal.component.css**: Styling

## Next Steps

1. **Test in console mode first** (current setup)
2. **Configure your Gmail/test email** (follow Option 1 above)
3. **Switch to real email mode**
4. **Test the complete flow**

For production, you should implement this on a backend server with proper security measures, but this setup works great for testing and development!
