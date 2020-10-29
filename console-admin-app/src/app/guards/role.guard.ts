import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(!this.authService.isAuthenticated()){
      this.router.navigate(['']);
      return false;
    }
    let role = next.data['role'] as string;
    console.log(role);
    if(this.authService.hasRole(role)){
      return true;
    }
    if(role === 'ROLE_ADMIN'){
      this.router.navigate(['/dashboard']);
    }else if(role=== 'ROLE_USER'){
      this.router.navigate(['/posts']);
    }
    
    return false;
  }

}
