import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-img-top',
  templateUrl: './card-img-top.component.html',
  styleUrls: ['./card-img-top.component.css']
})
export class CardImgTopComponent implements OnInit {

  @Input() title:string;
  @Input() description:string;
  @Input() img:string;
  @Input() mostrarBoton:boolean=false;
  @Input() routerLinkk:string;
  
  constructor() { }

  ngOnInit() {
  }

}
