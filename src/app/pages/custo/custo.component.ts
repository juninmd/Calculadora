import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrincipalItem, CustoStorage, TempRelatorio, MesRecord } from '../types';

declare var Materialize: {
  toast: (message: string, duration: number) => void;
};

@Component({
  selector: 'app-custo',
  templateUrl: './custo.component.html',
  styleUrls: ['./custo.component.css']
})
export class CustoComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  despesas: number | null = null;
  despesasFixas: number | null = null;
  despesasVariaveis: number | string = '';
  custoMercadoria: number | string = '';
  pv: number | string = '';
  margemContribuicao: number | string = '';
  pontoEquilibrio: number | string = '';
  markup: number | string = '';
  mesAtual: string | null = null;
  principal: PrincipalItem[] = [];
  exibeMensagemCarregado = false;

  ngOnInit() {
    this.exibeMensagemCarregado = localStorage.getItem('custo') != null;

    const date = new Date();
    this.mesAtual = `${date.getFullYear()}/${date.getMonth() + 1}`;

    this.route.params.subscribe(params => {
      const despesasParam = params['despesas'];
      const despesasFixasParam = params['despesasFixas'];

      if (despesasParam != null)
        this.despesas = +despesasParam;

      if (despesasFixasParam != null)
        this.despesasFixas = +despesasFixasParam;

      this.principal = [
        {
          valor: 0,
          descricao: '% Simples',
          simples: true,
          calcular: true
        },
        {
          valor: 0,
          descricao: '% Lucro',
          lucro: true,
          calcular: false
        },
        {
          valor: this.despesas ?? 0,
          descricao: '% Despesas',
          activate: true,
          calcular: false
        },
        {
          valor: 0,
          descricao: '% Comissão',
          calcular: true
        },
        {
          valor: 0,
          descricao: '% Frete',
          calcular: true
        }
      ];
      this.loadingSave();
    });
  }

  salvar() {
    const objetoSalvar: CustoStorage = {
      custoMercadoria: this.custoMercadoria,
      principal: this.principal,
    };

    localStorage.setItem('custo', JSON.stringify(objetoSalvar));
    Materialize.toast('Os campos foram salvos, na próxima vez que abrir a página eles vão estar carregados!', 4000);
  }

  loadingSave() {
    const stored = localStorage.getItem('custo');
    if (stored == null) return;

    const objetoSalvar: CustoStorage = JSON.parse(stored);

    this.principal = this.principal.map(q => {
      if (this.despesas != null && q.activate) {
        return q;
      }

      const index = objetoSalvar.principal.map(p => p.descricao).indexOf(q.descricao);
      return objetoSalvar.principal[index];
    });

    this.custoMercadoria = objetoSalvar.custoMercadoria;
  }

  salvarMesAtual() {
    const tempRelatorio = sessionStorage.getItem('tempRelatorio');
    if (tempRelatorio == null) {
      Materialize.toast('Para registrar esse mês, você deve primeiro calcular os itens pela tela de relatório!', 5000);
      return;
    }

    if (this.pv === '') {
      Materialize.toast('Por favor, calcule o formulário', 5000);
      return;
    }

    const serializado: TempRelatorio = JSON.parse(tempRelatorio);
    const data = new Date();

    const objetoSalvar: MesRecord = {
      mes: `${data.getFullYear()}/${data.getMonth() + 1}`,
      porcDespesas: this.despesas ?? 0,
      custoMercadoria: this.custoMercadoria,
      porcentagens: this.principal,
      despesasFixas: this.despesasFixas ?? 0,
      date: data,
      despesas: serializado.despesas,
      outrasDespesas: serializado.outrasDespesas,
      faturamento: serializado.faturamento,
      markup: this.markup,
      pv: this.pv,
      margemContribuicao: this.margemContribuicao,
      pontoEquilibrio: this.pontoEquilibrio,
      despesasVariaveis: this.despesasVariaveis
    };

    this.logicaMeses(objetoSalvar);
  }

  logicaMeses(mes: MesRecord) {
    const storageMeses = localStorage.getItem('meses');
    const meses: MesRecord[] = storageMeses ? JSON.parse(storageMeses) : [];

    if (meses.some(q => q.mes === mes.mes)) {
      Materialize.toast('Esse mês já foi registrado!', 5000);
      return;
    }

    meses.push(mes);
    localStorage.setItem('meses', JSON.stringify(meses));
    Materialize.toast('Esse mês foi registrado com sucesso!', 5000);
  }

  calcularMarkup() {
    const somaPrincipal = this.principal
      .map(q => q.valor)
      .reduce((sum, current) => sum + current, 0);

    this.markup = (100 - somaPrincipal) / 100;
    this.pv = Number(this.custoMercadoria) / Number(this.markup);
    this.calcularDespesasVariaveis();

    return false;
  }

  calcularDespesasVariaveis() {
    const simples = this.principal.find(p => p.simples === true);
    if (!simples) return;

    this.despesasVariaveis = (Number(this.pv) * simples.valor) / 100 + Number(this.custoMercadoria);
    this.calcularMargemContribuicao();
  }

  calcularMargemContribuicao() {
    const pv = Number(this.pv);
    const dv = Number(this.despesasVariaveis);
    this.margemContribuicao = (pv - dv) / pv;
    this.calcularPontoEquilibrio();
  }

  calcularPontoEquilibrio() {
    const df = this.despesasFixas ?? 0;
    const mc = Number(this.margemContribuicao);
    this.pontoEquilibrio = mc !== 0 ? df / mc : 0;
    return false;
  }
}
