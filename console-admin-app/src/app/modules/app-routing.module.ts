import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { DefaultComponent } from '../components/layouts/default/default.component';
import { PostsComponent } from '../components/posts/posts.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';

const routes: Routes=[{
  path:'',
  component: DefaultComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuard,RoleGuard]
    ,data:{role:'ROLE_ADMIN'}
  },{
    path: 'posts',
    component: PostsComponent,
    canActivate:[AuthGuard,RoleGuard]
    ,data:{role:'ROLE_USER'}
  },{
    path: '',
    component: LoginComponent
  }]
}]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot(routes)
  ],exports:[RouterModule]
})
export class AppRoutingModule { }
