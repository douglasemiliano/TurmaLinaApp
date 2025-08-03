import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IonCard, IonItem, IonLabel, IonBadge, IonCardContent, IonCardHeader, IonContent, IonToolbar, IonTitle, IonCardSubtitle, IonCardTitle, IonList, IonButton, IonHeader } from '@ionic/angular/standalone';
import { CursoService } from 'src/app/services/curso.service';


@Component({
  selector: 'app-desafios-aluno',
  templateUrl: './desafios-aluno.component.html',
  styleUrls: ['./desafios-aluno.component.scss'],
  imports: [IonHeader, IonToolbar, IonContent, IonTitle, NgOptimizedImage, IonButton, IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonBadge,],
})
export class DesafiosAlunoComponent  implements OnInit {

  private cursoService = inject(CursoService);

  cursoAtual = this.cursoService.getCursoAtual();

  desafiosCurso: any[] = [];
  desafiosAluno: any[] = [];
  badges: any[] = [];

  constructor() { }

  ngOnInit() {
    this.getDesafiosCurso();
    this.getDesafiosAluno();
    this.getBadges();
  }

  getDesafiosCurso(){
    this.cursoService.getDesafiosByCurso(this.cursoAtual.id).subscribe({
      next: (desafios: any) => {
        this.desafiosCurso = desafios
      }
    })
  }

  getDesafiosAluno(){
    this.cursoService.getDesafiosAluno(this.cursoAtual.id, this.cursoService.idUser).subscribe({
      next: (desafios: any) => {
        this.desafiosAluno = desafios;
      }
    })
  }

  getBadges(){
    this.cursoService.getAllBadges().subscribe({
      next: (badges: any) => {
        this.badges = badges;
      }
    })
  }

  selecionarBadge(badgeId: string) {
    const badge = this.badges.find((badge: any) => badge.id === badgeId);
    if (badge) {
      return badge;
    } else {
      return null;
    }
  }

  resgatarDesafio(idDesafio: string) {
    this.cursoService.resgatarDesafio({"desafioId": idDesafio, "alunoId": this.cursoService.idUser}).subscribe({
      next: (response: any) => {
        alert(response.message);

        this.ngOnInit();
      }
    })
  }
  
}
