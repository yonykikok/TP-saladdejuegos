import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/servicios/auth.service';
@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  @Input() title: string;
  @Input() srcLink: string;
  @Input() nameLink: string;
  @Input() routerLinkk: string;
  @Input() nameRouterLink: string;
  @Input() img: string;
  @Input() srcLinkBoolean: boolean = false;
  @Input() routerLinkBoolean: boolean = false;
  @Input() isLogged: boolean = false;
  @Input() mostrarBoton: boolean = false;
  constructor(private angularFireAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.isLogged = this.authService.isLogged;
  }

  logout() {
    this.angularFireAuth.auth.signOut();
    this.router.navigateByUrl('/Login');
  }
}
