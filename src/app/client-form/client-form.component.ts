import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../shared/service/cart.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  items = this.cartService.getItems();
  checkoutForm = this.formBuilder.group({ name: '', phone: '', address: '' });
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}
  onSubmit(): void {
    if (this.checkoutForm.value.name && this.checkoutForm.value.address && this.checkoutForm.value.phone) {
      this.checkoutForm.reset();
    }
  }
}
