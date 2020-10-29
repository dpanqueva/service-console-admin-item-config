import { Component, OnInit, Inject } from '@angular/core';
import {  MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BankParametersPK } from 'src/app/model/bank-parameters-pk';
import { GenericServiceService } from 'src/app/service/generic/generic-service.service';


@Component({
  selector: 'app-dialog-delete-form-bank-parameters',
  templateUrl: './dialog-delete-form-bank-parameters.component.html'
})
export class DialogDeleteFormBankParametersComponent implements OnInit {

  private bankParameters: BankParametersPK;

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteFormBankParametersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BankParametersPK, private genericService: GenericServiceService) { }

  ngOnInit(): void {
    if (this.data) {
      this.bankParameters = this.data as BankParametersPK;
      console.log(this.bankParameters);
    }
  }

  cancelDeleteParameter(): void {
    this.dialogRef.close();
  }

}
