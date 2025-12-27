import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { QuoteService } from '../../services/quote.service';
import { WishlistService } from '../../services/wishlist.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product.model';
import { AuthModalComponent } from '../../components/auth-modal/auth-modal.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, AuthModalComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  cartService = inject(CartService);
  quoteService = inject(QuoteService);
  wishlistService = inject(WishlistService);
  authService = inject(AuthService);
  
  showAuthModal = false;
  authModalMessage = '';

  product: Product | undefined;
  quantity: number = 1;
  selectedImage: string = '';
  activeTab: string = 'description';
  reviewRating: number = 0;
  reviewText: string = '';
  reviewName: string = '';
  reviewEmail: string = '';

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.product = this.productService.getProductById(id);
      if (this.product) {
        this.selectedImage = this.product.image;
      }
    });
  }

  getCategorySlug(): string {
    if (!this.product) return '';
    return this.product.category.toLowerCase().replace(/ /g, '-');
  }

  getProductImages(): string[] {
    if (!this.product) return [];
    // For product ID 2, return actual images from the website
    if (this.product.id === '2') {
      return [
        'https://www.agarwalelectronics.com/wp-content/uploads/2024/03/2-WHEEL-ROUND-KIT-1.jpg',
        'https://www.agarwalelectronics.com/wp-content/uploads/2024/03/2-WHEEL-ROUND-KIT-2.jpg'
      ];
    }
    // For product ID 3, return multiple angle images
    if (this.product.id === '3') {
      return [
        'assets/images/products/placeholder.jpg',
        'assets/images/products/placeholder.jpg'
      ];
    }
    // For product ID 6, return actual image from website
    if (this.product.id === '6') {
      return [
        'https://www.agarwalelectronics.com/wp-content/uploads/2024/03/DIY-KIT-AIR-CAR-ROD3-1.jpg'
      ];
    }
    // For other products, return the main image
    return [this.product.image];
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (this.authService.requireLogin()) {
      this.authModalMessage = 'Please login to add items to cart';
      this.showAuthModal = true;
      return;
    }
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
    }
  }

  addToQuote() {
    if (this.authService.requireLogin()) {
      this.authModalMessage = 'Please login to request a quote';
      this.showAuthModal = true;
      return;
    }
    if (this.product) {
      this.quoteService.addToQuote(this.product, this.quantity);
    }
  }

  toggleWishlist() {
    if (this.authService.requireLogin()) {
      this.authModalMessage = 'Please login to add items to wishlist';
      this.showAuthModal = true;
      return;
    }
    if (this.product) {
      if (this.wishlistService.isInWishlist(this.product.id)) {
        this.wishlistService.removeFromWishlist(this.product.id);
      } else {
        this.wishlistService.addToWishlist(this.product);
      }
    }
  }

  closeAuthModal() {
    this.showAuthModal = false;
    this.authModalMessage = '';
  }

  isInWishlist(): boolean {
    return this.product ? this.wishlistService.isInWishlist(this.product.id) : false;
  }

  setRating(rating: number) {
    this.reviewRating = rating;
  }

  submitReview(event: Event) {
    event.preventDefault();
    if (this.reviewRating === 0) {
      alert('Please select a rating');
      return;
    }
    if (!this.reviewText.trim()) {
      alert('Please write a review');
      return;
    }
    if (!this.reviewName.trim() || !this.reviewEmail.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    // In a real application, this would send the review to a backend
    alert('Thank you for your review! It has been submitted for approval.');
    // Reset form
    this.reviewRating = 0;
    this.reviewText = '';
    this.reviewName = '';
    this.reviewEmail = '';
  }

  getDiscountPercentage(): number | null {
    if (this.product?.originalPrice && this.product.originalPrice > this.product.price) {
      const discount = ((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100;
      return Math.round(discount);
    }
    return null;
  }
}
