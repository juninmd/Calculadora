import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent {


  private outros: any = [];
  private principal: any = [
    {
      valor: null,
      descricao: 'Água'
    },
    {
      valor: null,
      descricao: 'Luz'
    },
    {
      valor: null,
      descricao: 'Telefone'
    },
    {
      valor: null,
      descricao: 'Salário + Encargos'
    },
    {
      valor: null,
      descricao: 'Aluguel'
    },
    {
      valor: null,
      descricao: 'Descartáveis'
    },
  ];

  private despesas: any = 0;
  private faturamento: any = null;

  private adicionar() {
    this.outros.push({
      valor: 0,
      descricao: '',
      date: new Date()
    });
  }

  private remover(item: any) {
    this.outros.splice(this.outros.indexOf(item), 1);
  }

  /**
   * Primeira fórmula
   * Soma de todos os itens / Faturamento Mensal
   */
  calcularDespesas() {

    let principal = this.principal.map(q => q.valor).reduce((sum, current) => sum + current);
    let outros = 0;

    if (this.outros.length > 0)
      this.outros.map(q => q.valor).reduce((sum, current) => sum + current);

    this.despesas = ((principal + outros) / this.faturamento) * 100;
    console.log("Primeira fórmula:", this.despesas);
    return false;
  }

}
