import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensal',
  templateUrl: './mensal.component.html',
  styleUrls: ['./mensal.component.css']
})
export class MensalComponent implements OnInit {
  modalActions = new EventEmitter<string | MaterializeAction>();

  meses: any = [];
  mes: any = {};

  constructor(private router: Router) { }

  ngOnInit() {
    let storageMeses = localStorage.getItem("meses");
    if (storageMeses != null) {
      this.meses = JSON.parse(storageMeses);
    }
  }

  openModal(mes: any) {
    this.mes = mes;
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  closeModal() {
    this.router.navigate(['/']);
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }

  limpar() {
    this.meses = [];
    localStorage.removeItem('meses');
  }
}
