import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var Materialize: any;
@Component({
  selector: 'app-porcentagem',
  templateUrl: './porcentagem.component.html',
  styleUrls: ['./porcentagem.component.css']
})
export class PorcentagemComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  despesas: any = null;
  somaDespesas: any = null;
  precoMercadoria: any = '';
  pv: any = '';
  pontoEquilibrio: any = '';
  markup: any = '';
  mesAtual: any = null;
  principal: any = [];
  exibeMensagemCarregado: boolean = false;

  ngOnInit() {
    this.exibeMensagemCarregado = localStorage.getItem("porcentagem") != null;

    let date = new Date();
    this.mesAtual = `${date.getFullYear()}/${date.getMonth() + 1}`;

    this.route.params.subscribe(params => {
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

  private calcularMarkup() {
    let principal = this.principal.map(q => q.valor).reduce((sum, current) => sum + current);
    this.markup = (100 - principal) / 100;

    this.pv = (this.precoMercadoria / this.markup);
    this.calcularPontoEquilibrio();
    return false;
  }

  private calcularPontoEquilibrio() {
    let lucro = this.principal.filter(q => q.lucro)[0].valor;
    this.pontoEquilibrio = (this.somaDespesas / (lucro * 100)) * 100;
    return false;
  }

  private salvar() {
    let objetoSalvar = {
      despesas: this.despesas,
      precoMercadoria: this.precoMercadoria,
      principal: this.principal,
      somaDespesas: this.somaDespesas
    };

    localStorage.setItem("porcentagem", JSON.stringify(objetoSalvar));
    Materialize.toast('Os campos foram salvos, na próxima vez que abrir a página eles vão estar carregados!', 4000)
  }

  private loadingSave() {
    if (localStorage.getItem("porcentagem") == null)
      return;
    let objetoSalvar = JSON.parse(localStorage.getItem("porcentagem"));

    this.principal = this.principal.map(q => {
      if (this.despesas != null && q.activate) {
        Materialize.toast('A porcentagem de despesa foi sobrescrita pelo cálculo atual!', 4000)
        return q;
      }

      let index = objetoSalvar.principal.map(q => q.descricao).indexOf(q.descricao);
      q = objetoSalvar.principal[index];
      return q;
    });

    if (this.despesas == null)
      this.despesas = objetoSalvar.despesas;

    if (this.somaDespesas == null)
      this.somaDespesas = objetoSalvar.somaDespesas;

    this.precoMercadoria = objetoSalvar.precoMercadoria;

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
      precoMercadoria: this.precoMercadoria,
      porcentagens: this.principal,
      somaDespesas: this.somaDespesas,
      date: data,
      despesas: serializado.despesas,
      outrasDespesas: serializado.outrasDespesas,
      faturamento: serializado.faturamento,
      markup: this.markup,
      pv: this.pv,
      pontoEquilibrio: this.pontoEquilibrio
    };

    this.logicaMeses(objetoSalvar);
  }

  private logicaMeses(mes: any) {
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

}
