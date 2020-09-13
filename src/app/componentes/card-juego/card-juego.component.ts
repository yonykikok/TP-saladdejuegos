import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
@Component({
  selector: 'app-card-juego',
  templateUrl: './card-juego.component.html',
  styleUrls: ['./card-juego.component.css']
})
export class CardJuegoComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() img: string;
  @Input() routerLinkk: string;
  @Input() clases:string;

  constructor(public formBuilder: FormBuilder) {

  }

  ngOnInit() {
  }
}
