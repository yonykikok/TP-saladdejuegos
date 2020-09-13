import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'
import { AuthService } from 'src/app/servicios/auth.service';
import { LocalStorageService } from 'src/app/servicios/local-storage.service';
@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {

  juegoTerminado: boolean = false;
  @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();
  mostrar: boolean = false;
  operadores: string[] = ["*", "-", "/", "+"];
  @Input() nuevoJuego: JuegoAgilidad = new JuegoAgilidad();;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor: any;
  contadorGanadas = 0;

  //---puntajes
  esTop1: boolean = false;
  emailUsuarioActual: string;
  //------------
  ngOnInit() {

    this.obtenerMailDeUsuarioActual();
  }
  async obtenerMailDeUsuarioActual() {
    const user = await this.authService.usuarioLogeado();
    if (user) {
      this.emailUsuarioActual = user.email;
    }
  }



  constructor(private localStorageService: LocalStorageService, private authService: AuthService) {
    this.ocultarVerificar = true;
    this.Tiempo = 30;
    // this.nuevoJuego = new JuegoAgilidad();
    console.info("Inicio agilidad");
  }

  // Retorna un número aleatorio entre min (incluido) y max (excluido)
  numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  toggleJuegoTerminado() {
    this.juegoTerminado = !this.juegoTerminado;
    this.contadorGanadas = 0;
    
  }
  NuevoJuego() {
    this.mostrar = false;
    this.nuevoJuego = new JuegoAgilidad();
    this.nuevoJuego.numeroAleatorioUno = this.numeroAleatorio(0, 100);
    this.nuevoJuego.numeroAleatorioDos = this.numeroAleatorio(1, 10);
    this.nuevoJuego.operador = this.operadores[this.numeroAleatorio(0, 4)];
    this.ocultarVerificar = false;

    this.repetidor = setInterval(() => {
      this.Tiempo--;
      if (this.Tiempo == 0) {
        this.localStorageService.guardarPuntuacionEnLocalStorage(this.emailUsuarioActual, 'agilidad', this.contadorGanadas);
        this.esTop1 = this.localStorageService.verificarSiSuperoAlTop();
        this.juegoTerminado = true;
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar = true;
        this.Tiempo = 30;
      }
    }, 1000);

  }
  calcularResultado() {
    let numeroUno = this.nuevoJuego.numeroAleatorioUno;
    let numeroDos = this.nuevoJuego.numeroAleatorioDos;
    let operador = this.nuevoJuego.operador;
    switch (operador) {
      case "*":
        return numeroUno * numeroDos;
      case "/":
        return numeroUno / numeroDos;
      case "+":
        return numeroUno + numeroDos;
      case "-":
        return numeroUno - numeroDos;
    }
  }
  verificar() {
    this.ocultarVerificar = false;

    let resultado = (this.calcularResultado());
    if (resultado == this.nuevoJuego.numeroIngresado) {
      this.mostrar = false;
      this.nuevoJuego.gano = true;
      this.ocultarVerificar = true;
      let sonido = new Audio('../../../assets/audios/success.wav');
      sonido.play();
      this.contadorGanadas++;
    }
    else if (this.nuevoJuego.numeroIngresado) {
      this.mostrar = true;
      let sonido = new Audio('../../../assets/audios/fail.wav');
      sonido.play();
      this.NuevoJuego();
    }
    else {
      this.ocultarVerificar = true;
      this.NuevoJuego();
    }
    clearInterval(this.repetidor);
  }

}
