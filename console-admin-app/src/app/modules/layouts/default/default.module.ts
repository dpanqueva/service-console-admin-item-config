import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from 'src/app/components/layouts/default/default.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { AppRoutingModule } from '../../app-routing.module';
import { PostsComponent } from 'src/app/components/posts/posts.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { LoginComponent } from 'src/app/components/login/login.component';
import { BankParametersComponent } from 'src/app/components/bank-parameters/bank-parameters.component';



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    BankParametersComponent,
    LoginComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [CommonModule,
    AppRoutingModule,
    DefaultComponent,
    BankParametersComponent,
    DashboardComponent,
    PostsComponent,
    SharedModule,
    LoginComponent
  ],entryComponents:[
    DefaultComponent,
    BankParametersComponent,
    DashboardComponent,
  ]
})
export class DefaultModule { }
