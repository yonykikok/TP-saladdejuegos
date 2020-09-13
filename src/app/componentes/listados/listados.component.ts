import { Component, OnInit, Input } from '@angular/core';
import { Jugador } from 'src/app/clases/jugador';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})
export class ListadosComponent implements OnInit {

  constructor() { }
  @Input() listaDeJugadoresPptls: Jugador[] = new Array();
  listaToptresPptls: Jugador[] = new Array();
  @Input() listaDeJugadoresPpt: Jugador[] = new Array();
  listaToptresPpt: Jugador[] = new Array();
  @Input() listaDeJugadoresAnagrama: Jugador[] = new Array();
  listaToptresAnagrama: Jugador[] = new Array();

  @Input() listaDeJugadoresAgilidad: Jugador[] = new Array();
  listaToptresAgilidad: Jugador[] = new Array();

  ngOnInit() {

    this.cargarListaDeJuego(this.listaDeJugadoresPptls, this.listaToptresPptls, 'pptls');
    this.cargarListaDeJuego(this.listaDeJugadoresPpt, this.listaToptresPpt, 'ppt');
    this.cargarListaDeJuego(this.listaDeJugadoresAnagrama, this.listaToptresAnagrama, 'anagrama');
    this.cargarListaDeJuego(this.listaDeJugadoresAgilidad, this.listaToptresAgilidad, 'agilidad');
  }
  cargarListaDeJuego(lista, listaTop3, titulo) {
    lista = JSON.parse(localStorage.getItem(titulo));//obtengo la lista
    if (lista) {
      lista.sort(this.ordenarDeMayorAMenorPuntaje);//ordeno la lista 
      for (let i = 0; i < 3; i++) {
        if (lista[i]) {
          listaTop3.push(lista[i]);
        }
      }
    }
  }
  ordenarDeMayorAMenorPuntaje(jugadorA, jugadorB) {
    if (jugadorA.puntaje > jugadorB.puntaje) {
      return -1;
    }
    else if (jugadorA.puntaje == jugadorB.puntaje) {
      return 0;
    }
    else {
      return 1;
    }
  }
}
