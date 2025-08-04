import { Component, inject, OnInit } from '@angular/core';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonContent,
} from '@ionic/angular/standalone';
import { CursoService } from 'src/app/services/curso.service';
import { TrilhaComponent } from '../trilha/trilha.component';
import { RankingComponent } from '../../curso/ranking/ranking.component';
import { DesafiosAlunoComponent } from '../../desafios/desafios-aluno/desafios-aluno.component';
import { CoreService } from 'src/app/services/core.service';
import { DesafiosProfessorComponent } from '../../desafios/desafios-professor/desafios-professor.component';

@Component({
  selector: 'app-listar-atividade',
  templateUrl: './listar-atividade.component.html',
  styleUrls: ['./listar-atividade.component.scss'],
  imports: [IonBackButton,
    IonButtons,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    IonSegmentContent,
    IonSegmentView,
    TrilhaComponent,
    RankingComponent,
    IonContent,
    DesafiosAlunoComponent,
    DesafiosProfessorComponent]
})
export class ListarAtividadeComponent implements OnInit {
  
  private cursoService = inject(CursoService);
  private coreService = inject(CoreService);
  

  cursoAtual = this.cursoService.getCursoAtual();
  modoVisualizacao = this.coreService.modoVisualizacao();
  
  currentStep: number = 0; // Para controlar o progresso da trilhas

  atividades: any[] = [];
      
  ngOnInit(): void {
    console.log(this.modoVisualizacao);
    
    this.cursoService.getMinhasAtividades(this.cursoAtual.id).subscribe({
      next: (atividades: any) => {
        this.atividades = atividades;
      }});
  }
    
  getModoVisualizacao() {
    this.coreService.getModo().subscribe({
      next: (modo: string) => {
        this.modoVisualizacao = modo;
        console.log(modo);
      }
    })
  }
  
  getPositionClass(index: number): string {
    const positions = ['item-left', 'item-middle', 'item-right', 'item-middle']; 
    return positions[index % positions.length];
  }
}
