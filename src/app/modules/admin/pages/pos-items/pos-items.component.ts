import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pos-items',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./pos-items.component.css']
})
export class PosItemsComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

}
