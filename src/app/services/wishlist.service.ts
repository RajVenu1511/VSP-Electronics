import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems = signal<Product[]>([]);

  getWishlistItems() {
    return this.wishlistItems();
  }

  addToWishlist(product: Product) {
    const items = this.wishlistItems();
    if (!items.find((p: Product) => p.id === product.id)) {
      this.wishlistItems.set([...items, product]);
    }
  }

  removeFromWishlist(productId: string) {
    this.wishlistItems.set(this.wishlistItems().filter((p: Product) => p.id !== productId));
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistItems().some((p: Product) => p.id === productId);
  }

  getWishlistCount() {
    return this.wishlistItems().length;
  }
}
