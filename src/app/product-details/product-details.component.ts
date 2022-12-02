import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../shared/model/products.model';
import { CartService } from '../shared/service/cart.service';
import { ProductsService } from '../shared/service/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct;
  isFirst: boolean = true;
  isLast: boolean = false;
  images: string[] = [];
  index: number = 0;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.getProduct(productId);
  }
  getProduct(id: number) {
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
      this.images = data.images;
    });
  }
  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
   getAddedProducts(product: IProduct) {
    const addedItems = this.cartService.getItems();
    return addedItems.find((item) => item.id === product.id);
  }
  goNext() {
    if (this.index == this.images.length - 2) {
      this.isLast = true;
    }
    if (this.index < this.images.length - 1) {
      this.index++;
      this.isFirst = false;
    }
  }
  goPrev() {
    if (this.index == 1) {
      this.isFirst = true;
    }
    if (this.index > 0) {
      this.index--;
      this.isLast = false;
    }
  }
}
