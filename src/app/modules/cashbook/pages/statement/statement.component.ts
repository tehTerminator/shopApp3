import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styles: ['']
})
export class StatementComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('View Statement | ShopApp');
  }
}
