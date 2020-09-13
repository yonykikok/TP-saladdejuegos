import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Jugador } from 'src/app/clases/jugador';

@Component({
  selector: 'app-dialog-jugador',
  templateUrl: './dialog-jugador.component.html',
  styleUrls: ['./dialog-jugador.component.css']
})
export class DialogJugadorComponent implements OnInit {

  @Input() mostrarse: boolean = false;
  @Input() jugador: Jugador = new Jugador();
  @Output() toggleEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }
  cerrarModal() {
    this.toggleEvent.emit(this.mostrarse);
  }
}
