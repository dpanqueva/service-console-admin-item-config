import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStandard } from 'src/app/model/UserStandard';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuario: UserStandard;
  private _token: string;
  constructor(private http: HttpClient) { }

  public get usuario(): UserStandard {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as UserStandard;
      return this._usuario;
    }
    return new UserStandard();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token')
      return this._token;
    }
    return null;
  }


  login(usuario: UserStandard): Observable<any> {
    debugger;
    const urlEndpoint = 'security/oauth/token';
    const credenciales = btoa('frontendapp' + ':' + '12345');
    let params = new URLSearchParams();
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    console.log(params.toString());
    return this.http.post(environment.BASE_URL + urlEndpoint, params.toString(), { headers: httpHeaders });
  }


  guardarUsuario(accessToken: string): void {
    let payLoad = this.obtenerDatosToken(accessToken);
    this._usuario = new UserStandard();
    this._usuario.name = payLoad.name;
    this._usuario.lastName = payLoad.last_name;
    this._usuario.email = payLoad.email;
    this._usuario.username = payLoad.user_name;
    this._usuario.roles = payLoad.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      let payLoad = JSON.parse(atob(accessToken.split(".")[1]));
      return payLoad;
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payLoad = this.obtenerDatosToken(this.token);
    if (payLoad != null && payLoad.user_name && payLoad.user_name.length > 0) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    //sessionStorage.removeItem('token');
    //sessionStorage.removeItem('usuario');

  }

  hasRole(role: string): boolean {
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }
}