import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { CustoComponent } from './custo.component';
import { MesRecord } from '../types';

declare var Materialize: {
  toast: (message: string, duration: number) => void;
};

describe('CustoComponent', () => {
  let component: CustoComponent;
  let fixture: ComponentFixture<CustoComponent>;
  let toastSpy: jasmine.Spy;
  let paramsSubject: Subject<any>;

  beforeEach(async(() => {
    toastSpy = jasmine.createSpy('toast');
    (global as any).Materialize = { toast: toastSpy };
    paramsSubject = new Subject<any>();

    TestBed.configureTestingModule({
      declarations: [CustoComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: paramsSubject.asObservable() }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    paramsSubject.next({});
    fixture = TestBed.createComponent(CustoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialize default state', () => {
    expect(component).toBeTruthy();
    expect(component.principal.length).toBe(5);
    expect(component.despesas).toBeNull();
    expect(component.exibeMensagemCarregado).toBe(false);
  });

  it('should read despesas and despesasFixas from route params', () => {
    paramsSubject.next({ despesas: '30', despesasFixas: '1000' });
    expect(component.despesas).toBe(30);
    expect(component.despesasFixas).toBe(1000);
  });

  describe('salvar', () => {
    it('should persist custoMercadoria and principal to localStorage', () => {
      component.custoMercadoria = 150;
      component.principal[0].valor = 5;
      component.salvar();

      const stored = JSON.parse(localStorage.getItem('custo') as string);
      expect(stored.custoMercadoria).toBe(150);
      expect(stored.principal[0].valor).toBe(5);
      expect(toastSpy).toHaveBeenCalled();
    });
  });

  describe('loadingSave', () => {
    it('should not change state when nothing is stored', () => {
      component.custoMercadoria = 0;
      component.loadingSave();
      expect(component.custoMercadoria).toBe(0);
    });

    it('should restore stored values', () => {
      localStorage.setItem('custo', JSON.stringify({
        custoMercadoria: 200,
        principal: [{ valor: 10, descricao: '% Simples', simples: true }]
      }));
      component.loadingSave();
      expect(component.custoMercadoria).toBe(200);
      expect(component.principal[0].valor).toBe(10);
    });

    it('should keep activate item value when despesas is provided', () => {
      component.despesas = 25;
      localStorage.setItem('custo', JSON.stringify({
        custoMercadoria: 200,
        principal: [{ valor: 99, descricao: '% Despesas', activate: true }]
      }));
      component.principal = component.principal.map(q => ({ ...q }));
      component.loadingSave();
      expect(component.principal[2].valor).toBe(0);
      expect(component.custoMercadoria).toBe(200);
    });
  });

  describe('calculations', () => {
    beforeEach(() => {
      component.principal = [
        { valor: 5, descricao: '% Simples', simples: true, calcular: true },
        { valor: 10, descricao: '% Lucro', lucro: true, calcular: false },
        { valor: 20, descricao: '% Despesas', activate: true, calcular: false },
        { valor: 5, descricao: '% Comissão', calcular: true },
        { valor: 0, descricao: '% Frete', calcular: true }
      ];
      component.custoMercadoria = 100;
    });

    it('calcularMarkup should compute markup and pv', () => {
      const result = component.calcularMarkup();
      expect(component.markup).toBe(0.6);
      expect(component.pv).toBeCloseTo(166.67, 2);
      expect(result).toBe(false);
    });

    it('calcularDespesasVariaveis should use simples percentage', () => {
      component.calcularMarkup();
      component.calcularDespesasVariaveis();
      const expected = (component.pv * 5) / 100 + 100;
      expect(component.despesasVariaveis).toBeCloseTo(expected, 2);
    });

    it('calcularMargemContribuicao should compute margin', () => {
      component.pv = 200;
      component.despesasVariaveis = 150;
      component.calcularMargemContribuicao();
      expect(component.margemContribuicao).toBeCloseTo(0.25, 5);
    });

    it('calcularPontoEquilibrio should divide fixed expenses by margin', () => {
      component.despesasFixas = 1000;
      component.margemContribuicao = 0.5;
      component.calcularPontoEquilibrio();
      expect(component.pontoEquilibrio).toBe(2000);
    });

    it('calcularPontoEquilibrio should return 0 when margin is 0', () => {
      component.despesasFixas = 1000;
      component.margemContribuicao = 0;
      component.calcularPontoEquilibrio();
      expect(component.pontoEquilibrio).toBe(0);
    });
  });

  describe('salvarMesAtual', () => {
    it('should warn when tempRelatorio is not stored', () => {
      component.salvarMesAtual();
      expect(toastSpy).toHaveBeenCalledWith(jasmine.stringMatching(/primeiro calcular/), 5000);
      expect(localStorage.getItem('meses')).toBeNull();
    });

    it('should warn when pv is empty', () => {
      sessionStorage.setItem('tempRelatorio', JSON.stringify({
        despesas: [], outrasDespesas: [], faturamento: 0
      }));
      component.salvarMesAtual();
      expect(toastSpy).toHaveBeenCalledWith(jasmine.stringMatching(/calcule o formulário/), 5000);
      expect(localStorage.getItem('meses')).toBeNull();
    });

    it('should register the month when valid data is present', () => {
      sessionStorage.setItem('tempRelatorio', JSON.stringify({
        despesas: [{ valor: 10, descricao: 'Água' }],
        outrasDespesas: [],
        faturamento: 500
      }));
      component.pv = 100;
      component.salvarMesAtual();
      const meses: MesRecord[] = JSON.parse(localStorage.getItem('meses') as string);
      expect(meses.length).toBe(1);
      expect(meses[0].faturamento).toBe(500);
      expect(toastSpy).toHaveBeenCalledWith(jasmine.stringMatching(/registrado com sucesso/), 5000);
    });
  });

  describe('logicaMeses', () => {
    it('should reject duplicate month registrations', () => {
      const mes: MesRecord = {
        mes: '2020/1', porcDespesas: 0, custoMercadoria: 0, porcentagens: [],
        despesasFixas: 0, date: new Date(), despesas: [], outrasDespesas: [],
        faturamento: 0, markup: 0, pv: 0, margemContribuicao: 0, pontoEquilibrio: 0,
        despesasVariaveis: 0
      };
      component.logicaMeses(mes);
      component.logicaMeses(mes);

      const meses: MesRecord[] = JSON.parse(localStorage.getItem('meses') as string);
      expect(meses.length).toBe(1);
      expect(toastSpy).toHaveBeenCalledWith(jasmine.stringMatching(/já foi registrado/), 5000);
    });

    it('should append a new unique month', () => {
      const mes: MesRecord = {
        mes: '2020/2', porcDespesas: 0, custoMercadoria: 0, porcentagens: [],
        despesasFixas: 0, date: new Date(), despesas: [], outrasDespesas: [],
        faturamento: 0, markup: 0, pv: 0, margemContribuicao: 0, pontoEquilibrio: 0,
        despesasVariaveis: 0
      };
      component.logicaMeses(mes);
      const meses: MesRecord[] = JSON.parse(localStorage.getItem('meses') as string);
      expect(meses.length).toBe(1);
      expect(meses[0].mes).toBe('2020/2');
    });
  });
});
