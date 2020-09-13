import { Injectable } from '@angular/core';
import { Jugador } from '../clases/jugador';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  //puntuaciones
  listaDeJugadores: Jugador[] = new Array();
  esTop1: boolean = false;
  jugador: Jugador = new Jugador();
  //fin puntuaciones 

  constructor(private authService: AuthService) { }

  verificarSiExiteJugador(emailJugador) {
    let retorno: boolean = false;
    this.listaDeJugadores.forEach(auxJugador => {
      if (auxJugador.email == emailJugador) {
        retorno = true
      }
    });
    return retorno;
  }
  actualizarPuntajeDelUsuario(jugador) {
    this.listaDeJugadores.forEach(auxJugador => {
      if (auxJugador.email == jugador.email && auxJugador.puntaje < jugador.puntaje) {
        auxJugador.puntaje = jugador.puntaje;
        console.log("Lograste una mejor puntuacion");
      }
    });
  }

  verificarSiSuperoAlTopEnMenosIntentos() {
    let retorno = false;
    const auxjugadorTop = new Jugador();
    auxjugadorTop.puntaje = 0;

    this.listaDeJugadores.forEach(jugador => {
      if (jugador.puntaje < auxjugadorTop.puntaje) {
        auxjugadorTop.puntaje = jugador.puntaje;
        auxjugadorTop.email = jugador.email;
      }
    });
    if (auxjugadorTop.email == this.jugador.email) {
      console.info(auxjugadorTop.email + " " + this.jugador.email);
      console.log("Estas a la cabeza en el top 3");
      retorno = true;
    }
    return retorno;
  }
  verificarSiSuperoAlTop() {
    let retorno = false;
    const auxjugadorTop = new Jugador();
    auxjugadorTop.puntaje = 0;

    this.listaDeJugadores.forEach(jugador => {
      if (jugador.puntaje > auxjugadorTop.puntaje) {
        auxjugadorTop.puntaje = jugador.puntaje;
        auxjugadorTop.email = jugador.email;
      }
    });
    if (auxjugadorTop.email == this.jugador.email) {
      console.info(auxjugadorTop.email + " " + this.jugador.email);
      console.log("Estas a la cabeza en el top 3");
      retorno = true;
    }
    return retorno;
  }
  guardarPuntuacionEnLocalStorage(emailUsuarioActual, nombreDelJuego, puntaje) {
    if (emailUsuarioActual) {
      this.jugador.email = emailUsuarioActual;
      this.jugador.puntaje = puntaje;
      this.listaDeJugadores = this.obtenerListaDeJugadores(nombreDelJuego);
      if (this.listaDeJugadores && this.listaDeJugadores.length > 0) {
        if (this.verificarSiExiteJugador(emailUsuarioActual)) {
          this.actualizarPuntajeDelUsuario(this.jugador);
        }
        else {
          this.listaDeJugadores.push(this.jugador);
        }
      }
      else {
        console.info("LISTA VACIA");
        this.listaDeJugadores = [];
        this.listaDeJugadores.push(this.jugador);
      }
      localStorage.setItem(nombreDelJuego, JSON.stringify(this.listaDeJugadores));
    }
    else {
      console.log("no deberias haber llegado hasta aca sin logear.");
    }
  }

  obtenerListaDeJugadores(nombreDelJuego: string) {
    const datosObtenidos = localStorage.getItem(nombreDelJuego);
    if (datosObtenidos) {
      return JSON.parse(datosObtenidos);
    }
  }
}
