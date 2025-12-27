# User Management System Documentation

## Overview
Complete user management system for admin dashboard with user analytics, grading, purchase tracking, and push notification capabilities.

## Features

### 1. **User List with Comprehensive Data**
- View all registered users in a sortable table
- Display: Name, Email, Phone, Grade, Purchases, Total Amount, Activity Days, Last Purchase Date
- User avatar initials for visual identification
- Real-time search across name, email, and phone fields

### 2. **User Grading System**
Users are automatically graded based on three factors:
- **Browsing Score (30%)**: Activity days × 10 (max 100)
- **Purchase Score (40%)**: Total purchases × 20 (max 100)
- **Amount Score (30%)**: (Total amount / 1000) × 10 (max 100)

**Grade Scale:**
- **A+** (90-100): Premium users - Green (#28a745)
- **A** (80-89): Excellent users - Light Green (#5cb85c)
- **B+** (70-79): Very Good users - Cyan (#5bc0de)
- **B** (60-69): Good users - Blue (#0275d8)
- **C** (50-59): Average users - Orange (#f0ad4e)
- **D** (40-49): Below Average users - Dark Orange (#ff8c00)
- **F** (0-39): Poor users - Red (#dc3545)

### 3. **Advanced Sorting**
Click column headers to sort by:
- Name (alphabetical)
- Email (alphabetical)
- Grade (A+ to F)
- Total Purchases (numeric)
- Total Amount (numeric)
- Activity Days (numeric)

Toggle between ascending/descending order with visual indicators.

### 4. **Pagination**
- Configurable items per page (5, 10, 25, 50, 100)
- Page number navigation with first/last/previous/next buttons
- Smart page number display (shows 5 pages at a time)
- Shows current page info: "Page X of Y | Total: Z users"

### 5. **Push Notifications**
Send targeted notifications to selected users:
- Select individual users via checkboxes
- Select all users on current page
- Bulk notification modal with:
  - Notification title (max 100 chars)
  - Message content (max 500 chars)
  - Character counter
  - Recipient count display
- Notification logs stored in localStorage

**To Send Notification:**
1. Select one or more users using checkboxes
2. Click "Send Notification (X)" button
3. Enter title and message
4. Click "Send Notification"
5. System shows success message with recipient count

### 6. **Export to CSV**
Export filtered user data to CSV file including:
- Name, Email, Phone, Grade, Purchases, Total Amount, Activity Days, Last Purchase Date
- Downloads as `users_YYYY-MM-DD.csv`
- Works with current search/filter results

### 7. **Statistics Dashboard**
Four key metrics displayed at the top:
- **Total Users**: Count of all registered users
- **Premium Users**: Count of A+ and A grade users
- **Total Purchases**: Sum of all order transactions
- **Total Revenue**: Sum of all order amounts in ₹

### 8. **Purchase History Tracking**
System automatically tracks:
- **Cart additions**: When users add items to cart
- **Quote requests**: When users request quotes
- **Orders**: When users complete checkout

Each transaction includes:
- User ID and Name
- Transaction type (cart/quote/order)
- Number of items
- Total amount
- Timestamp

## Technical Implementation

### Components Created

**user-management.component.ts**
- Main component logic
- User analytics calculation
- Pagination logic
- Sorting functionality
- Notification management
- CSV export

**user-management.component.html**
- Responsive table layout
- Stats cards
- Search and filters
- Notification modal
- Pagination controls

**user-management.component.css**
- Modern gradient designs
- Responsive layouts
- Interactive hover effects
- Color-coded grade badges

### Services Enhanced

**analytics.service.ts**
- Transaction tracking
- Daily user activity
- Page view tracking
- Date range queries

**cart.service.ts**
- Added transaction tracking on cart additions
- Checkout tracking with order type
- Links to analytics service

**quote.service.ts**
- Quote request tracking
- Amount calculation
- User activity logging

**auth.service.ts**
- User management
- Session tracking
- Admin verification

### Route Configuration
```
/admin/users - User Management Page (Admin Only)
```

## Data Storage

### localStorage Keys:
- `drone_shop_users` - User accounts
- `drone_shop_transactions` - All user transactions
- `drone_shop_daily_users` - Daily active users
- `drone_shop_analytics` - Analytics data
- `drone_shop_notifications` - Notification logs

### Transaction Structure:
```typescript
{
  id: string;
  userId: string;
  userName: string;
  type: 'order' | 'quote' | 'cart';
  amount?: number;
  items: number;
  timestamp: string;
}
```

## Usage Guide

### For Admins

**Access User Management:**
1. Login as admin (admin@vspelectronics.com / Admin@123)
2. Navigate to Admin Dashboard
3. Click "Manage Users" or go to `/admin/users`

**View User Details:**
- Table shows all user information at a glance
- Hover over rows for highlight effect
- Click column headers to sort

**Search Users:**
- Type in search box to filter by name, email, or phone
- Results update in real-time
- Search works across all fields

**Send Notifications:**
1. Check boxes next to users you want to notify
2. Click "Send Notification (X)" button
3. Fill in notification details
4. Click send

**Export Data:**
- Click "Export CSV" button
- File downloads automatically
- Contains all visible/filtered users

**Monitor Performance:**
- Check grade badges for user quality
- Review purchase counts and amounts
- Track activity days for engagement
- Identify last purchase dates for re-engagement

### Grade Interpretation

**A+ and A Grade Users:**
- High value customers
- Frequent purchases
- Active engagement
- Target for VIP programs

**B+ and B Grade Users:**
- Good customers
- Regular activity
- Moderate purchases
- Upsell opportunities

**C Grade Users:**
- Average performance
- Occasional activity
- Target for engagement campaigns

**D and F Grade Users:**
- Low activity
- Few or no purchases
- Need re-engagement strategies
- Consider special offers

## Best Practices

### User Engagement
1. **Regular monitoring**: Check user management weekly
2. **Grade-based targeting**: Send different notifications to different grade users
3. **Re-engagement**: Target D/F grade users with special offers
4. **VIP treatment**: Give A+/A users early access and exclusive deals

### Data Analysis
1. **Export regularly**: Keep CSV backups for trend analysis
2. **Track changes**: Monitor grade improvements over time
3. **Purchase patterns**: Analyze last purchase dates
4. **Activity correlation**: Link activity days to purchase behavior

### Notification Strategy
1. **Segment users**: Don't send same message to everyone
2. **Personalize**: Reference their grade or activity
3. **Clear CTAs**: Include actionable items in notifications
4. **Track responses**: Monitor user behavior after notifications

## Future Enhancements

Potential additions:
- Email integration for notifications
- SMS notifications via gateway
- User detail view with full history
- Purchase history timeline
- Export to Excel with charts
- Filter by grade ranges
- Date range filters for activity
- Bulk user actions (suspend, delete)
- User segmentation tools
- Automated notification campaigns

## Security Notes

- Only admin users can access `/admin/users`
- Protected by adminGuard
- User passwords not shown in interface
- Notification logs include timestamp for audit
- All actions logged with user ID

## Responsive Design

Fully responsive layout works on:
- Desktop (1400px+)
- Tablet (768px - 1399px)
- Mobile (< 768px)

Mobile optimizations:
- Horizontal scroll for table
- Stacked stats cards
- Full-width search and buttons
- Simplified pagination display

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires:
- localStorage support
- ES6 JavaScript
- CSS Grid and Flexbox
