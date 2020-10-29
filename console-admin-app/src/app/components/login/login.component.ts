import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStandard } from 'src/app/model/UserStandard';
import { AuthService } from 'src/app/service/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  usuario: UserStandard;

  constructor(public router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.usuario = new UserStandard();
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/dashboard']);
    }
  }

  ingresar(): void {
    if (this.usuario.username == null || this.usuario.password == null) {
      console.error('Username o password vacio');
      return;
    }
    this.authService.login(this.usuario).subscribe(
      response => {
        let usuario = this.authService.usuario;
        console.log(response);
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        debugger;
        if(this.authService.usuario.roles[0] === 'ROLE_ADMIN'){
          this.router.navigate(['/dashboard']);
        }else if(this.authService.usuario.roles[0] === 'ROLE_USER'){
          this.router.navigate(['/posts']);
        }
        
      },
      err=>{
        console.log(err);
      }
    )



  }

}
