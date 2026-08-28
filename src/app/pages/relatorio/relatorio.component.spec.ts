import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { RelatorioComponent } from './relatorio.component';
import { DespesaItem } from '../types';

describe('RelatorioComponent', () => {
  let component: RelatorioComponent;
  let toastSpy: jasmine.Spy;
  let navigateSpy: jasmine.Spy;

  beforeEach(async(() => {
    localStorage.clear();
    sessionStorage.clear();
    toastSpy = jasmine.createSpy('toast');
    (global as any).Materialize = { toast: toastSpy };
    navigateSpy = jasmine.createSpy('navigate');

    TestBed.configureTestingModule({
      declarations: [RelatorioComponent],
      providers: [{ provide: Router, useValue: { navigate: navigateSpy } }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    component = TestBed.createComponent(RelatorioComponent).componentInstance;
  }));

  it('should create with default expense list', () => {
    expect(component).toBeTruthy();
    expect(component.principal.length).toBeGreaterThan(0);
    expect(component.outros.length).toBe(0);
    expect(component.faturamento).toBeNull();
  });

  it('should restore stored relatorio on creation', () => {
    localStorage.setItem('relatorio', JSON.stringify({
      faturamento: 700,
      principal: [{ valor: 10, descricao: 'Água' }],
      outros: [{ valor: 5, descricao: 'Extra' }]
    }));

    const fresh = TestBed.createComponent(RelatorioComponent).componentInstance;
    expect(fresh.faturamento).toBe(700);
    expect(fresh.principal).toEqual([{ valor: 10, descricao: 'Água' }]);
    expect(fresh.outros).toEqual([{ valor: 5, descricao: 'Extra' }]);
  });

  describe('adicionar / remover', () => {
    it('adicionar should push a new empty expense', () => {
      const before = component.outros.length;
      component.adicionar();
      expect(component.outros.length).toBe(before + 1);
      expect(component.outros[component.outros.length - 1].descricao).toBe('');
    });

    it('remover should remove an existing expense', () => {
      const item: DespesaItem = { valor: 3, descricao: 'A' };
      component.outros.push(item, { valor: 4, descricao: 'B' });
      component.remover(item);
      expect(component.outros.length).toBe(1);
      expect(component.outros[0].descricao).toBe('B');
    });

    it('remover should do nothing for unknown item', () => {
      component.outros.push({ valor: 4, descricao: 'B' });
      component.remover({ valor: 1, descricao: 'Ghost' });
      expect(component.outros.length).toBe(1);
    });
  });

  it('salvar should persist to localStorage and show toast', () => {
    component.faturamento = 900;
    component.outros.push({ valor: 5, descricao: 'Extra' });
    component.salvar();

    const stored = JSON.parse(localStorage.getItem('relatorio') as string);
    expect(stored.faturamento).toBe(900);
    expect(stored.outros.length).toBe(1);
    expect(toastSpy).toHaveBeenCalled();
  });

  it('armazenarSession should store tempRelatorio in sessionStorage', () => {
    component.faturamento = 1000;
    component.outros.push({ valor: 10, descricao: 'X' });
    component.armazenarSession();

    const stored = JSON.parse(sessionStorage.getItem('tempRelatorio') as string);
    expect(stored.faturamento).toBe(1000);
    expect(stored.outrasDespesas.length).toBe(1);
  });

  describe('calcularDespesas', () => {
    it('should compute despesas percentage and navigate', () => {
      component.principal = [
        { valor: 100, descricao: 'Água' },
        { valor: 100, descricao: 'Luz' }
      ];
      component.outros = [{ valor: 50, descricao: 'Extra' }];
      component.faturamento = 500;

      const result = component.calcularDespesas();
      expect(result).toBe(false);
      expect(navigateSpy).toHaveBeenCalledWith(['/custo', { despesas: 50, despesasFixas: 250 }]);
    });

    it('should navigate with 0 when faturamento is 0', () => {
      component.principal = [{ valor: 100, descricao: 'Água' }];
      component.outros = [];
      component.faturamento = 0;

      component.calcularDespesas();
      expect(navigateSpy).toHaveBeenCalledWith(['/custo', { despesas: 0, despesasFixas: 100 }]);
    });

    it('should store tempRelatorio before navigating', () => {
      component.principal = [{ valor: 10, descricao: 'Água' }];
      component.outros = [];
      component.faturamento = 100;

      component.calcularDespesas();
      const stored = JSON.parse(sessionStorage.getItem('tempRelatorio') as string);
      expect(stored.faturamento).toBe(100);
    });
  });
});
