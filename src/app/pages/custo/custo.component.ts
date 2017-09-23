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
  somaDespesas: any = null;
  custoMercadoria: any = '';
  pv: any = '';
  pontoEquilibrio: any = '';
  markup: any = '';
  mesAtual: any = null;
  principal: any = [];
  exibeMensagemCarregado: boolean = false;
  fixos: any = 0;
  variaveis: any = 0;

  ngOnInit() {
    this.exibeMensagemCarregado = localStorage.getItem("custo") != null;

    let date = new Date();
    this.mesAtual = `${date.getFullYear()}/${date.getMonth() + 1}`;

    this.route.params.subscribe(params => {

      if (params['fixos'] != null)
        this.fixos = +params["fixos"];

      if (params['variaveis'] != null)
        this.variaveis = +params["variaveis"];

      if (params['despesas'] != null)
        this.despesas = +params["despesas"];

      if (params['somaDespesas'] != null)
        this.somaDespesas = +params["somaDespesas"];

      this.principal = [
        {
          valor: null,
          descricao: '% Simples'
        },
        {
          valor: null,
          descricao: '% Lucro',
          lucro: true
        },
        {
          valor: this.despesas,
          descricao: '% Despesas',
          activate: true
        },
        {
          valor: null,
          descricao: '% Comissão'
        },
        {
          valor: null,
          descricao: '% Frete'
        },
      ];
      this.loadingSave();

    });

  }

  calcularMarkup() {
    let principal = this.principal.map(q => q.valor).reduce((sum, current) => sum + current);
    this.markup = (100 - principal) / 100;

    this.pv = (this.custoMercadoria / this.markup);
    this.calcularPontoEquilibrio();
    return false;
  }

  calcularPontoEquilibrio() {
    this.pontoEquilibrio = ((this.custoMercadoria + this.fixos) / (this.pv - this.custoMercadoria + this.variaveis)) * 100;
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
      somaDespesas: this.somaDespesas,
      date: data,
      despesas: serializado.despesas,
      outrasDespesas: serializado.outrasDespesas,
      faturamento: serializado.faturamento,
      markup: this.markup,
      pv: this.pv,
      pontoEquilibrio: this.pontoEquilibrio,
      fixos: this.fixos,
      variaveis: this.variaveis
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

  calcularDespesas() {
    this.somaDespesas = this.fixos + this.variaveis;
  }

}
