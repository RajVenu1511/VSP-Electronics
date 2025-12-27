import { Injectable, signal, computed, inject } from '@angular/core';
import { CartItem, Product } from '../models/product.model';
import { AnalyticsService } from './analytics.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private quoteItems = signal<CartItem[]>([]);
  sidebarOpen = signal<boolean>(false);
  private analyticsService = inject(AnalyticsService);
  private authService = inject(AuthService);
  
  quoteCount = computed(() => {
    return this.quoteItems().reduce((total: number, item: CartItem) => total + item.quantity, 0);
  });

  getQuoteItems() {
    return this.quoteItems();
  }

  addToQuote(product: Product, quantity: number = 1) {
    const items = this.quoteItems();
    const existingItem = items.find((item: CartItem) => item.product.id === product.id);

    if (existingItem) {
      this.updateQuantity(product.id, existingItem.quantity + quantity);
    } else {
      this.quoteItems.set([...items, { product, quantity }]);
    }
    
    // Track quote activity
    const user = this.authService.currentUser();
    if (user) {
      const total = this.quoteItems().reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      this.analyticsService.trackTransaction({
        userId: user.id,
        userName: user.name,
        type: 'quote',
        items: this.quoteCount(),
        amount: total
      });
    }
    
    // Open sidebar when item is added
    this.openSidebar();
  }

  openSidebar() {
    this.sidebarOpen.set(true);
  }

  closeSidebar() {
    this.sidebarOpen.set(false);
  }

  removeFromQuote(productId: string) {
    this.quoteItems.set(this.quoteItems().filter((item: CartItem) => item.product.id !== productId));
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromQuote(productId);
      return;
    }

    this.quoteItems.set(
      this.quoteItems().map((item: CartItem) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  clearQuote() {
    this.quoteItems.set([]);
  }
}
