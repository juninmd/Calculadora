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
  private precoMercadoria: any = '';
  private pv: any = '';
  private markup: any = '';

  private principal: any = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['despesas'] != null)
        this.despesas = +params["despesas"];
    });

    this.principal = [
      {
        valor: null,
        descricao: '% Simples'
      },
      {
        valor: null,
        descricao: '% Lucro'
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
    console.log("Markup", this.markup);

    this.pv = (this.precoMercadoria / this.markup);
    console.log("PV", this.pv);
    return false;
  }
}
