import { Component, inject, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-quote-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quote-sidebar.component.html',
  styleUrls: ['./quote-sidebar.component.css']
})
export class QuoteSidebarComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  
  quoteService = inject(QuoteService);

  get quoteItems() {
    return this.quoteService.getQuoteItems();
  }

  get quoteCount() {
    return this.quoteService.quoteCount();
  }

  closeSidebar() {
    this.close.emit();
  }

  removeItem(productId: string) {
    this.quoteService.removeFromQuote(productId);
  }

  updateQuantity(productId: string, change: number) {
    const item = this.quoteService.getQuoteItems().find(i => i.product.id === productId);
    if (item) {
      this.quoteService.updateQuantity(productId, item.quantity + change);
    }
  }
}
