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
  private despesas: any = '';
  private somaDespesas: any = '';
  private precoMercadoria: any = '';
  private pv: any = '';
  private pontoEquilibrio: any = '';
  private markup: any = '';

  private principal: any = [];

  ngOnInit() {
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

    this.route.params.subscribe(params => {
      if (params['despesas'] != null)
        this.despesas = +params["despesas"];

      if (params['somaDespesas'] != null)
        this.somaDespesas = +params["somaDespesas"];
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
    this.pontoEquilibrio = (this.somaDespesas * lucro) * 100;
    return false;
  }

  private salvar() {
    let objetoSalvar = {
      despesas: this.despesas,
      precoMercadoria: this.precoMercadoria,
      principal: this.principal
    };

    localStorage.setItem("porcentagem", JSON.stringify(objetoSalvar));
    Materialize.toast('Os campos foram salvos, na próxima vez que abrir a página eles vão estar carregados!', 4000)
  }

  private loadingSave() {
    if (localStorage.getItem("porcentagem") == null)
      return;
    let objetoSalvar = JSON.parse(localStorage.getItem("porcentagem"));
    this.despesas = objetoSalvar.despesas;
    this.precoMercadoria = objetoSalvar.precoMercadoria;
    this.principal = objetoSalvar.principal;
  }
}
