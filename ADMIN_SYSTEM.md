# Admin System Documentation

## Overview
Complete admin panel system for managing products, users, and tracking analytics.

## Default Admin Credentials
- **Email:** admin@agarwalelectronics.com
- **Password:** Admin@123

## Features Implemented

### 1. Role-Based Access Control
- **Roles:** Admin and User
- Users are assigned 'user' role by default
- Admin role has access to admin dashboard and management features
- Admin guard protects admin routes

### 2. Admin Dashboard (`/admin/dashboard`)
**Analytics displayed:**
- Today's active users
- Today's transactions
- Total products in catalog
- Total registered users
- Last 7 days users and transactions
- Total page views
- Recent transactions list

**Quick Actions:**
- Add new product
- Manage products
- Manage users
- Refresh data

### 3. Product Management (`/admin/products`)
**Features:**
- **Add Products:** Create new products with all details
- **Edit Products:** Modify existing product information
- **Delete Products:** Remove products from catalog
- **Search & Filter:** Filter by name, ID, category, or brand
- **Toggle Stock Status:** Quick in-stock/out-of-stock toggle
- **Toggle Featured:** Mark products as featured

**Product Fields:**
- Name, Brand, Category
- Price, Original Price
- Image URL
- Description
- In Stock status
- Featured status

### 4. Analytics Service
**Tracks:**
- Daily active users
- Page views
- Transactions (orders, quotes, cart actions)
- Date-based analytics
- 7-day rolling statistics

**Methods:**
- `trackActiveUser(userId)` - Track when user logs in/visits
- `trackTransaction(data)` - Record transaction
- `getAnalyticsSummary()` - Get complete analytics overview
- `getDailyActiveUsers()` - Get today's user count
- `getTodayTransactions()` - Get today's transactions

### 5. User Management
- View all registered users
- Track user activity
- Role assignment capability
- User registration tracking

## How to Access Admin Panel

1. **Login as Admin:**
   - Click "Login / Register" in header
   - Use admin credentials above
   - Or create admin user manually in localStorage

2. **Navigate to Admin:**
   - After login, click on your name in top-right
   - Click "Admin Dashboard" (only visible to admins)
   - Or navigate directly to `/admin`

3. **Admin Features:**
   - Dashboard shows all analytics
   - Click "Manage Products" or navigate to `/admin/products`
   - Add/Edit/Delete products as needed

## Data Storage
- **Users:** localStorage key `drone_shop_users`
- **Current User:** localStorage key `drone_shop_current_user`
- **Analytics:** localStorage key `drone_shop_analytics`
- **Transactions:** localStorage key `drone_shop_transactions`
- **Daily Users:** localStorage key `drone_shop_daily_users`

## Admin Navigation
Admin users see special dropdown menu items:
- **Admin Dashboard** - Highlighted in brown gradient
- My Account
- Wishlist
- Cart
- Logout

## Transaction Tracking
Transactions can be tracked for:
- Orders
- Quotes
- Cart actions

Each transaction includes:
- User ID and name
- Transaction type
- Number of items
- Timestamp

## Future Enhancements
- User role management UI
- Advanced analytics charts
- Export data functionality
- Email notifications
- Image upload for products
- Bulk product operations
- Order management system
