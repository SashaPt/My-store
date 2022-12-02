import { Injectable } from '@angular/core';
import { IDialog } from '../model/products.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialogValues!: IDialog | null;
  openDialog: boolean = false;
  getDialogValues() {
    return this.dialogValues;
  }
  setDialogValues(values: IDialog) {
    this.dialogValues = values;
  }
  getOpenDialog() {
    return this.openDialog;
  }
  setOpenDialog(bool: boolean) {
    this.openDialog = bool;
  }
  resetValues() {
    this.dialogValues = null;
  }
}
