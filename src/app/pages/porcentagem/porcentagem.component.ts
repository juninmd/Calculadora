import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    this.route.params.subscribe(params => {
      if (params['despesas'] != null)
        this.despesas = +params["despesas"];

      if (params['somaDespesas'] != null)
        this.somaDespesas = +params["somaDespesas"];
    });

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
  }
}
