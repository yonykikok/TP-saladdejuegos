import { Component, OnInit } from '@angular/core';
import { Jugador } from 'src/app/clases/jugador';
import { AuthService } from 'src/app/servicios/auth.service';
import { LocalStorageService } from 'src/app/servicios/local-storage.service';
@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {

  eleccionMaquina: string;
  eleccionJugador: string;
  resultadoDelJuego: string;
  contadorGanadas: number = 0;
  contadorPerdidas: number = 0;
  mostrarQuienGano: boolean = false;
  mostrarPuntuacion: boolean = false;
  partidaTerminada: boolean = false;
  mensajePartida: string;
  imagenG_P: string;
  //puntuaciones
  // listaDeJugadores: Jugador[] = new Array();
  esTop1: boolean = false;
  emailUsuarioActual: string;
  //fin puntuaciones 

  constructor(private authService: AuthService, private localStorageService: LocalStorageService) { }
  opcionesDeJuego = ["piedra", "papel", "tijera"];
  ngOnInit() {
    this.obtenerMailDeUsuarioActual();
  }


  async obtenerMailDeUsuarioActual() {
    const user = await this.authService.usuarioLogeado();
    if (user) {
      this.emailUsuarioActual = user.email;
    }
  }
  reproducirExplicacion() {
    let audio = new Audio('../../../assets/audios/ppt.wav');
    audio.play();
  }

  cambiarEstadoOculatar_Mostrar() {
    let imagenes = document.getElementsByClassName("imagenJuego");
    for (let i = 0; i < imagenes.length; i++) {
      if (imagenes[i].getAttribute("class") == "imagenJuego visible hvr-buzz") {
        imagenes[i].setAttribute("class", "imagenJuego hidden hvr-buzz");
      }
      else {
        imagenes[i].setAttribute("class", "imagenJuego visible hvr-buzz");
      }
    }
  }

  cambiarColorResultadoDeJuego() {
    let labelTitulo = document.getElementById('tituloResultadoDeJuego');
    let audio;
    if (labelTitulo != null) {
      switch (this.resultadoDelJuego) {
        case "Empate":
          labelTitulo.setAttribute("style", "background-color: gray;");
          break;
        case "Ganaste":
          audio = new Audio('../../../assets/audios/success.wav');
          audio.play();
          labelTitulo.setAttribute("style", "background-color: blue;");
          break;
        case "Perdiste":
          audio = new Audio('../../../assets/audios/fail.wav');
          audio.play();
          labelTitulo.setAttribute("style", "background-color: red;");
          break;
      }
    }

  }

  JuegadaDeLaMaquina() {
    let opcionRandom = Math.floor(Math.random() * (3 - 0));
    return this.opcionesDeJuego[opcionRandom];
  }

  verificarVictoria(jugada, jugadaMaquina, jugadaGana) {
    if (jugada == jugadaMaquina) {
      this.resultadoDelJuego = "Empate"
      this.mensajePartida = "Nadie gana";
    }
    else if (jugadaMaquina == jugadaGana) {
      this.mensajePartida = jugada[0].toUpperCase() + jugada.substr(1).toLowerCase() + " GANA!";
      this.resultadoDelJuego = "Ganaste"
      this.contadorGanadas++;
    }
    else {
      this.mensajePartida = jugadaMaquina[0].toUpperCase() + jugadaMaquina.substr(1).toLowerCase() + " GANA!";
      this.resultadoDelJuego = "Perdiste"
      this.contadorPerdidas++;
    }
    if (this.contadorPerdidas == 5) {
      this.terminarPartida();
    }
  }
  ocultarCardReglas() {
    document.getElementById("headerCardReglas").setAttribute('class', "card hidden");
  }

  mostrarCardReglas() {
    document.getElementById("headerCardReglas").setAttribute('class', "card");
  }
  terminarPartida() {
    this.localStorageService.guardarPuntuacionEnLocalStorage(this.emailUsuarioActual, 'ppt', this.contadorGanadas);
    this.esTop1 = this.localStorageService.verificarSiSuperoAlTop();


    let sonido;

    if (this.contadorGanadas > this.contadorPerdidas) {
      this.imagenG_P = "../../../assets/imagenes/ganaste.png";
      sonido = new Audio("../../../assets/audios/TaDa.wav");
      sonido.play();
    }
    else if (this.contadorGanadas == this.contadorPerdidas) {

    }
    else {
      sonido = new Audio("../../../assets/audios/perdida.wav");
      this.imagenG_P = "../../../assets/imagenes/gameover.png";
      sonido.play();
    }
    this.cambiarEstadoOculatar_Mostrar();
    this.partidaTerminada = true;
    this.eleccionJugador = "";
    this.eleccionMaquina = "";
    this.resultadoDelJuego = "";
  }
  reiniciarPartida() {
    this.contadorPerdidas = 0;
    this.contadorGanadas = 0;
    this.partidaTerminada = false;
    this.mostrarQuienGano = false;
    this.cambiarEstadoOculatar_Mostrar();
  }
  CalcukarJugada(jugada) {
    let jugadaMaquina = this.JuegadaDeLaMaquina();
    this.eleccionJugador = jugada;
    this.eleccionMaquina = jugadaMaquina;
    this.mostrarQuienGano = true;
    switch (jugada) {
      case "piedra":
        this.verificarVictoria(jugada, jugadaMaquina, "tijera");
        break;
      case "papel":
        this.verificarVictoria(jugada, jugadaMaquina, "piedra");
        break;
      case "tijera":
        this.verificarVictoria(jugada, jugadaMaquina, "papel");
        break;
    }
    this.cambiarColorResultadoDeJuego();

  }

}
