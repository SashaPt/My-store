import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/model/products.model';
import { CartService } from '../shared/service/cart.service';
import { ProductsService } from '../shared/service/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  searchedProducts: IProduct[] = [];
  limit: number = 20;
  totalItems: number = 0;
  lastPageItems: number | null = null;
  showNewItems: boolean = false;
  isLoaded: boolean = false;
  searchValue: string = '';
  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.isLoaded = false;
    if (!this.totalItems || this.limit <= this.totalItems) {
      this.showNewItems = true;
      this.productsService
        .getProducts(this.searchValue, this.limit)
        .subscribe((data) => {
          this.products = data.products;
          this.isLoaded = true;
          this.totalItems = data.total;
          if (!this.lastPageItems && this.lastPageItems !== 0) {
            this.lastPageItems = this.totalItems % this.limit;
          }
          if (this.limit == this.totalItems) {
            this.showNewItems = false;
          }
          this.limit += 20;
          if (this.limit > this.totalItems) {
            this.limit -= 20;
            this.limit += this.lastPageItems;
          }
        });
    }
  }
  share() {
    window.alert('The product has been shared!');
  }
  searchProducts() {
    this.limit = 20;
    this.totalItems = 0;
    this.lastPageItems = null;
    this.getProducts();
  }
  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
  getDraggableProduct(product: IProduct) {
    this.cartService.setDraggableItem(product);
  }
  inputDragEvent(event: Event) {
    event.preventDefault();
  }
}
