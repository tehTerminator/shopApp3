import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-statement',
  template: `
    <app-statement-form></app-statement-form>
    <app-statement-table><app-statement-table>
  `,
  styles: ['']
})
export class StatementComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('View Statement | ShopApp');
  }
}
