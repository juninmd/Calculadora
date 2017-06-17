import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var Materialize: any;
@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent {

  constructor(private router: Router) {
    this.loadingSave();
  }
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

  private salvar() {
    let objetoSalvar = {
      faturamento: this.faturamento,
      principal: this.principal,
      outros: this.outros
    };
    localStorage.setItem("relatorio", JSON.stringify(objetoSalvar));
    Materialize.toast('Os campos foram salvos, na próxima vez que abrir a página eles vão estar carregados!', 4000)
  }

  private loadingSave() {
    if (localStorage.getItem("relatorio") == null)
      return;
    let objetoSalvar = JSON.parse(localStorage.getItem("relatorio"));
    this.faturamento = objetoSalvar.faturamento;
    this.principal = objetoSalvar.principal;
    this.outros = objetoSalvar.outros;
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

    this.router.navigate(['/porcentagem', { despesas: despesas, somaDespesas: principal + outros }]);
    return false;
  }

}
