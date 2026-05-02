import { AfterViewInit, Component, computed, effect, ElementRef, input, viewChild } from '@angular/core';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.html',
  styles: `
    .swiper {
      width: 100%;
      height: 500px;
    }
  `
})
export class ProductCarousel implements AfterViewInit{


  images = input.required<string[]>();
  swiperDiv = viewChild.required<ElementRef>('swiperDiv');
  url = 'http://localhost:3000/api/files/product/';



  constructor(){
    effect( () => {
      console.log(this.images())
      console.log(`${this.url}${this.images()[0]}`)
    })
  }



  ngAfterViewInit(): void {
    const element = this.swiperDiv().nativeElement;
    if (!element) return

    console.log(element)
    const swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      modules: [Navigation, Pagination],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
