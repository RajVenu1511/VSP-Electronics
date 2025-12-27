import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Product, Category, Brand } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { AuthModalComponent } from '../../components/auth-modal/auth-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent, AuthModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productService = inject(ProductService);
  cartService = inject(CartService);
  wishlistService = inject(WishlistService);
  
  showAuthModal = false;
  authModalMessage = '';

  featuredProducts: Product[] = [];
  newProducts: Product[] = [];
  topSellerProducts: Product[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];
  
  activeProductTab: 'featured' | 'new' | 'topSellers' = 'featured';
  displayedProducts: Product[] = [];

  ngOnInit() {
    this.loadData();
  }

  onLoginRequired(message: string) {
    this.authModalMessage = message;
    this.showAuthModal = true;
  }

  closeAuthModal() {
    this.showAuthModal = false;
    this.authModalMessage = '';
  }

  loadData() {
    this.featuredProducts = this.productService.getFeaturedProducts();
    this.newProducts = this.productService.getNewProducts();
    this.topSellerProducts = this.productService.getTopSellerProducts();
    this.categories = this.productService.getCategories();
    this.brands = this.productService.getBrands();
    this.updateDisplayedProducts();
  }
  
  setProductTab(tab: 'featured' | 'new' | 'topSellers') {
    this.activeProductTab = tab;
    this.updateDisplayedProducts();
  }
  
  updateDisplayedProducts() {
    switch(this.activeProductTab) {
      case 'featured':
        this.displayedProducts = this.featuredProducts;
        break;
      case 'new':
        this.displayedProducts = this.newProducts;
        break;
      case 'topSellers':
        this.displayedProducts = this.topSellerProducts;
        break;
    }
  }
}
