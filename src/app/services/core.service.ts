import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  rotaAtual: WritableSignal<string> = signal("/");
  modoVisualizacao: WritableSignal<string> = signal(''); // Default value, can be 'ALUNO' or 'PROFESSOR'

  constructor() { }

  atualizarRotaAtual(rota: string) {
    this.rotaAtual.set(rota);
  }

  getRotaAtual(): Signal<string>{
    return this.rotaAtual;
  }

  atualizarModoVizualicao(modo: string) {
    window.localStorage.setItem('modoVisualizacao', modo);
    this.modoVisualizacao.set(modo);
  }
}
