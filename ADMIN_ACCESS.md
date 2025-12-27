# Admin Account Access

## Admin Credentials

**Email:** `admin@vspelectronics.com`  
**Password:** `Admin@123`

## Admin Features

Once logged in with the admin account, you will have access to:

### 1. Admin Dashboard
- Access via: http://localhost:4200/admin or click "Admin Dashboard" from the user dropdown
- View analytics and statistics
- Quick access to all admin functions

### 2. Product Management
- Access via: http://localhost:4200/admin/products or click "Manage Products" from the dashboard
- **Create new products** - Add product name, price, category, brand, images, etc.
- **Edit existing products** - Update prices, images, descriptions, stock status
- **Delete products** - Remove products from the catalog
- **Filter products** - Search by name, category, or brand
- **Update product details:**
  - Product name
  - Price (current and original)
  - Category and subcategory
  - Brand
  - Product images (primary and gallery)
  - Stock status (In Stock/Out of Stock)
  - Hot/Featured status
  - Description

### 3. User Management
- View all registered users
- Manage user accounts

## How to Access Admin Features

1. **Login:**
   - Click "Login / Register" in the header
   - Enter admin credentials
   - Email: `admin@vspelectronics.com`
   - Password: `Admin@123`

2. **Access Admin Dashboard:**
   - After login, click on your name in the header
   - Select "Admin Dashboard" from the dropdown
   - OR navigate directly to: http://localhost:4200/admin

3. **Manage Products:**
   - From Admin Dashboard, click "Manage Products"
   - OR navigate directly to: http://localhost:4200/admin/products

## Product Management Features

### Add New Product
1. Click "Add New Product" button
2. Fill in the product form:
   - Product Name (required)
   - Brand (select from dropdown)
   - Category (select from dropdown)
   - Price (required)
   - Original Price (optional, for discount display)
   - Image URL (required)
   - Stock Status (In Stock/Out of Stock)
   - Hot/Featured Product checkbox
   - Description (optional)
3. Click "Save Product"

### Edit Product
1. Find the product in the list
2. Click "Edit" button
3. Modify any fields
4. Click "Update Product"

### Delete Product
1. Find the product in the list
2. Click "Delete" button
3. Confirm deletion

### Filter Products
- Use the search box to find products by name or ID
- Filter by category using the dropdown
- Filter by brand using the dropdown
- Filters work together for advanced searches

## Security

- Admin routes are protected with `adminGuard`
- Non-admin users cannot access admin pages
- Users without admin role will be redirected to home page

## Test Account

For testing regular user features:

**Email:** `test@gmail.com`  
**Password:** `Test@123`  
**Role:** Regular User (no admin access)

## Notes

- All data is stored in localStorage
- Products are managed through the ProductService
- Changes are saved immediately
- Refresh the page to see updates throughout the site
