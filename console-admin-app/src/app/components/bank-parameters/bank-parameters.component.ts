import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BankParameters } from 'src/app/model/bank-parameters';

import { tap } from 'rxjs/operators';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { BankWalletService } from 'src/app/service/generic/bank-wallet.service';
import { GenericServiceService } from 'src/app/service/generic/generic-service.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DialogFormBankParametersComponent } from '../dialog-form-bank-parameters/dialog-form-bank-parameters.component';
import { DialogDeleteFormBankParametersComponent } from '../dialog-delete-form-bank-parameters/dialog-delete-form-bank-parameters.component';


@Component({
  selector: 'app-bank-parameters',
  templateUrl: './bank-parameters.component.html',
  styleUrls: ['./bank-parameters.component.css']
})
export class BankParametersComponent implements OnInit {

  constructor(private genericService: GenericServiceService,
    private activatedRoute: ActivatedRoute, public dialog: MatDialog
    , private walletService: BankWalletService, public authService: AuthService) { }

  titulo: string = 'Bank Parameters'
  bankParameters: BankParameters[];
  paginadorBoots: any;

  displayedColumns: string[] = ['handle', 'paramName', 'paramValue', 'isEncrypt', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<BankParameters>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  /**
   * Variables for create a new parameter
   */


  ngOnInit(): void {
    this.cargarTabla();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createParameterForm(): void {
    const dialogRef = this.dialog.open(DialogFormBankParametersComponent);
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result === undefined) {
        this.cargarTabla();
      }
    });
  }

  editParameterForm(bankParametersEdit: BankParameters): void {
    const dialogRef = this.dialog.open(DialogFormBankParametersComponent, {
      width: '250px',
      data: {
        handle: bankParametersEdit.bankParametersPK.handle,
        paramName: bankParametersEdit.bankParametersPK.paramName,
        paramValue: bankParametersEdit.paramValue,
        isEncrypt: bankParametersEdit.isEncrypt
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result === undefined) {
        this.cargarTabla();

      }
      console.log('The Dialog was closed');
    });
  }

  deleteParameterDialog(bankParametersDelete: BankParameters): void {
    const dialogRef = this.dialog.open(DialogDeleteFormBankParametersComponent, {
      width: '250px',
      data: {
        handle: bankParametersDelete.bankParametersPK.handle,
        paramName: bankParametersDelete.bankParametersPK.paramName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.genericService.delete(bankParametersDelete).subscribe(
          response => {
            console.log('response: ');
            console.log(response);
            this.cargarTabla();
            // swit alert
          }
        )
      }
      console.log('The dialog was closed');
      console.log(result);

    });
  }

  cargarTabla(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.genericService.getAllParameters().pipe(
        tap(response => {
          //console.log('BankParametersComponent: tap 3');
          (response as BankParameters[]).forEach(
            bank => {
              //console.log(bank.bankParametersPK.handle);
            }
          );
        })
      ).subscribe(
        (response) => {
          this.bankParameters = response as BankParameters[];
          this.dataSource = new MatTableDataSource<BankParameters>(this.bankParameters);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.paginadorBoots = response;
        });
    });

  }


}
