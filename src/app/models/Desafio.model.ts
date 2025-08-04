// desafio.model.ts
export interface Premio {
  pontuacao?: number;
  badgeId?: string;
}

export enum WinConditionTipo {
  PRIMEIRA_ATIVIDADE = 'PRIMEIRA_ATIVIDADE',
  ENTREGA_ATIVIDADES = 'ENTREGA_ATIVIDADES',
  ENTREGA_ATIVIDADE_ID = 'ENTREGA_ATIVIDADE_ID',
  NOTA_MINIMA = 'NOTA_MINIMA',
  MEDIA_MINIMA = 'MEDIA_MINIMA',
  ENTREGA_TODAS = 'ENTREGA_TODAS',
  ENTREGA_ATIVIDADES_TITULO = 'ENTREGA_ATIVIDADES_TITULO',
}

export enum EstadoVitoria {
  TURNED_IN = 'TURNED_IN',
  RETURNED = 'RETURNED',
}

export interface WinCondition {
  tipo: WinConditionTipo;
  quantidade?: number;
  itemId?: string;
  titulo?: string;
}

export interface Desafio {
  id?: string;
  cursoId: string;
  createdBy: string;
  titulo: string;
  descricao: string;
  premio: Premio[];
  ativo: boolean;
  dataFinal: string; // usar string para lidar com datetime-local
  winCondition: WinCondition[];
}
