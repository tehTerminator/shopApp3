import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-back-btn',
  templateUrl: './go-back-btn.component.html',
  styleUrls: ['./go-back-btn.component.css']
})
export class GoBackBtnComponent {
  constructor(private router: Router) { }

  goBack(): void {
    const path = this.generateRoute();
    this.router.navigate(path);
  }

  get currentPath(): string[] {
    const url = this.router.url;
    return url.substr(1, url.length).split('/');
  }

  private generateRoute(): string[] {
    const path = ['/invoices', 'create'];

    if (this.currentPath.length < 3 && this.currentPath[1] !== 'create') {
      return [];
    }

    switch (this.currentPath[2]) {
      case 'list-items':
        path.push('select-customer');
        break;
      case 'transactions':
        path.push('list-items');
        break;
      case 'paymentMethod':
        path.push('list-items');
        break;
      default:
        path.push('select-customer');
        break;
    }

    return path;
  }

  showBtn(): boolean {
    if (this.currentPath.length < 3) {
      return false;
    }

    if (this.currentPath[1] !== 'create') {
      return false;
    }

    if (this.currentPath[2] === 'select-customer'){
      return false;
    }

    return true;
  }
}
