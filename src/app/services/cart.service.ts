import { Injectable, signal, computed, inject } from '@angular/core';
import { CartItem, Product } from '../models/product.model';
import { AnalyticsService } from './analytics.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);
  private analyticsService = inject(AnalyticsService);
  private authService = inject(AuthService);
  
  cartCount = computed(() => {
    return this.cartItems().reduce((total: number, item: CartItem) => total + item.quantity, 0);
  });

  cartTotal = computed(() => {
    return this.cartItems().reduce((total: number, item: CartItem) => total + (item.product.price * item.quantity), 0);
  });

  getCartItems() {
    return this.cartItems();
  }

  addToCart(product: Product, quantity: number = 1) {
    const items = this.cartItems();
    const existingItem = items.find((item: CartItem) => item.product.id === product.id);

    if (existingItem) {
      this.updateQuantity(product.id, existingItem.quantity + quantity);
    } else {
      this.cartItems.set([...items, { product, quantity }]);
    }
    
    // Track cart activity
    const user = this.authService.currentUser();
    if (user) {
      this.analyticsService.trackTransaction({
        userId: user.id,
        userName: user.name,
        type: 'cart',
        items: this.cartCount(),
        amount: this.cartTotal()
      });
    }
  }

  removeFromCart(productId: string) {
    this.cartItems.set(this.cartItems().filter((item: CartItem) => item.product.id !== productId));
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItems.set(
      this.cartItems().map((item: CartItem) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  clearCart() {
    this.cartItems.set([]);
  }

  checkout() {
    // Track order transaction
    const user = this.authService.currentUser();
    if (user && this.cartItems().length > 0) {
      this.analyticsService.trackTransaction({
        userId: user.id,
        userName: user.name,
        type: 'order',
        items: this.cartCount(),
        amount: this.cartTotal()
      });
    }
    this.clearCart();
  }
}
