import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  cursoAtual: WritableSignal<any> = signal(null);
  http = inject(HttpClient);

  atividadeAtual: WritableSignal<any> = signal(null);

  private baseUrl = environment.BACKEND_URL || 'http://localhost:8080/turmalina';
  accessToken = window.localStorage.getItem("accessToken") || '';

  idUser = window.localStorage.getItem("userId") || '';

  constructor() { }

  getCursos() {
    return this.http.get(`${this.baseUrl}/cursos/${this.idUser}`);
  }

  getAtividades(cursoId: string) {
    return this.http.get(`${this.baseUrl}/atividades/${cursoId}`);
  }

  getMinhasAtividades(cursoId: string) {
    return this.http.get(`${this.baseUrl}/atividades/${cursoId}/${this.idUser}`);
  }


  getRankingByCurso(cursoId: string) {
    return this.http.get(`${this.baseUrl}/ranking/${cursoId}`);
  }

  getRankingGeral(cursoId: string) {
    return this.http.get(`${this.baseUrl}/v2/ranking/${cursoId}`);
  }

  getPerfilAluno(alunoId: string) {
    return this.http.get(`${this.baseUrl}/perfil/${alunoId}`)
  }

  setCursoAtual(curso: any) {
    this.cursoAtual.set(curso);
  }

  getCursoAtual() {
    return this.cursoAtual();
  }

  setAtividadeAtual(atividade: any) {
    this.atividadeAtual.set(atividade);
  }

  getAtividadeAtual() {
    return this.atividadeAtual();
  }
}
