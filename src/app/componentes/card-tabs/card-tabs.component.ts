import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-card-tabs',
  templateUrl: './card-tabs.component.html',
  styleUrls: ['./card-tabs.component.css']
})
export class CardTabsComponent implements OnInit {

  constructor() { }
  @Input() nameTabUno:string;
  @Input() nameTabDos:string;
  @Input() nameTabTres:string;
  @Input() titleTabUno:string;
  @Input() titleTabDos:string;
  @Input() descriptionTabUno:string;
  @Input() descriptionTabDos:string;
  @Input() nameButtom:string;
  @Input() classNameUno:string='active';
  @Input() classNameDos:string='false';
  @Input() tabUnoBoolean:boolean=true;
  @Input() tabDosBoolean:boolean=false;
  
  ngOnInit() {
  }

  seleccionarTabUno(){
    if(this.classNameUno=='active')
    {
    }
    else
    {
      this.classNameUno='active';
      this.classNameDos='';
      this.tabUnoBoolean=true;
      this.tabDosBoolean=false;
    }
  }
  seleccionarTabDos(){
    if(this.classNameDos=='active')
    {
    }
    else
    {
      this.classNameUno='';
      this.classNameDos='active';
      this.tabUnoBoolean=false;
      this.tabDosBoolean=true;
    }
  }
}
