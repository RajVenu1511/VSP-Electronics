# Quick Setup Guide

## Installation Steps

1. **Install Dependencies**
   ```powershell
   npm install
   ```

2. **Start Development Server**
   ```powershell
   npm start
   ```

3. **Open in Browser**
   Navigate to: http://localhost:4200

## Project Overview

This is a complete Angular e-commerce application inspired by vspelectronics.com

### Key Features Implemented:
✅ Home page with hero banner, featured categories, products, and brands
✅ Product listing with filters and sorting
✅ Product detail pages
✅ Shopping cart functionality
✅ Wishlist management
✅ About Us page
✅ Contact Us page with form
✅ Fully responsive design
✅ Modern UI with smooth animations

### Technologies Used:
- Angular 17 (Standalone Components)
- TypeScript
- CSS3 (Flexbox & Grid)
- Font Awesome Icons
- RxJS for state management

## Directory Structure

```
src/
├── app/
│   ├── components/          # Reusable components
│   │   ├── header/         # Navigation header
│   │   ├── footer/         # Site footer
│   │   └── product-card/   # Product display card
│   ├── pages/              # Page components
│   │   ├── home/           # Homepage
│   │   ├── product-list/   # Product listing
│   │   ├── product-detail/ # Product details
│   │   ├── cart/           # Shopping cart
│   │   ├── wishlist/       # Saved items
│   │   ├── compare/        # Product comparison
│   │   ├── about-us/       # About page
│   │   └── contact-us/     # Contact form
│   ├── services/           # Business logic
│   │   ├── product.service.ts
│   │   ├── cart.service.ts
│   │   └── wishlist.service.ts
│   └── models/             # Data models
├── assets/                 # Static assets
│   └── images/
└── styles.css              # Global styles
```

## Available Routes

- `/` - Home page
- `/shop` - All products
- `/category/:category` - Category-specific products
- `/product/:id` - Product detail
- `/cart` - Shopping cart
- `/wishlist` - Wishlist
- `/compare` - Product comparison
- `/about-us` - About page
- `/contact-us` - Contact page

## Customization

### Adding Products
Edit `src/app/services/product.service.ts` to add/modify products in the `products` array.

### Adding Categories
Edit the `categories` array in `product.service.ts`.

### Styling
- Global styles: `src/styles.css`
- Component styles: Individual component `.css` files

### Images
Replace placeholder images in:
- `src/assets/images/products/` - Product images (500x500px recommended)
- `src/assets/images/categories/` - Category images (400x300px recommended)

## Next Steps

To enhance the application further:

1. **Backend Integration**
   - Connect to a REST API
   - Implement real product data
   - Add authentication

2. **Advanced Features**
   - User accounts
   - Order management
   - Payment gateway
   - Product reviews
   - Search functionality
   - Filters (price, brand, etc.)

3. **Optimization**
   - Lazy loading routes
   - Image optimization
   - SEO improvements
   - Performance tuning

## Troubleshooting

### Common Issues:

1. **Port already in use**
   ```powershell
   # Use a different port
   ng serve --port 4201
   ```

2. **Module not found errors**
   ```powershell
   # Clear cache and reinstall
   Remove-Item -Recurse -Force node_modules
   npm install
   ```

3. **Build errors**
   ```powershell
   # Clean Angular cache
   Remove-Item -Recurse -Force .angular
   npm start
   ```

## Support

For questions or issues:
- Check the README.md
- Review component documentation
- Check Angular documentation: https://angular.io

---

Happy Coding! 🚀
