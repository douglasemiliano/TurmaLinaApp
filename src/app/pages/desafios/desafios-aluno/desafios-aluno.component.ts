import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IonBadge, 
  IonContent, IonButton,
  IonRefresher,
  IonRefresherContent, } from '@ionic/angular/standalone';
import { RefresherCustomEvent } from '@ionic/core';
import { CursoService } from 'src/app/services/curso.service';


@Component({
  selector: 'app-desafios-aluno',
  templateUrl: './desafios-aluno.component.html',
  styleUrls: ['./desafios-aluno.component.scss'],
  imports: [IonRefresher,
  IonRefresherContent, IonContent, NgOptimizedImage, IonButton, IonBadge,],
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
  
      handleRefresh(event: RefresherCustomEvent) {
      setTimeout(() => {
        // Any calls to load data go here
        this.ngOnInit();
        event.target.complete();
      }, 2000);
    }

}
