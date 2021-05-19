import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  template: `
    <div class="card">
      <div class="card-body">
        <h1 class="fs-1 text-center m-5 p-5">
          Welcome to Shop App
        </h1>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class DefaultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
