import { NgModule } from '@angular/core';
// importo del module principal
import { RouterModule, Routes } from '@angular/router';
import { AdivinaElNumeroComponent } from '../componentes/adivina-el-numero/adivina-el-numero.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { PrincipalComponent } from '../componentes/principal/principal.component';
import { AgilidadAritmeticaComponent } from '../componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { AdivinaMasListadoComponent } from '../componentes/adivina-mas-listado/adivina-mas-listado.component';
import { AgilidadMasListadoComponent } from '../componentes/agilidad-mas-listado/agilidad-mas-listado.component';
import { ListadoComponent } from '../componentes/listado/listado.component'
import { JuegosComponent } from '../componentes/juegos/juegos.component';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { MenuCardComponent } from '../componentes/menu-card/menu-card.component';
import { QuienSoyComponent } from '../componentes/quien-soy/quien-soy.component'
import { ListadoDePaisesComponent } from '../componentes/listado-de-paises/listado-de-paises.component'
import { MapaDeGoogleComponent } from '../componentes/mapa-de-google/mapa-de-google.component'
import { JugadoresListadoComponent } from '../componentes/jugadores-listado/jugadores-listado.component';
import { PiedraPTLSComponent } from '../componentes/piedra-p-t-l-s/piedra-p-t-l-s.component';
import { PiedraPapelTijeraComponent } from '../componentes/piedra-papel-tijera/piedra-papel-tijera.component';
import { AnagramaComponent } from '../componentes/anagrama/anagrama.component';
import { LoginComponent } from '../componentes/login/login.component';
import { ListadosComponent } from '../componentes/listados/listados.component';

import { AuthGuard } from 'src/app/guards/auth.guard';

// declaro donde quiero que se dirija
const MiRuteo = [
  { path: 'Jugadores', component: JugadoresListadoComponent },
  { path: '', component: LoginComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Mapa', component: MapaDeGoogleComponent },
  { path: 'QuienSoy', component: QuienSoyComponent,canActivate:[AuthGuard] },
  { path: 'Registro', component: RegistroComponent },
  { path: 'Principal', component: PrincipalComponent,canActivate:[AuthGuard] },
  { path: 'Listados', component: ListadosComponent,canActivate:[AuthGuard] },
  { path: 'Paises', component: ListadoDePaisesComponent },
  { path: 'Piedratls', component: PiedraPTLSComponent,canActivate:[AuthGuard] },
  { path: 'piedraPapelTijera', component: PiedraPapelTijeraComponent,canActivate:[AuthGuard] },
  { path: 'anagrama', component: AnagramaComponent,canActivate:[AuthGuard] },
  {
    path: 'Juegos',
    component: JuegosComponent,
    children:
      [{ path: '', component: MenuCardComponent },
      { path: 'Adivina', component: AdivinaElNumeroComponent },
      { path: 'AdivinaMasListado', component: AdivinaMasListadoComponent },
      { path: 'AgilidadaMasListado', component: AgilidadMasListadoComponent },
      { path: 'Agilidad', component: AgilidadAritmeticaComponent }],canActivate:[AuthGuard]
  },
  { path: '**', component: ErrorComponent },
  { path: 'error', component: ErrorComponent }];


@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RuteandoModule { }
