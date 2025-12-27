import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { Product, Category } from '../../models/product.model';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  private authService = inject(AuthService);
  private productService = inject(ProductService);
  private router = inject(Router);

  products: Product[] = [];
  categories: Category[] = [];
  brands: any[] = [];
  filteredProducts: Product[] = [];
  
  showAddModal = false;
  showEditModal = false;
  selectedProduct: Product | null = null;
  
  // Form data
  productForm: Partial<Product> = {
    name: '',
    brand: 'ACEBOTT',
    category: '',
    price: 0,
    originalPrice: 0,
    image: '',
    inStock: true,
    isHot: false,
    description: '',
    aboutProduct: ''
  };

  // Filters
  searchTerm = '';
  selectedCategory = '';
  selectedBrand = '';

  successMessage = '';
  errorMessage = '';

  selectedImageFile: File | null = null;
  imagePreview: string | null = null;
  imageUploadMode: 'file' | 'url' = 'file';
  imageUrlInput: string = '';

  ngOnInit() {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }

    this.loadData();
  }

  loadData() {
    this.products = this.productService.getAllProducts();
    this.categories = this.productService.getAllCategories();
    this.brands = this.productService.getBrands();
    this.filteredProducts = [...this.products];
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = !this.searchTerm || 
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.id.toString().includes(this.searchTerm);
      
      const matchesCategory = !this.selectedCategory || 
        product.category.toLowerCase() === this.selectedCategory.toLowerCase();
      
      const matchesBrand = !this.selectedBrand || 
        product.brand.toLowerCase() === this.selectedBrand.toLowerCase();

      return matchesSearch && matchesCategory && matchesBrand;
    });
  }

  getSubcategories() {
    const category = this.categories.find(c => c.slug === this.productForm.category);
    return category?.subcategories || [];
  }

  openAddModal() {
    this.productForm = {
      name: '',
      brand: 'ACEBOTT',
      category: '',
      subcategory: '',
      price: 0,
      originalPrice: 0,
      image: '',
      inStock: true,
      isHot: false,
      description: '',
      aboutProduct: ''
    };
    this.selectedImageFile = null;
    this.imagePreview = null;
    this.imageUrlInput = '';
    this.imageUploadMode = 'file';
    this.showAddModal = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  openEditModal(product: Product) {
    this.selectedProduct = product;
    this.productForm = { ...product };
    
    // Convert category display name to slug for dropdown
    const categoryMatch = this.categories.find(c => 
      c.name.toLowerCase() === product.category.toLowerCase() ||
      c.slug === product.category
    );
    if (categoryMatch) {
      this.productForm.category = categoryMatch.slug;
    }
    
    // Set image preview if product has an image
    if (product.image) {
      this.imagePreview = product.image;
      this.imageUrlInput = product.image;
      // Determine mode based on whether it's a local asset or external URL
      if (product.image.startsWith('assets/') || product.image.startsWith('/assets/')) {
        this.imageUploadMode = 'file';
      } else {
        this.imageUploadMode = 'url';
      }
    }
    
    this.showEditModal = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  closeModals() {
    this.showAddModal = false;
    this.showEditModal = false;
    this.selectedProduct = null;
    this.selectedImageFile = null;
    this.imagePreview = null;
    this.imageUrlInput = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  addProduct() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.validateForm()) {
      return;
    }

    try {
      // Convert category slug to category name
      const categoryObj = this.categories.find(c => c.slug === this.productForm.category);
      const categoryName = categoryObj ? categoryObj.name : (this.productForm.category || '');
      
      // Generate new product ID
      const maxId = Math.max(...this.products.map(p => parseInt(p.id as string)), 0);
      const newProduct: Product = {
        ...this.productForm as Product,
        id: (maxId + 1).toString(),
        category: categoryName, // Use category name, not slug
        rating: 5,
        isNew: false
      };

      // Check if image is too large for localStorage
      if (newProduct.image && newProduct.image.startsWith('data:')) {
        const sizeInBytes = newProduct.image.length;
        console.log('Base64 image size:', sizeInBytes, 'bytes');
        
        if (sizeInBytes > 100000) { // 100KB limit for base64
          this.errorMessage = 'Image is too large for storage. Please use a smaller image or provide an image URL instead.';
          return;
        }
      }

      // Add to products array
      this.products.push(newProduct);
      
      try {
        this.productService.setProducts(this.products);
        // Save to localStorage
        localStorage.setItem('drone_shop_products', JSON.stringify(this.products));
      } catch (storageError: any) {
        console.error('Storage error:', storageError);
        // Remove the product we just added since storage failed
        this.products.pop();
        
        if (storageError.name === 'QuotaExceededError' || storageError.code === 22) {
          this.errorMessage = 'Storage quota exceeded. Try using image URLs instead of uploading files, or delete some products first.';
        } else {
          this.errorMessage = 'Failed to save product: ' + storageError.message;
        }
        return;
      }
      
      this.filteredProducts = [...this.products];
      
      this.successMessage = 'Product added successfully!';
      setTimeout(() => {
        this.closeModals();
        this.filterProducts();
      }, 1500);
    } catch (error) {
      console.error('Error adding product:', error);
      this.errorMessage = 'Failed to add product. Please try again or use an image URL instead of uploading a file.';
    }
  }

  updateProduct() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.validateForm() || !this.selectedProduct) {
      return;
    }

    try {
      // Convert category slug to category name
      const categoryObj = this.categories.find(c => c.slug === this.productForm.category);
      const categoryName = categoryObj ? categoryObj.name : (this.productForm.category || '');
      
      // Check if image is too large for localStorage
      if (this.productForm.image && this.productForm.image.startsWith('data:')) {
        const sizeInBytes = this.productForm.image.length;
        console.log('Base64 image size:', sizeInBytes, 'bytes');
        
        if (sizeInBytes > 100000) { // 100KB limit for base64
          this.errorMessage = 'Image is too large for storage. Please use a smaller image or provide an image URL instead.';
          return;
        }
      }

      const index = this.products.findIndex(p => p.id === this.selectedProduct!.id);
      if (index !== -1) {
        this.products[index] = {
          ...this.productForm as Product,
          id: this.selectedProduct.id,
          category: categoryName // Use category name, not slug
        };
        
        try {
          this.productService.setProducts(this.products);
          // Save to localStorage
          localStorage.setItem('drone_shop_products', JSON.stringify(this.products));
        } catch (storageError: any) {
          console.error('Storage error:', storageError);
          
          if (storageError.name === 'QuotaExceededError' || storageError.code === 22) {
            this.errorMessage = 'Storage quota exceeded. Try using image URLs instead of uploading files.';
          } else {
            this.errorMessage = 'Failed to save product: ' + storageError.message;
          }
          return;
        }
        
        this.filteredProducts = [...this.products];
        
        this.successMessage = 'Product updated successfully!';
        setTimeout(() => {
          this.closeModals();
          this.filterProducts();
        }, 1500);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      this.errorMessage = 'Failed to update product. Please try again.';
    }
  }

  deleteProduct(product: Product) {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      this.products = this.products.filter(p => p.id !== product.id);
      this.productService.setProducts(this.products);
      this.filterProducts();
    }
  }

  validateForm(): boolean {
    if (!this.productForm.name || !this.productForm.category) {
      this.errorMessage = 'Product name and category are required';
      return false;
    }

    if (!this.productForm.price || this.productForm.price <= 0) {
      this.errorMessage = 'Valid price is required';
      return false;
    }

    return true;
  }

  toggleStock(product: Product) {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index].inStock = !this.products[index].inStock;
      this.productService.setProducts(this.products);
      this.filteredProducts = [...this.products];
    }
  }

  toggleHot(product: Product) {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index].isHot = !this.products[index].isHot;
      this.productService.setProducts(this.products);
      this.filteredProducts = [...this.products];
    }
  }

  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImageFile = input.files[0];
      console.log('File selected:', this.selectedImageFile.name, 'Size:', this.selectedImageFile.size);
      
      // Validate file type
      if (!this.selectedImageFile.type.startsWith('image/')) {
        this.errorMessage = 'Please select a valid image file';
        this.selectedImageFile = null;
        return;
      }

      // Validate file size (max 5MB)
      if (this.selectedImageFile.size > 5 * 1024 * 1024) {
        this.errorMessage = 'Image size should be less than 5MB';
        this.selectedImageFile = null;
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
        // Store base64 image directly so it works immediately
        this.productForm.image = e.target?.result as string;
        console.log('Image loaded, base64 length:', this.productForm.image?.length);
      };
      reader.readAsDataURL(this.selectedImageFile);
      
      this.errorMessage = '';
    }
  }

  clearImage() {
    this.selectedImageFile = null;
    this.imagePreview = null;
    this.imageUrlInput = '';
    this.productForm.image = '';
  }

  switchImageMode(mode: 'file' | 'url') {
    this.imageUploadMode = mode;
    this.clearImage();
  }

  onImageUrlInput() {
    if (!this.imageUrlInput || !this.imageUrlInput.trim()) {
      this.errorMessage = 'Please enter a valid image URL';
      return;
    }

    // Validate URL format
    try {
      new URL(this.imageUrlInput);
    } catch {
      this.errorMessage = 'Please enter a valid URL';
      return;
    }

    // Set preview and use URL directly as image source
    this.imagePreview = this.imageUrlInput;
    this.productForm.image = this.imageUrlInput;
    this.errorMessage = '';
  }

  resetToDefaults() {
    if (confirm('This will reset all products to the default data from the code. Are you sure?')) {
      const success = this.productService.resetToDefaultProducts();
      if (success) {
        alert('Products reset successfully! The page will reload.');
        window.location.reload();
      } else {
        alert('Failed to reset products. Please try again.');
      }
    }
  }
}
