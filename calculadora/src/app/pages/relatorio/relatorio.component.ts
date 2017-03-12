import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent {

  constructor(private router: Router) { }
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

  private faturamento: any = null;

  private adicionar() {
    this.outros.push({
      valor: '',
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
      outros = this.outros.map(q => q.valor).reduce((sum, current) => sum + current);

    let despesas = ((principal + outros) / this.faturamento);
    console.log("Primeira fórmula:", despesas);

    this.router.navigate(['/porcentagem', { despesas: despesas }]);
    return false;
  }

}
