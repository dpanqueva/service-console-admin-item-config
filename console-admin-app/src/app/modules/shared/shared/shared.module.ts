import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { DialogDeleteFormBankParametersComponent } from 'src/app/components/dialog-delete-form-bank-parameters/dialog-delete-form-bank-parameters.component';
import { DialogFormBankParametersComponent } from 'src/app/components/dialog-form-bank-parameters/dialog-form-bank-parameters.component';
import { MaterialModule } from '../../material.module';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DialogDeleteFormBankParametersComponent,
    DialogFormBankParametersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    MaterialModule,
    DialogDeleteFormBankParametersComponent,
    DialogFormBankParametersComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    RouterModule,
    HttpClientModule
  ],entryComponents:[
    DialogDeleteFormBankParametersComponent,
    DialogFormBankParametersComponent,
  ]
})
export class SharedModule { }
