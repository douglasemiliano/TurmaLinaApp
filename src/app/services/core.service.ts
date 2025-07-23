import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  rotaAtual: WritableSignal<string> = signal("/");
  modoVisualizacao: WritableSignal<string> = signal(''); // Default value, can be 'ALUNO' or 'PROFESSOR'
  
  modoSource: Subject<string> = new Subject<string>();
  modo = this.modoSource.asObservable();

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

  atualizarModo(modo: string) {
    this.modoSource.next(modo);
  }

  getModo(): Observable<string>{
    return this.modo;
  }
}
