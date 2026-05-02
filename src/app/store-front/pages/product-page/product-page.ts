import { Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.html',
})
export class ProductPage {

  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  params: string = this.route.snapshot.params['idSlug'];

  productSlug = computed( () => {
    return this.params;
  })

  productResource = rxResource({
    request: () => ({ idSlug: this.productSlug }),
    loader: ({request}) => {
      return this.productsService.getProductByIdSlug(request.idSlug())
    }
  })
}
