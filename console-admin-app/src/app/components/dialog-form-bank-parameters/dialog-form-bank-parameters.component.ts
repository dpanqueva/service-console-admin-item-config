import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BankOptionsEncrypt } from 'src/app/model/bank-options-encrypt';
import { BankParameters } from 'src/app/model/bank-parameters';
import { BankParametersPK } from 'src/app/model/bank-parameters-pk';
import { BankParametersRQ } from 'src/app/model/bank-parameters-rq';
import { BankWallet } from 'src/app/model/bank-wallet';
import { BankWalletService } from 'src/app/service/generic/bank-wallet.service';
import { GenericServiceService } from 'src/app/service/generic/generic-service.service';



@Component({
  selector: 'app-dialog-form-bank-parameters',
  templateUrl: './dialog-form-bank-parameters.component.html'
})
export class DialogFormBankParametersComponent implements OnInit {

  public bankParameters: BankParameters = new BankParameters();
  public bankParametersPK: BankParametersPK = new BankParametersPK();
  public operaciones: BankWallet[];

  public handleSelected: string;
  public encrypSelected: string;
  public paramValue: string;
  public paramName: string;

  enctypOptions: BankOptionsEncrypt[] = [
    { id: '1', value: 'Si' },
    { id: '0', value: 'No' }
  ]


  constructor(
    public dialogRef: MatDialogRef<DialogFormBankParametersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BankParametersRQ
    , private walletService: BankWalletService
    , private genericService: GenericServiceService) { }


  ngOnInit(): void {

    // observador wallet
    this.walletService.getWalletBank().subscribe(
      response => this.operaciones = response);
    if (this.data) {
      this.encrypSelected = this.data.isEncrypt.toString();
      this.handleSelected = this.data.handle;
      this.paramValue = this.data.paramValue;
      this.paramName = this.data.paramName;
      console.log(this.encrypSelected);
    }
  }

  cancelDeleteParameter(): void {
    this.dialogRef.close();
  }

  saveParameter(): void {
    debugger;
    if (!this.data) {
      console.log('Creando....');
      this.bankParametersPK.handle = this.handleSelected;
      this.bankParametersPK.paramName = this.paramName;
      this.bankParameters.paramValue = this.paramValue;
      this.bankParameters.isEncrypt = this.encrypSelected;

      this.bankParameters.bankParametersPK = this.bankParametersPK;
      this.genericService.create(this.bankParameters).subscribe(
        response => {
          console.log(response);

        },
        err => {
          console.error(err);
        },
        () => {
          console.log('Parametro insertado');
        }
      );
    } else {
      debugger;
      console.log('Modificando....');
      this.bankParametersPK.handle = this.handleSelected;
      this.bankParametersPK.paramName = this.paramName;
      this.bankParameters.paramValue = this.paramValue;
      this.bankParameters.isEncrypt = this.encrypSelected;
      this.bankParameters.bankParametersPK = this.bankParametersPK;
      this.genericService.update(this.bankParameters).subscribe(
        response => {
          console.log(response);

        },
        err => {
          console.error(err);
        },
        () => {
          console.log('Parametro insertado');
        }
      );
    }

    console.log('guardando');
    this.dialogRef.disableClose;
    this.dialogRef.close();
  }
}
