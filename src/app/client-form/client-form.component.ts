import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';
import { CartService } from '../shared/service/cart.service';
import { DialogService } from '../shared/service/dialog.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  checkoutForm = this.formBuilder.group({ name: '', phone: '', address: '' });
  phoneMask = createMask('+[999](99)999-99-99');
  constructor(
    private dialogService: DialogService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}
  closeDialog() {
    this.dialogService.setOpenDialog(false);
  }
  onSubmit(): void {
    if (
      this.checkoutForm.value.name &&
      this.checkoutForm.value.address &&
      this.checkoutForm.value.phone
    ) {
      this.dialogService.setDialogValues({
        name: this.checkoutForm.value.name,
        address: this.checkoutForm.value.address,
        phone: this.checkoutForm.value.phone,
      });
      this.closeDialog();
      this.checkoutForm.reset();
    }
  }
}
