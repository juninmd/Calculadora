import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { Router } from '@angular/router';
import { MesRecord } from '../types';

@Component({
  selector: 'app-mensal',
  templateUrl: './mensal.component.html',
  styleUrls: ['./mensal.component.css']
})
export class MensalComponent implements OnInit {
  modalActions = new EventEmitter<string | MaterializeAction>();

  meses: MesRecord[] = [];
  mes: MesRecord | null = null;

  constructor(private router: Router) { }

  ngOnInit() {
    const storageMeses = localStorage.getItem('meses');
    if (storageMeses != null) {
      this.meses = JSON.parse(storageMeses);
    }
  }

  openModal(mes: MesRecord) {
    this.mes = mes;
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  }

  closeModal() {
    this.router.navigate(['/']);
    this.modalActions.emit({ action: 'modal', params: ['close'] });
  }

  limpar() {
    this.meses = [];
    localStorage.removeItem('meses');
  }
}
