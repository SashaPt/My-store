import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct, IShipping } from '../model/products.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: IProduct[] = [];
  selectedShipping!: IShipping | null;
  draggableItem!: IProduct;

  constructor(private httpClient: HttpClient) {}

  addToCart(product: IProduct) {
    const cartElement = this.items.find((elem) => elem.title === product.title);
    if (cartElement) {
      this.setProductCount(
        this.items[this.items.indexOf(cartElement)],
        cartElement.count ? cartElement.count + 1 : 1
      );
    } else {
      product.count = 1;
      this.items.push(product);
    }
  }
  removeFromCart(product: IProduct) {
    this.items = this.items.filter((elem) => elem.title !== product.title);
    return this.items;
  }
  getItems() {
    return this.items;
  }
  clearCart() {
    this.items = [];
    return this.items;
  }
  setProductCount(product: IProduct, count: number) {
    this.items
      .filter((elem) => elem.title === product.title)
      .map((elem) => (elem.count = count));
  }
  getTotalPrice() {
    let sum = 0;
    for (let i of this.items) {
      if (i.count) {
        sum = sum + i.price * i.count;
      }
    }
    return sum;
  }

  getShippingPrices() {
    return this.httpClient.get<IShipping[]>('assets/shipping.json');
  }
  setSelectedShipping(selected: IShipping| null)  {
    if (this.items.length) {
      this.selectedShipping = selected;
    } else this.selectedShipping = null;
  }
  getSelectedShipping() {
    return this.selectedShipping;
  }

  setDraggableItem(drag: IProduct) {
    this.draggableItem = drag;
  }
  getDraggableItem() {
    return this.draggableItem;
  }
}
