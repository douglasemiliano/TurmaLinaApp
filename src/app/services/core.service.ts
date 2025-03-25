import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  rotaAtual: WritableSignal<string> = signal("/");

  constructor() { }

  atualizarRotaAtual(rota: string) {
    this.rotaAtual.set(rota);
  }

  getRotaAtual(): Signal<string>{
    return this.rotaAtual;
  }
}
