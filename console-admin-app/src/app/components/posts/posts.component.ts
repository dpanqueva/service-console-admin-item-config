import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { BankParameters } from 'src/app/model/bank-parameters';
import { AuthService } from 'src/app/service/auth/auth.service';
import { BankWalletService } from 'src/app/service/generic/bank-wallet.service';
import { GenericServiceService } from 'src/app/service/generic/generic-service.service';
import { tap } from 'rxjs/operators';
import { BankParametersPK } from 'src/app/model/bank-parameters-pk';
import { Item } from 'src/app/model/itemBank';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private genericService: GenericServiceService,
    private activatedRoute: ActivatedRoute, public dialog: MatDialog
    , private walletService: BankWalletService, public authService: AuthService) { }

  titulo: string = 'Bank Parameters'
  bankParameters: BankParameters[];
  paginadorBoots: any;
  bankItems: Item[];


  displayedColumns: string[] = ['handle', 'paramName', 'paramValue', 'isEncrypt'];
  dataSource: MatTableDataSource<Item>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  ngOnInit(): void {
    this.cargarTabla();
  }


  cargarTabla(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.genericService.getAllItems().pipe(
        tap(response => {
          //console.log('BankParametersComponent: tap 3');
          (response).forEach(
            bank => {
              //console.log(bank.bankParameters);
            }
          );
        })
      ).subscribe(
        (response) => {
          debugger;
          this.bankItems = response as Item[];
          console.log(this.bankItems);
          this.dataSource = new MatTableDataSource<Item>(this.bankItems);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.paginadorBoots = response;
        });
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
