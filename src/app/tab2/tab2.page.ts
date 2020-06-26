import { Component } from '@angular/core';
import { Historico } from '../models/Historico';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public historicos: Historico[] = [
    { dataHora: "25/06/2020 18:53", leitura: "Leitura 1" },
    { dataHora: "25/06/2020 19:53", leitura: "Leitura 2" },
    { dataHora: "25/06/2020 18:53", leitura: "Leitura 3" },
    { dataHora: "25/06/2020 19:53", leitura: "Leitura 4" },
    { dataHora: "25/06/2020 19:53", leitura: "http://www.ronanzenatti.com" },
  ];

  constructor() {
  }

}
