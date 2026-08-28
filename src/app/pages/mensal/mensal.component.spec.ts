import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { MensalComponent } from './mensal.component';
import { MesRecord } from '../types';

describe('MensalComponent', () => {
  let component: MensalComponent;
  let fixture: ComponentFixture<MensalComponent>;
  let navigateSpy: jasmine.Spy;

  const sampleMes: MesRecord = {
    mes: '2020/1', porcDespesas: 0, custoMercadoria: 0, porcentagens: [],
    despesasFixas: 0, date: new Date(), despesas: [], outrasDespesas: [],
    faturamento: 0, markup: 0, pv: 0, margemContribuicao: 0, pontoEquilibrio: 0,
    despesasVariaveis: 0
  };

  beforeEach(async(() => {
    localStorage.clear();
    navigateSpy = jasmine.createSpy('navigate');

    TestBed.configureTestingModule({
      declarations: [MensalComponent],
      providers: [{ provide: Router, useValue: { navigate: navigateSpy } }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load meses from localStorage on init', () => {
    localStorage.setItem('meses', JSON.stringify([sampleMes]));
    const fresh = TestBed.createComponent(MensalComponent).componentInstance;
    expect(fresh.meses.length).toBe(1);
    expect(fresh.meses[0].mes).toBe('2020/1');
  });

  it('should have empty meses when nothing is stored', () => {
    expect(component.meses.length).toBe(0);
  });

  it('openModal should select the month and emit open action', () => {
    let emitted: any = null;
    component.modalActions.subscribe((value) => emitted = value);
    component.openModal(sampleMes);
    expect(component.mes).toEqual(sampleMes);
    expect(emitted).toEqual({ action: 'modal', params: ['open'] });
  });

  it('closeModal should navigate to root and emit close action', () => {
    let emitted: any = null;
    component.modalActions.subscribe((value) => emitted = value);
    component.closeModal();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
    expect(emitted).toEqual({ action: 'modal', params: ['close'] });
  });

  it('limpar should clear the list and localStorage', () => {
    component.meses = [sampleMes];
    localStorage.setItem('meses', JSON.stringify([sampleMes]));
    component.limpar();
    expect(component.meses.length).toBe(0);
    expect(localStorage.getItem('meses')).toBeNull();
  });
});
