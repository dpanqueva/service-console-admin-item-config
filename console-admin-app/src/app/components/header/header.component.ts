import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() propagar:EventEmitter<any> = new EventEmitter();
  
  constructor(public authService: AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  onPropagar(){
    console.log('cambio en sidebarMenu');
    this.propagar.emit();
  }

  sureExit():void{
    console.log('Salida segura');
    this.authService.logout();
    this.router.navigate([""]);
  }

}
