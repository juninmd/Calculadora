import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var Materialize: any;
@Component({
  selector: 'app-custo',
  templateUrl: './custo.component.html',
  styleUrls: ['./custo.component.css']
})
export class CustoComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  despesas: any = null;
  despesasFixas: any = null;
  despesasVariaveis: any = 0;
  custoMercadoria: any = '';
  pv: any = '';
  margemContribuicao: any = '';
  pontoEquilibrio: any = '';
  markup: any = '';
  mesAtual: any = null;
  principal: any = [];
  exibeMensagemCarregado: boolean = false;

  ngOnInit() {
    this.exibeMensagemCarregado = localStorage.getItem("custo") != null;

    let date = new Date();
    this.mesAtual = `${date.getFullYear()}/${date.getMonth() + 1}`;

    this.route.params.subscribe(params => {

      if (params['despesas'] != null)
        this.despesas = +params["despesas"];

      if (params['despesasFixas'] != null)
        this.despesasFixas = +params["despesasFixas"];

      this.principal = [
        {
          valor: 0,
          descricao: '% Simples',
          calcular: true
        },
        {
          valor: 0,
          descricao: '% Lucro',
          lucro: true,
          calcular: false
        },
        {
          valor: this.despesas || 0,
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
    this.calcularDespesasVariaveis();
  }

  calcularMarkup() {
    let principal = this.principal.map(q => q.valor).reduce((sum, current) => sum + current);
    this.markup = (100 - principal) / 100;

    this.pv = (this.custoMercadoria / this.markup);
    this.calcularMargemContribuicao();

    return false;
  }

  calcularPontoEquilibrio() {
    this.pontoEquilibrio = this.despesasFixas / this.margemContribuicao;
    return false;
  }

  salvar() {
    let objetoSalvar = {
      custoMercadoria: this.custoMercadoria,
      principal: this.principal,
    };

    localStorage.setItem("custo", JSON.stringify(objetoSalvar));
    Materialize.toast('Os campos foram salvos, na próxima vez que abrir a página eles vão estar carregados!', 4000)
  }

  loadingSave() {
    if (localStorage.getItem("custo") == null)
      return;
    let objetoSalvar = JSON.parse(localStorage.getItem("custo"));

    this.principal = this.principal.map(q => {
      if (this.despesas != null && q.activate) {
        return q;
      }

      let index = objetoSalvar.principal.map(q => q.descricao).indexOf(q.descricao);
      q = objetoSalvar.principal[index];
      return q;
    });

    this.custoMercadoria = objetoSalvar.custoMercadoria;
  }

  salvarMesAtual() {
    let tempRelatorio = sessionStorage.getItem("tempRelatorio");
    if (tempRelatorio == null) {
      Materialize.toast('Para registrar esse mês, você deve primeiro calcular os itens pela tela de relatório!', 5000)
      return;
    }

    if (this.pv == '') {
      Materialize.toast('Por favor, calcule o formulário', 5000)
      return;
    }

    let serializado = JSON.parse(sessionStorage.getItem("tempRelatorio"))

    let data = new Date();
    let objetoSalvar = {
      mes: `${data.getFullYear()}/${data.getMonth() + 1}`,
      porcDespesas: this.despesas,
      custoMercadoria: this.custoMercadoria,
      porcentagens: this.principal,
      despesasFixas: this.despesasFixas,
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

  logicaMeses(mes: any) {
    let storageMeses = localStorage.getItem("meses");
    let meses = [];
    if (storageMeses != null) {
      meses = JSON.parse(storageMeses);
    }

    if (meses.filter(q => { return q.mes == mes.mes }).length > 0) {
      Materialize.toast('Esse mês já foi registrado!', 5000)
      return;
    }

    meses.push(mes);

    localStorage.setItem('meses', JSON.stringify(meses));
    Materialize.toast('Esse mês foi registrado com sucesso!', 5000)
  }

  // Calcular todas as despesas, exceto [Lucro] e [Despesa]
  calcularDespesasVariaveis() {
    this.despesasVariaveis = (this.principal.filter(p => p.calcular).map(q => q.valor).reduce((sum, current) => sum + current)) / 100;
  }

  calcularMargemContribuicao() {
    this.margemContribuicao = (this.pv - this.custoMercadoria - this.despesasVariaveis) / (this.pv); 
    this.calcularPontoEquilibrio();
  }

}
