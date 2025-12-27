import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css']
})
export class WhatsappComponent {
  // WhatsApp business number (update with actual number)
  whatsappNumber = '919951130198'; // Format: country code + number (no + or spaces)
  
  quickMessages = [
    {
      title: 'Product Inquiry',
      message: 'Hi, I would like to know more about your products.'
    },
    {
      title: 'Order Status',
      message: 'Hi, I would like to check my order status.'
    },
    {
      title: 'Technical Support',
      message: 'Hi, I need technical support for my purchase.'
    },
    {
      title: 'Bulk Order',
      message: 'Hi, I am interested in placing a bulk order.'
    }
  ];

  sendWhatsAppMessage(message: string) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }
}
