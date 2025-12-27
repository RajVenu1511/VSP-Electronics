# Admin System - Quick Start Guide

## 🔑 Access Admin Panel

### Default Admin Login
- **Email:** `admin@agarwalelectronics.com`
- **Password:** `Admin@123`

### Steps to Access:
1. Click "Login / Register" in the top-right header
2. Enter admin credentials
3. Click on your name in top-right corner
4. Select "Admin Dashboard" (brown highlighted button)

---

## ✨ Features Implemented

### 1️⃣ Role Management
- **Admin Role:** Full access to dashboard and management features
- **User Role:** Standard customer access
- Default admin account created automatically on first load
- Protected routes with admin guard

### 2️⃣ Admin Dashboard (`/admin/dashboard`)

**Real-time Analytics:**
- 📊 Today's Active Users
- 💰 Today's Transactions  
- 📦 Total Products
- 👥 Total Registered Users
- 📈 Last 7 Days Statistics
- 👁️ Total Page Views

**Quick Actions:**
- Add New Product
- Manage Products
- Manage Users
- Refresh Data

**Recent Activity:**
- View latest transactions
- Transaction types: Orders, Quotes, Cart actions
- User activity tracking

### 3️⃣ Product Management (`/admin/products`)

**Add New Products:**
- Product Name & Brand
- Category Selection
- Pricing (Regular & Sale)
- Image URL
- Description
- Stock Status
- Featured Product Toggle

**Edit Products:**
- Modify any product field
- Update pricing
- Change categories
- Toggle stock/featured status

**Delete Products:**
- Remove products with confirmation

**Search & Filter:**
- Search by name or ID
- Filter by category
- Filter by brand
- Real-time results count

**Quick Toggles:**
- In Stock / Out of Stock
- Featured / Not Featured

### 4️⃣ Analytics Tracking

**Automatic Tracking:**
- User login/activity
- Page views
- Daily active users
- Transaction recording
- 7-day rolling statistics

**Data Points:**
- User ID and timestamp
- Transaction details
- Activity patterns
- Usage statistics

### 5️⃣ User Management
- View all registered users
- Track user roles
- Monitor user activity
- User count statistics

---

## 🎯 How to Use

### Adding a Product
1. Go to Admin Dashboard
2. Click "Add New Product" or navigate to `/admin/products`
3. Click "+ Add New Product" button
4. Fill in product details:
   - Name (required)
   - Brand (required)
   - Category (required)
   - Price (required)
   - Original Price (optional)
   - Image URL (optional)
   - Description (optional)
   - Check "In Stock" if available
   - Check "Featured Product" to highlight
5. Click "Add Product"

### Editing a Product
1. Navigate to Product Management
2. Find product in table
3. Click blue edit icon
4. Modify fields as needed
5. Click "Update Product"

### Managing Stock
1. In product table, find the product
2. Click the "In Stock" / "Out of Stock" button to toggle
3. Changes save automatically

### Viewing Analytics
1. Access Admin Dashboard
2. View statistics cards at top
3. Scroll to see recent transactions
4. Check weekly overview

---

## 📊 Data Storage

All data stored in browser's localStorage:

| Key | Purpose |
|-----|---------|
| `drone_shop_users` | All user accounts |
| `drone_shop_current_user` | Current logged-in user |
| `drone_shop_analytics` | Daily statistics |
| `drone_shop_transactions` | Transaction history |
| `drone_shop_daily_users` | Daily active users |

---

## 🔒 Security Features

- Admin route protection with guard
- Role-based access control
- Admin-only navigation items
- Automatic user activity tracking
- Secure password validation (already implemented)

---

## 💡 Tips

1. **Testing Analytics:** 
   - Login/logout to see user count increase
   - Add items to cart to create transactions
   - View dashboard to see real-time stats

2. **Product Images:**
   - Use direct image URLs
   - Recommended size: 400x400px
   - Format: JPG, PNG, WebP

3. **Categories:**
   - Use existing category slugs
   - Categories are pre-defined
   - Match products to appropriate categories

4. **Featured Products:**
   - Mark important products as "Featured"
   - Featured products show on home page
   - Use for promotions and bestsellers

---

## 🚀 Next Steps

**Recommended Enhancements:**
- Add user role management UI
- Implement advanced charts
- Add export functionality
- Create order management
- Add email notifications
- Implement image upload
- Add bulk operations

---

## 📝 Notes

- All changes persist in localStorage
- Clear browser data will reset everything
- Admin account recreates on app load if missing
- Use Chrome DevTools to inspect localStorage
- Analytics reset requires manual localStorage clearing

---

## ⚠️ Important

**This is a frontend-only implementation:**
- Data stored in browser localStorage
- No backend/database connection
- For production, integrate with real backend API
- Implement proper authentication
- Use secure password hashing
- Add server-side validation

---

**System Status:** ✅ Fully Functional
**Last Updated:** December 25, 2025
