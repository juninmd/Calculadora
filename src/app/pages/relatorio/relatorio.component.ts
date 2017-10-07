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
    sessionStorage.clear();
    this.loadingSave();
    this.exibeMensagemCarregado = localStorage.getItem("relatorio") != null;
  }

  outros: any = [];
  principal: any = [
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
      descricao: 'Salário'
    },
    {
      valor: null,
      descricao: 'Aluguel'
    },
    {
      valor: null,
      descricao: 'Descartáveis'
    },
    {
      valor: null,
      descricao: 'Prolabore'
    },
    {
      valor: null,
      descricao: 'Taxa Manutenção Conta Corrente'
    },
    {
      valor: null,
      descricao: 'Taxa Cobrança'
    },
    {
      valor: null,
      descricao: 'Encargos folha de pagamento'
    },
    {
      valor: null,
      descricao: 'IPTU'
    },
    {
      valor: null,
      descricao: 'Energia Elétrica'
    },
    {
      valor: null,
      descricao: 'Imposto'
    },
    {
      valor: null,
      descricao: 'GPS'
    },
    {
      valor: null,
      descricao: 'Serviço de Acessoria Info.'
    },
    {
      valor: null,
      descricao: 'Honorário Contábil'
    },
    {
      valor: null,
      descricao: 'Depreciação'
    },
    {
      valor: null,
      descricao: 'Seguros'
    },
    {
      valor: null,
      descricao: 'Segurança Monitorada'
    },
    {
      valor: null,
      descricao: 'Despesa Administrativa Correio/Xerox'
    },
    {
      valor: null,
      descricao: 'Material Escritório'
    },
    {
      valor: null,
      descricao: 'Material Limpeza'
    },
    {
      valor: null,
      descricao: 'Material de Copa'
    },
    {
      valor: null,
      descricao: 'Mateial Gráfico'
    },
    {
      valor: null,
      descricao: 'Investimento'
    },
    {
      valor: null,
      descricao: 'Combustível'
    },
    {
      valor: null,
      descricao: 'Viagens'
    },
    {
      valor: null,
      descricao: 'Manutenção'
    },
    {
      valor: null,
      descricao: 'Divulgação'
    },
    {
      valor: null,
      descricao: 'Sindicato'
    },
    {
      valor: null,
      descricao: 'Mensalidade Ass. Comercial'
    },
    {
      valor: null,
      descricao: 'Internet'
    },
    {
      valor: null,
      descricao: 'IPVA'
    },
    {
      valor: null,
      descricao: 'Licenciamento'
    },
    {
      valor: null,
      descricao: 'INPI'
    },
    {
      valor: null,
      descricao: 'Domínio'
    },
  ];
  exibeMensagemCarregado: boolean = false;

  faturamento: any = null;

  adicionar() {
    this.outros.push({
      valor: '',
      descricao: '',
      date: new Date()
    });
  }

  remover(item: any) {
    this.outros.splice(this.outros.indexOf(item), 1);
  }

  salvar() {
    let objetoSalvar = {
      faturamento: this.faturamento,
      principal: this.principal,
      outros: this.outros
    };
    localStorage.setItem("relatorio", JSON.stringify(objetoSalvar));
    Materialize.toast('Os campos foram salvos, na próxima vez que abrir a página eles vão estar carregados!', 4000)
  }

  loadingSave() {
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

    let despesas = ((principal + outros) / this.faturamento) * 100;

    this.armazenarSession();
    this.router.navigate(['/custo', { despesas: despesas, despesasFixas: principal + outros}]);

    return false;
  }

  /**
   * Armazenamos os itens em session para lermos na próxima tela
   */
  armazenarSession() {
    let objetoSalvar = {
      despesas: this.principal,
      outrasDespesas: this.outros,
      faturamento: this.faturamento
    }

    sessionStorage.setItem('tempRelatorio', JSON.stringify(objetoSalvar));
  }

}
