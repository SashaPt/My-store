import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IShipping } from '../shared/model/products.model';
import { CartService } from '../shared/service/cart.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent implements OnInit {
  shippingCosts!: Observable<IShipping[]>;
  selectedShippingOption!: IShipping;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.shippingCosts = this.cartService.getShippingPrices();
  }

  onSubmit(): void {
    if (this.selectedShippingOption) {
      this.cartService.setSelectedShipping(this.selectedShippingOption);
    }
  }
}
