import { Component, inject, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { IonLabel, IonAvatar, IonContent, IonItem, IonList, IonBadge } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  imports: [IonLabel, IonAvatar, IonItem, IonList, IonBadge]
})
export class RankingComponent  implements OnInit {

  private cursoService = inject(CursoService);
  private router = inject(Router);
  cursoAtual = this.cursoService.getCursoAtual();

  ranking: any[] = [];

  constructor() { }

  ngOnInit() {
    this.obterRanking();
  }

  obterRanking() {
    if(this.cursoAtual == null) {
      console.error('Curso atual não está definido.');
      this.router.navigateByUrl('/cursos');
      return;
    }
    this.cursoService.getRankingGeral(this.cursoAtual.id).subscribe({
      next: (ranking: any) => {
        this.ranking = ranking.alunos;
      },
      error: (error) => {
        console.error('Erro ao carregar o ranking:', error);
      }
    })
  }

}
