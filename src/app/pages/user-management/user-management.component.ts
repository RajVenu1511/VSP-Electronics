import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { AnalyticsService } from '../../services/analytics.service';

export interface UserAnalytics {
  user: User;
  totalPurchases: number;
  totalAmount: number;
  lastPurchaseDate: string;
  browsingScore: number;
  purchaseScore: number;
  overallGrade: string;
  gradeColor: string;
  activityDays: number;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  private authService = inject(AuthService);
  private analyticsService = inject(AnalyticsService);
  private router = inject(Router);

  users: UserAnalytics[] = [];
  filteredUsers: UserAnalytics[] = [];
  searchTerm: string = '';
  sortBy: 'name' | 'email' | 'grade' | 'purchases' | 'amount' | 'activity' = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  
  // Push notification
  showNotificationModal: boolean = false;
  notificationTitle: string = '';
  notificationMessage: string = '';
  selectedUsers: Set<string> = new Set();
  selectAll: boolean = false;

  ngOnInit() {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }
    
    this.loadUsers();
  }

  loadUsers() {
    const allUsers = this.authService.getAllUsers();
    const transactions = this.analyticsService.getTransactions();
    
    this.users = allUsers.map(user => {
      // Calculate user metrics
      const userTransactions = transactions.filter(t => t.userId === user.id);
      const totalPurchases = userTransactions.filter(t => t.type === 'order').length;
      const totalAmount = userTransactions
        .filter(t => t.type === 'order' && t.amount)
        .reduce((sum, t) => sum + (t.amount || 0), 0);
      
      const lastPurchase = userTransactions
        .filter(t => t.type === 'order')
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
      
      const lastPurchaseDate = lastPurchase ? lastPurchase.timestamp : user.createdAt;
      
      // Calculate activity days (unique days with transactions)
      const uniqueDays = new Set(
        userTransactions.map(t => t.timestamp.split('T')[0])
      );
      const activityDays = uniqueDays.size;
      
      // Calculate scores
      const browsingScore = Math.min(100, activityDays * 10);
      const purchaseScore = Math.min(100, totalPurchases * 20);
      const amountScore = Math.min(100, (totalAmount / 1000) * 10);
      
      const overallScore = (browsingScore * 0.3) + (purchaseScore * 0.4) + (amountScore * 0.3);
      
      // Determine grade
      let grade = 'F';
      let gradeColor = '#dc3545';
      
      if (overallScore >= 90) {
        grade = 'A+';
        gradeColor = '#28a745';
      } else if (overallScore >= 80) {
        grade = 'A';
        gradeColor = '#5cb85c';
      } else if (overallScore >= 70) {
        grade = 'B+';
        gradeColor = '#5bc0de';
      } else if (overallScore >= 60) {
        grade = 'B';
        gradeColor = '#0275d8';
      } else if (overallScore >= 50) {
        grade = 'C';
        gradeColor = '#f0ad4e';
      } else if (overallScore >= 40) {
        grade = 'D';
        gradeColor = '#ff8c00';
      }
      
      return {
        user,
        totalPurchases,
        totalAmount,
        lastPurchaseDate,
        browsingScore,
        purchaseScore,
        overallGrade: grade,
        gradeColor,
        activityDays
      };
    });
    
    this.applyFilters();
  }

  applyFilters() {
    // Apply search filter
    let filtered = this.users;
    
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(u => 
        u.user.name.toLowerCase().includes(term) ||
        u.user.email.toLowerCase().includes(term) ||
        u.user.phone.includes(term)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (this.sortBy) {
        case 'name':
          comparison = a.user.name.localeCompare(b.user.name);
          break;
        case 'email':
          comparison = a.user.email.localeCompare(b.user.email);
          break;
        case 'grade':
          const gradeOrder = { 'A+': 7, 'A': 6, 'B+': 5, 'B': 4, 'C': 3, 'D': 2, 'F': 1 };
          comparison = (gradeOrder[a.overallGrade as keyof typeof gradeOrder] || 0) - 
                      (gradeOrder[b.overallGrade as keyof typeof gradeOrder] || 0);
          break;
        case 'purchases':
          comparison = a.totalPurchases - b.totalPurchases;
          break;
        case 'amount':
          comparison = a.totalAmount - b.totalAmount;
          break;
        case 'activity':
          comparison = a.activityDays - b.activityDays;
          break;
      }
      
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
    
    this.filteredUsers = filtered;
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
  }

  getPaginatedUsers(): UserAnalytics[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  sortTable(column: 'name' | 'email' | 'grade' | 'purchases' | 'amount' | 'activity') {
    if (this.sortBy === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortOrder = 'asc';
    }
    this.applyFilters();
  }

  onSearch() {
    this.currentPage = 1;
    this.applyFilters();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  }

  formatCurrency(amount: number): string {
    return '₹' + amount.toLocaleString('en-IN');
  }

  toggleUserSelection(userId: string) {
    if (this.selectedUsers.has(userId)) {
      this.selectedUsers.delete(userId);
    } else {
      this.selectedUsers.add(userId);
    }
    this.updateSelectAllState();
  }

  toggleSelectAll() {
    this.selectAll = !this.selectAll;
    
    if (this.selectAll) {
      this.getPaginatedUsers().forEach(ua => {
        this.selectedUsers.add(ua.user.id);
      });
    } else {
      this.getPaginatedUsers().forEach(ua => {
        this.selectedUsers.delete(ua.user.id);
      });
    }
  }

  updateSelectAllState() {
    const paginatedUsers = this.getPaginatedUsers();
    this.selectAll = paginatedUsers.length > 0 && 
                     paginatedUsers.every(ua => this.selectedUsers.has(ua.user.id));
  }

  isSelected(userId: string): boolean {
    return this.selectedUsers.has(userId);
  }

  openNotificationModal() {
    if (this.selectedUsers.size === 0) {
      alert('Please select at least one user to send notification');
      return;
    }
    this.showNotificationModal = true;
  }

  closeNotificationModal() {
    this.showNotificationModal = false;
    this.notificationTitle = '';
    this.notificationMessage = '';
  }

  sendNotification() {
    if (!this.notificationTitle.trim() || !this.notificationMessage.trim()) {
      alert('Please fill in both title and message');
      return;
    }

    // In a real app, this would call a backend API to send push notifications
    // For now, we'll store it in localStorage as a log
    const notifications = this.getNotificationLogs();
    const newNotification = {
      id: Date.now().toString(),
      title: this.notificationTitle,
      message: this.notificationMessage,
      recipients: Array.from(this.selectedUsers),
      recipientCount: this.selectedUsers.size,
      timestamp: new Date().toISOString()
    };
    
    notifications.push(newNotification);
    localStorage.setItem('drone_shop_notifications', JSON.stringify(notifications));
    
    alert(`Notification sent to ${this.selectedUsers.size} user(s)`);
    
    // Clear selection and close modal
    this.selectedUsers.clear();
    this.selectAll = false;
    this.closeNotificationModal();
  }

  private getNotificationLogs(): any[] {
    const logs = localStorage.getItem('drone_shop_notifications');
    return logs ? JSON.parse(logs) : [];
  }

  viewUserDetails(user: User) {
    // Navigate to user detail page or show modal
    console.log('View user details:', user);
  }

  exportToCSV() {
    const headers = ['Name', 'Email', 'Phone', 'Grade', 'Purchases', 'Total Amount', 'Activity Days', 'Last Purchase'];
    const rows = this.filteredUsers.map(ua => [
      ua.user.name,
      ua.user.email,
      ua.user.phone,
      ua.overallGrade,
      ua.totalPurchases.toString(),
      ua.totalAmount.toString(),
      ua.activityDays.toString(),
      this.formatDate(ua.lastPurchaseDate)
    ]);
    
    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  getPremiumUsersCount(): number {
    return this.users.filter(u => u.overallGrade === 'A+' || u.overallGrade === 'A').length;
  }

  getTotalPurchases(): number {
    return this.users.reduce((sum, u) => sum + u.totalPurchases, 0);
  }

  getTotalRevenue(): number {
    return this.users.reduce((sum, u) => sum + u.totalAmount, 0);
  }
}
