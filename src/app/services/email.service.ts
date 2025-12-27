import { Injectable } from '@angular/core';

declare const Email: any;

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  
  // Using SMTP.js for email sending - https://smtpjs.com/
  // This is a simple solution for testing. For production, use a proper backend
  
  async sendPasswordResetEmail(to: string, resetCode: string, userName: string): Promise<{success: boolean, message: string}> {
    try {
      // Check if Email.send is available
      if (typeof Email === 'undefined') {
        console.error('SMTP.js not loaded');
        return {
          success: false,
          message: 'Email service not available. Please ensure SMTP.js is loaded.'
        };
      }

      // Send email using SMTP.js
      const response = await Email.send({
        SecureToken: "YOUR_SMTP_TOKEN", // Will be configured with your test email
        To: to,
        From: "noreply@vspelectronics.com",
        Subject: "Password Reset Code - VSP Electronics",
        Body: this.getEmailTemplate(resetCode, userName)
      });

      if (response === 'OK') {
        return {
          success: true,
          message: 'Password reset code sent to your email'
        };
      } else {
        console.error('Email send failed:', response);
        return {
          success: false,
          message: 'Failed to send email. Please try again.'
        };
      }
    } catch (error) {
      console.error('Email error:', error);
      return {
        success: false,
        message: 'Failed to send email. Please try again.'
      };
    }
  }

  private getEmailTemplate(resetCode: string, userName: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .code-box { background: white; border: 2px dashed #667eea; padding: 20px; margin: 20px 0; text-align: center; border-radius: 5px; }
          .code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px; }
          .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 20px 0; }
          .footer { text-align: center; color: #777; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Password Reset Request</h1>
          </div>
          <div class="content">
            <p>Hello ${userName},</p>
            <p>We received a request to reset your password for your VSP Electronics account.</p>
            
            <div class="code-box">
              <p style="margin: 0 0 10px 0; color: #666;">Your password reset code is:</p>
              <div class="code">${resetCode}</div>
            </div>

            <div class="warning">
              <strong>⚠️ Important:</strong>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>This code will expire in <strong>30 minutes</strong></li>
                <li>Do not share this code with anyone</li>
                <li>If you didn't request this, please ignore this email</li>
              </ul>
            </div>

            <p>Enter this code on the password reset page to create a new password.</p>
            
            <p style="margin-top: 30px;">Best regards,<br><strong>VSP Electronics Team</strong></p>
          </div>
          <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
            <p>&copy; 2025 VSP Electronics. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Alternative method using console for testing (when SMTP not configured)
  sendPasswordResetEmailTest(to: string, resetCode: string, userName: string): {success: boolean, message: string} {
    console.log('='.repeat(60));
    console.log('📧 PASSWORD RESET EMAIL');
    console.log('='.repeat(60));
    console.log(`To: ${to}`);
    console.log(`Name: ${userName}`);
    console.log(`Reset Code: ${resetCode}`);
    console.log(`Expires: 30 minutes from now`);
    console.log('='.repeat(60));
    
    return {
      success: true,
      message: `Reset code sent! Check console for code (Testing mode)`
    };
  }
}
