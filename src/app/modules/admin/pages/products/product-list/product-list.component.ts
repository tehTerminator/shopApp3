import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../../../shared/collection';
import { ProductService } from '../../../../../shared/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.init(true);
  }

  get products(): Observable<Product[]> {
    return this.productService.getAsObservable() as Observable<Product[]>;
  }

}
