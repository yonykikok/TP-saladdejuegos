import { Component, OnInit, Input } from '@angular/core';
import { Jugador } from 'src/app/clases/jugador';

@Component({
  selector: 'app-top3-game',
  templateUrl: './top3-game.component.html',
  styleUrls: ['./top3-game.component.css']
})
export class Top3GameComponent implements OnInit {
  @Input() tituloDelJuego;
  @Input() listaTop3: Jugador[] = new Array();
  primerPuesto: Jugador = new Jugador();
  segundoPuesto: Jugador = new Jugador();
  tercerPuesto: Jugador = new Jugador();
  usuarioAMostrar:Jugador=new Jugador();
  @Input() mostrarDetalleDelJugador: boolean = false;
  constructor() { }

  toggleDialog()
  {
    this.mostrarDetalleDelJugador = !this.mostrarDetalleDelJugador;
  }
  mostrarUsuarioUno() {
    this.mostrarDetalleDelJugador = true;
    this.usuarioAMostrar=this.primerPuesto;
  }
  mostrarUsuarioDos() {
    this.mostrarDetalleDelJugador = true;
    this.usuarioAMostrar=this.segundoPuesto;
  }
  mostrarUsuarioTres() {
    this.mostrarDetalleDelJugador =true;
    this.usuarioAMostrar=this.tercerPuesto;
  }
  ngOnInit() {
    console.info(this.listaTop3);
    if (this.listaTop3[0]) {
      this.primerPuesto = this.listaTop3[0];
    }
    if (this.listaTop3[1]) {

      this.segundoPuesto = this.listaTop3[1];
    }
    if (this.listaTop3[2]) {

      this.tercerPuesto = this.listaTop3[2];
    }

  }

}
