import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthGoogleService } from './auth/auth-google.service';
import { Subject } from 'rxjs';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  cursoAtual: WritableSignal<any> = signal(null);
  http = inject(HttpClient);
  private authService = inject(AuthGoogleService); // Assuming you have an AuthGoogleService for authentication
  private coreService = inject(CoreService); // Assuming you have a CoreService for core functionalities
  atividadeAtual: WritableSignal<any> = signal(null);

  private baseUrl = environment.BACKEND_URL;
  accessToken = window.localStorage.getItem("accessToken") || '';

  idUser = window.localStorage.getItem("userId") || '';

  listaCursos: Subject<any> = new Subject<any>();

  constructor() {
    this.coreService.atualizarModoVizualicao(window.localStorage.getItem('modoVisualizacao') || 'ALUNO');
   }


  getListaCursos(){
    return this.listaCursos.asObservable();
  }

  listarCursos(){
    this.getCursos().subscribe({
      next: (cursos: any) => {
        this.listaCursos.next(cursos);
      },
      error: (error) => {
        console.error('Erro ao carregar os cursos:', error);
      }
    });
  }

  getCursos() {

    const modoVisualizacao = this.coreService.modoVisualizacao();
    console.log('Modo de visualização:', modoVisualizacao);
    
    if(modoVisualizacao === 'ALUNO'){
      return this.http.get(`${this.baseUrl}/cursos/${this.idUser}`);
    }
      return this.http.get(`${this.baseUrl}/cursos/${this.idUser}/meus-cursos`);
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

  gerarCodigoResgate(idCurso: string) {
    return this.http.post(`${this.baseUrl}/badge/${idCurso}/gerar-codigo`, {})
  }

  resgatarBadge(codigo: string) {
    return this.http.post(`${this.baseUrl}/badge/resgatar?code=${codigo}&userId=${this.idUser}`, {});
  }

  getBadgesByUser(idUser: string) {
    return this.http.get(`${this.baseUrl}/badge/user/${idUser}`);
  }

  getAllBadges(){
    return this.http.get(`${this.baseUrl}/badge`);
  }

  getDesafiosByCurso(idCurso: string) {
    return this.http.get(`${this.baseUrl}/desafio/${idCurso}`);
  }

  getDesafiosAluno(idCurso: string, idAluno: string) {
    return this.http.get(`${this.baseUrl}/desafio/${idCurso}/${idAluno}`);
  }

  resgatarDesafio(resgate: any) {
    return this.http.post(`${this.baseUrl}/desafio/resgatar`, resgate); 
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

  atualizarDadosAluno() {
    return this.http.post(`${this.baseUrl}/login`, this.authService.gerarPerfilRequestDto());
  }
}
