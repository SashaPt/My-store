import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.shippingCosts = this.cartService.getShippingPrices();
  }

  onSubmit(event: Event): void {
    event.preventDefault()
    if (this.selectedShippingOption) {
      this.cartService.setSelectedShipping(this.selectedShippingOption);
    this.router.navigate(['/cart']);
    }
  }
}
