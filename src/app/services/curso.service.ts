import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  cursoAtual: WritableSignal<any> = signal(null);
  constructor() { }

  setCursoAtual(curso: any) {
    this.cursoAtual.set(curso);
  }

  getCursoAtual() {
    return this.cursoAtual();
  }
}
