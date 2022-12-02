import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientFormComponent } from '../client-form/client-form.component';
import { IProduct, IShipping } from '../shared/model/products.model';
import { CartService } from '../shared/service/cart.service';
import { DialogService } from '../shared/service/dialog.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items = this.cartService.getItems();
  clientData!: any;
  selectedShipping = this.cartService.getSelectedShipping();
  totalPrice: number = this.cartService.getTotalPrice();
  successMessage: string = '';

  constructor(
    private cartService: CartService,
    private dialogService: DialogService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  getIsOpenDialog() {
    return this.dialogService.getOpenDialog();
  }
  openDialog() {
    this.dialogService.setOpenDialog(true);
  }
  getClientData() {
    const data = this.dialogService.getDialogValues();
    this.clientData = data;
    return data;
  }
  subCount(count: number, item: IProduct) {
    if (count > 1) {
      count--;
      this.cartService.setProductCount(item, count);
      this.totalPrice = this.cartService.getTotalPrice();
    }
  }
  addCount(count: number, item: IProduct) {
    count++;
    this.cartService.setProductCount(item, count);
    this.totalPrice = this.cartService.getTotalPrice();
  }
  deleteProduct(item: IProduct) {
    this.items = this.cartService.removeFromCart(item);
    this.totalPrice = this.cartService.getTotalPrice();
    if (!this.items.length) {
      this.cartService.setSelectedShipping(null);
      this.dialogService.resetValues();
      this.getClientData();
    } 
  }
  purchase() {
    if (this.selectedShipping && this.getClientData()) {
      this.clientData = this.getClientData()
      console.warn(
        `Successfully purchased!\nDetails: total: $${
          this.totalPrice + this.selectedShipping.price
        }, shipping: ${this.selectedShipping.type}, ${
          this.clientData.address
        }, ${this.clientData.name}, ${this.clientData.phone}`
      );
      this.successMessage = `Details: total: $${
        this.totalPrice + this.selectedShipping.price
      }, shipping: ${this.selectedShipping.type}, ${
        this.clientData.address
      }, ${this.clientData.name}, ${this.clientData.phone}`;
    }
    this.items = this.cartService.clearCart();
    this.cartService.setSelectedShipping(null);
    this.dialogService.resetValues();
    this.getClientData();
  }
}
