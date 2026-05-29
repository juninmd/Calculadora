import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DespesaItem, RelatorioStorage, TempRelatorio } from '../types';

declare var Materialize: {
  toast: (message: string, duration: number) => void;
};

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent {
  constructor(private router: Router) {
    sessionStorage.clear();
    this.loadingSave();
    this.exibeMensagemCarregado = localStorage.getItem('relatorio') != null;
  }

  outros: DespesaItem[] = [];
  principal: DespesaItem[] = [
    { valor: null, descricao: 'Água' },
    { valor: null, descricao: 'Luz' },
    { valor: null, descricao: 'Telefone' },
    { valor: null, descricao: 'Salário' },
    { valor: null, descricao: 'Aluguel' },
    { valor: null, descricao: 'Descartáveis' },
    { valor: null, descricao: 'Prolabore' },
    { valor: null, descricao: 'Taxa Manutenção Conta Corrente' },
    { valor: null, descricao: 'Taxa Cobrança' },
    { valor: null, descricao: 'Encargos folha de pagamento' },
    { valor: null, descricao: 'IPTU' },
    { valor: null, descricao: 'Energia Elétrica' },
    { valor: null, descricao: 'Imposto' },
    { valor: null, descricao: 'GPS' },
    { valor: null, descricao: 'Serviço de Acessoria Info.' },
    { valor: null, descricao: 'Honorário Contábil' },
    { valor: null, descricao: 'Depreciação' },
    { valor: null, descricao: 'Seguros' },
    { valor: null, descricao: 'Segurança Monitorada' },
    { valor: null, descricao: 'Despesa Administrativa Correio/Xerox' },
    { valor: null, descricao: 'Material Escritório' },
    { valor: null, descricao: 'Material Limpeza' },
    { valor: null, descricao: 'Material de Copa' },
    { valor: null, descricao: 'Mateial Gráfico' },
    { valor: null, descricao: 'Investimento' },
    { valor: null, descricao: 'Combustível' },
    { valor: null, descricao: 'Viagens' },
    { valor: null, descricao: 'Manutenção' },
    { valor: null, descricao: 'Divulgação' },
    { valor: null, descricao: 'Sindicato' },
    { valor: null, descricao: 'Mensalidade Ass. Comercial' },
    { valor: null, descricao: 'Internet' },
    { valor: null, descricao: 'IPVA' },
    { valor: null, descricao: 'Licenciamento' },
    { valor: null, descricao: 'INPI' },
    { valor: null, descricao: 'Domínio' },
  ];
  exibeMensagemCarregado = false;
  faturamento: number | null = null;

  adicionar() {
    this.outros.push({
      valor: null,
      descricao: '',
      date: new Date()
    });
  }

  remover(item: DespesaItem) {
    const index = this.outros.indexOf(item);
    if (index !== -1) {
      this.outros.splice(index, 1);
    }
  }

  salvar() {
    const objetoSalvar: RelatorioStorage = {
      faturamento: this.faturamento ?? 0,
      principal: this.principal,
      outros: this.outros
    };
    localStorage.setItem('relatorio', JSON.stringify(objetoSalvar));
    Materialize.toast('Os campos foram salvos, na próxima vez que abrir a página eles vão estar carregados!', 4000);
  }

  loadingSave() {
    const stored = localStorage.getItem('relatorio');
    if (stored == null) return;

    const objetoSalvar: RelatorioStorage = JSON.parse(stored);
    this.faturamento = objetoSalvar.faturamento;
    this.principal = objetoSalvar.principal;
    this.outros = objetoSalvar.outros ?? [];
  }

  calcularDespesas() {
    const somaPrincipal = this.principal
      .map(q => q.valor ?? 0)
      .reduce((sum, current) => sum + current, 0);

    const somaOutros = this.outros.length > 0
      ? this.outros.map(q => q.valor ?? 0).reduce((sum, current) => sum + current, 0)
      : 0;

    const despesas = ((somaPrincipal + somaOutros) / (this.faturamento ?? 1)) * 100;

    this.armazenarSession();
    this.router.navigate(['/custo', { despesas, despesasFixas: somaPrincipal + somaOutros }]);

    return false;
  }

  armazenarSession() {
    const objetoSalvar: TempRelatorio = {
      despesas: this.principal,
      outrasDespesas: this.outros,
      faturamento: this.faturamento ?? 0
    };

    sessionStorage.setItem('tempRelatorio', JSON.stringify(objetoSalvar));
  }
}
