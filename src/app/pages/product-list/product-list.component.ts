import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product, Category } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { AuthModalComponent } from '../../components/auth-modal/auth-modal.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent, AuthModalComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  
  showAuthModal = false;
  authModalMessage = '';

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categoryName: string = '';
  categoryDescription: string = '';
  currentCategory: Category | undefined;
  categories: Category[] = [];
  sortBy: string = 'default';
  brandFilter: string = '';
  showCategories: boolean = false;
  Math = Math;

  trackByProductId(index: number, product: Product): string {
    return product.id;
  }

  trackByCategoryId(index: number, category: Category): string {
    return category.id;
  }

  onLoginRequired(message: string) {
    this.authModalMessage = message;
    this.showAuthModal = true;
  }

  closeAuthModal() {
    this.showAuthModal = false;
    this.authModalMessage = '';
  }

  ngOnInit() {
    // Combine both params and queryParams to handle both category and brand filters
    combineLatest([
      this.route.params,
      this.route.queryParams
    ]).subscribe(([params, queryParams]) => {
      const category = params['category'];
      this.brandFilter = queryParams['brand'] || '';
      this.loadProducts(category);
    });
  }

  private loadProducts(category?: string) {
    let newProducts: Product[] = [];
    
    if (category) {
      // Decode URL encoded category (e.g., raspberry%2Frpi-accessories)
      const decodedCategory = decodeURIComponent(category);
      
      // Handle subcategories
      if (decodedCategory.includes('/')) {
        const parts = decodedCategory.split('/');
        const mainCategory = parts[0].replace(/-/g, ' ');
        const subCategory = parts.slice(1).join('/').replace(/-/g, ' ');
        this.categoryName = `${mainCategory} / ${subCategory}`.toUpperCase();
      } else {
        this.categoryName = decodedCategory.replace(/-/g, ' ').toUpperCase();
      }
      
      this.currentCategory = this.productService.getCategoryBySlug(decodedCategory);
      this.categoryDescription = this.currentCategory?.description || '';
      newProducts = this.productService.getProductsByCategory(decodedCategory);
      this.showCategories = false;
    } else {
      // On /shop page - always show categories
      this.showCategories = true;
      this.categories = this.productService.getCategories();
      this.categoryName = 'Shop';
      this.categoryDescription = '';
      
      // If brand filter is active, also load and show filtered products below categories
      if (this.brandFilter) {
        newProducts = this.productService.getProducts();
      } else {
        this.products = [];
        this.filteredProducts = [];
        return;
      }
    }
    
    // Only update if products changed
    if (JSON.stringify(this.products.map(p => p.id)) !== JSON.stringify(newProducts.map(p => p.id))) {
      this.products = newProducts;
      this.applyFilters();
    }
  }

  private applyFilters() {
    let filtered = [...this.products];
    
    // Apply brand filter if set
    if (this.brandFilter) {
      const normalizedFilter = this.brandFilter.toLowerCase().replace(/-/g, ' ');
      filtered = filtered.filter(p => 
        p.brand.toLowerCase().replace(/-/g, ' ') === normalizedFilter
      );
    }
    
    this.filteredProducts = filtered;
    this.applySorting();
  }

  onSortChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.sortBy = select.value;
    this.applySorting();
  }

  applySorting() {
    const sortedProducts = [...this.products];
    switch (this.sortBy) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    this.filteredProducts = sortedProducts;
  }

  getCategoryDisplayName(): string {
    const categoryMap: { [key: string]: string } = {
      'raspberry': 'Raspberry Pi Boards',
      'raspberry/rpi-accessories': 'RPI Accessories',
      'robotic-diy-kits': 'Robotic DIY Kits',
      'ready-running-projects': 'Ready Running Projects',
      'mini-drone-kits': 'Mini Drone Kits',
      'diy-kits': 'DIY Kits',
      'bonka': 'Bonka Batteries',
      'drone-transmiter-receiver': 'Drone Transmitter and Receiver',
      'agriculture-drone-parts': 'Agriculture Drone Parts'
    };
    
    const slug = decodeURIComponent(this.route.snapshot.params['category'] || '');
    return categoryMap[slug] || this.currentCategory?.name || this.categoryName || 'All Products';
  }
}
