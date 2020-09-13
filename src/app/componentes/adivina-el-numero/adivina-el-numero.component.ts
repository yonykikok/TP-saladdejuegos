
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JuegoAdivina } from '../../clases/juego-adivina'
import { AuthService } from 'src/app/servicios/auth.service';
import { LocalStorageService } from 'src/app/servicios/local-storage.service';
@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnInit {
  @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();

  nuevoJuego: JuegoAdivina;
  Mensajes: string;
  contador: number;
  ocultarVerificar: boolean;
  mostrarAyuda: boolean = false;
  ayuda: string;
  //---puntaje
  esTop1: boolean = false;
  emailUsuarioActual: string;
  //fin puntaje

  ngOnInit() {
    this.obtenerMailDeUsuarioActual();
  }
  async obtenerMailDeUsuarioActual() {
    const user = await this.authService.usuarioLogeado();
    if (user) {
      this.emailUsuarioActual = user.email;
    }
  }
  constructor(private authService: AuthService, private localStorageService: LocalStorageService) {
    this.nuevoJuego = new JuegoAdivina();
    console.info("numero Secreto:", this.nuevoJuego.numeroSecreto);
    this.ocultarVerificar = false;
  }
  generarnumero() {
    this.nuevoJuego.generarnumero();
    this.contador = 0;
  }

  mostrarMensajeDeAyuda() {
    this.ayuda = this.nuevoJuego.retornarAyuda();
    this.verificar();
  }
  verificar() {
    this.contador++;
    let audio;
    this.ocultarVerificar = true;
    console.info("numero Secreto:", this.nuevoJuego.gano);
    if (this.nuevoJuego.verificar()) {
      audio = new Audio('../../../assets/audios/success.wav');
      audio.play();
      this.enviarJuego.emit(this.nuevoJuego);
      this.MostarMensaje("Sos un Genio!!!", true);
      this.nuevoJuego.numeroSecreto = 0;

    } else {
      audio = new Audio('../../../assets/audios/fail.wav');
      audio.play();
      let mensaje: string;
      switch (this.contador) {
        case 1:
          mensaje = "Fallaste, animo vuelve a intentar";
          break;
        case 2:
          mensaje = "Fallaste otra ves,Te estaras Acercando???";
          break;
        case 3:
          mensaje = "Lastima, Yo crei que la tercera era la vencida.";
          break;
        case 4:
          mensaje = "Tampoco era el " + this.nuevoJuego.numeroIngresado;
          break;
        case 5:
          this.mostrarAyuda = true;
          mensaje = "Estoy empezando a creer que no saldra. Revisa la ayuda";
          break;
        case 6:
          mensaje = "Afortunado en el amor";
          break;
        default:
          mensaje = "Ya le erraste " + this.contador + " veces";
          if (this.contador == 10) {
            mensaje = "Lo siento la proxima sera!";
            this.terminarJuego();
          }
          break;
      }
      this.MostarMensaje("#" + this.contador + " " + mensaje);


    }
    console.info("numero Secreto:", this.nuevoJuego.gano);
  }
  terminarJuego() {
    this.ocultarVerificar = true;
    this.mostrarAyuda = false;
    this.nuevoJuego.numeroSecreto = 0;
    this.localStorageService.guardarPuntuacionEnLocalStorage(this.emailUsuarioActual,'adivina',this.contador);
    // this.esTop1= this.localStorageService.verificarSiSuperoAlTopEnMenosIntentos();

  }
  MostarMensaje(mensaje: string = "este es el mensaje", ganador: boolean = false) {
    this.Mensajes = mensaje;
    var x = document.getElementById("snackbar");
    if (ganador) {
      x.className = "show Ganador";
    } else {
      x.className = "show Perdedor";
    }
    var modelo = this;
    setTimeout(function () {
      x.className = x.className.replace("show", "");
      modelo.ocultarVerificar = false;
    }, 3000);
    console.info("objeto", x);

  }


}
