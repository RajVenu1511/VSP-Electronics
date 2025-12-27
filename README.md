# VSP Electronics - Angular E-commerce Website

This is a complete Angular e-commerce application clone of [vspelectronics.com](https://www.vspelectronics.com). The application features a modern, responsive design for selling drone parts, robotics components, and DIY electronic kits.

## Features

- **Home Page** with featured categories, products, and brands
- **Product Listing** with filters, sorting, and search
- **Product Detail** pages with image gallery
- **Shopping Cart** functionality
- **Wishlist** management
- **Product Comparison** (placeholder)
- **About Us** page
- **Contact Us** page with form
- **Responsive Design** - works on all devices
- **Modern UI** with smooth animations

## Tech Stack

- **Angular 17** (Standalone Components)
- **TypeScript**
- **CSS3** with Flexbox & Grid
- **Font Awesome** icons
- **RxJS** for state management

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   ├── footer/
│   │   └── product-card/
│   ├── pages/
│   │   ├── home/
│   │   ├── product-list/
│   │   ├── product-detail/
│   │   ├── cart/
│   │   ├── wishlist/
│   │   ├── compare/
│   │   ├── about-us/
│   │   └── contact-us/
│   ├── services/
│   │   ├── product.service.ts
│   │   ├── cart.service.ts
│   │   └── wishlist.service.ts
│   ├── models/
│   │   └── product.model.ts
│   ├── app.component.ts
│   └── app.routes.ts
├── assets/
│   └── images/
├── styles.css
└── index.html
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
   ```bash
   cd c:\git\drone-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:4200
   ```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Build in watch mode
- `npm test` - Run unit tests

## Features Overview

### Home Page
- Hero banner with call-to-action
- Featured product categories grid
- Featured products showcase
- Brand listing
- Customer testimonials
- Feature highlights (shipping, support, etc.)

### Product Pages
- Product grid/list view
- Category filtering
- Price range filtering
- Brand filtering
- Sort by name, price
- Product cards with quick actions

### Product Detail
- Image gallery
- Product information
- Add to cart/wishlist
- Quantity selector
- Related products (coming soon)

### Shopping Cart
- View cart items
- Update quantities
- Remove items
- Cart summary with totals
- Proceed to checkout (placeholder)

### Wishlist
- Save favorite products
- Quick add to cart from wishlist
- Remove from wishlist

## Customization

### Adding New Products

Edit `src/app/services/product.service.ts` and add products to the `products` array:

```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  price: 1999,
  image: 'assets/images/products/image.jpg',
  category: 'Category',
  brand: 'Brand',
  rating: 4.5,
  inStock: true,
  isHot: true,
  description: 'Product description'
}
```

### Adding Categories

Edit the `categories` array in the same file.

### Styling

Global styles are in `src/styles.css`. Component-specific styles are in each component's CSS file.

## Images

The application uses placeholder images. To add real images:

1. Place product images in `src/assets/images/products/`
2. Place category images in `src/assets/images/categories/`
3. Update the image paths in the product service

### Recommended Image Sizes
- Product images: 500x500px
- Category images: 400x300px
- Thumbnails: 100x100px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- User authentication
- Order management
- Payment integration
- Product reviews
- Search functionality
- Admin panel
- Email notifications
- Product comparison feature
- Advanced filtering

## License

This project is for educational purposes.

## Contact

For questions or support, please contact:
- Email: info@vspelectronics.com
- Phone: +91 9876543210

---

Built with ❤️ using Angular
