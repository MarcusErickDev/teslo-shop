import { Component, effect, inject, OnInit } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { ProductCard } from '@products/components/product-card/product-card';
import { ProductsService } from '@products/services/products.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
})
export class HomePage implements OnInit{

  products: any;


  constructor(){
    effect( () => {
      console.log(this.productsResource.value()?.products);
      this.products = this.productsResource.value()?.products;
    })
  }

  productsService = inject(ProductsService);

  ngOnInit(): void {
  }


  productsResource = rxResource({
    request: () => ({}),
    loader: ({ request }) => {
      return this.productsService.getProducts({
        // limit: 1,
        // offset: 0,
        // gender: 'women'
      });
    },
  });

}
