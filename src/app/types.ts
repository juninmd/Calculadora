export interface PrincipalItem {
  valor: number;
  descricao: string;
  simples?: boolean;
  lucro?: boolean;
  activate?: boolean;
  calcular?: boolean;
}

export interface DespesaItem {
  valor: number | null;
  descricao: string;
  date?: Date;
}

export interface CustoStorage {
  custoMercadoria: number | string;
  principal: PrincipalItem[];
}

export interface RelatorioStorage {
  faturamento: number;
  principal: DespesaItem[];
  outros: DespesaItem[];
}

export interface TempRelatorio {
  despesas: DespesaItem[];
  outrasDespesas: DespesaItem[];
  faturamento: number;
}

export interface MesRecord {
  mes: string;
  porcDespesas: number;
  custoMercadoria: number | string;
  porcentagens: PrincipalItem[];
  despesasFixas: number;
  date: Date;
  despesas: DespesaItem[];
  outrasDespesas: DespesaItem[];
  faturamento: number;
  markup: number;
  pv: number | string;
  margemContribuicao: number;
  pontoEquilibrio: number;
  despesasVariaveis: number | string;
}
