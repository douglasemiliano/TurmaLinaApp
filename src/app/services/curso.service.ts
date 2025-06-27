import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  cursoAtual: WritableSignal<any> = signal(null);
  http = inject(HttpClient);

  private baseUrl = 'https://turmalina-backend.onrender.com/turmalina';
  accessToken = window.localStorage.getItem("accessToken") || '';

  idUser = window.localStorage.getItem("userId") || '';

  constructor() {}
  
  getCursos() {
    const headers = new HttpHeaders({
      'accessToken': this.accessToken
       });

    return this.http.get(`${this.baseUrl}/cursos/${this.idUser}`, { headers });
  }

  getAtividades(cursoId: string) {
    const headers = new HttpHeaders({
      'accessToken': this.accessToken
       });
    return this.http.get(`${this.baseUrl}/atividades/${cursoId}`, { headers });
  }

  getMinhasAtividades(cursoId: string) {
    const headers = new HttpHeaders({
      'accessToken': this.accessToken
       });

       return this.http.get(`${this.baseUrl}/atividades/${cursoId}/${this.idUser}`, { headers });
  }


  getRankingByCurso(cursoId: string) {
    const headers = new HttpHeaders({
      'accessToken': this.accessToken
       });

       return this.http.get(`${this.baseUrl}/ranking/${cursoId}`, { headers });
  }

  getRankingGeral(cursoId: string) {
    const headers = new HttpHeaders({
      'accessToken': this.accessToken
       });

       return this.http.get(`${this.baseUrl}/v2/ranking/${cursoId}`, { headers });

  }

  setCursoAtual(curso: any) {
    this.cursoAtual.set(curso);
  }

  getCursoAtual() {
    return this.cursoAtual();
  }
}
