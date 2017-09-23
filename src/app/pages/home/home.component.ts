import { Component, OnInit } from '@angular/core';
declare var Materialize: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  limpar() {
    localStorage.removeItem('porcentagem');
    localStorage.removeItem('relatorio');
    sessionStorage.removeItem('tempRelatorio');
    Materialize.toast('Os campos armazenados foram limpos!', 4000)
  }
}
