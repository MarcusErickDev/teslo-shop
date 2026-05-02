import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.html',
})
export class ProductPage implements OnInit{

  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  params: string = this.route.snapshot.params['idSlug'];

  productSlug = computed( () => {
    return this.params;
  })

  constructor(){
    effect( () => {
      console.log(this.productResource.value());
    })
  }

  ngOnInit(): void {

    // this.route.params
    // .subscribe( ({idSlug}) => {
    //   this.params = idSlug;
    // })

  }

  productResource = rxResource({
    request: () => ({ idSlug: this.productSlug }),
    loader: ({request}) => {
      return this.productsService.getProductByIdSlug(this.productSlug())
    }
  })
}
