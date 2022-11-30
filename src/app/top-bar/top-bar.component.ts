import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/model/products.model';
import { CartService } from '../shared/service/cart.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  count = this.calcProducts();
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}
  dragover(event: Event) {
    event.preventDefault();
  }
  dragenter(event: Event) {
    event.preventDefault();
    const element = event.currentTarget as HTMLAnchorElement;
    element.style.boxShadow = '0 0 10px white, 0 0 30px black';
  }
  dragleave(event: Event) {
    event.preventDefault();
    const element = event.currentTarget as HTMLAnchorElement;
    element.style.boxShadow = 'none';
  }
  dragdrop(event: Event) {
    const element = event.currentTarget as HTMLAnchorElement;
    if (element.classList.contains('cart')) {
      element.style.boxShadow = 'none';
      this.addToCart(this.cartService.getDraggableItem());
    }
  }
  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
  calcProducts() {
    return this.cartService.getTotalCount()
  }
}
