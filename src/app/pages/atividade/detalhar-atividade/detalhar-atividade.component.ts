import { Component, inject, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import {
  IonToolbar, IonHeader, IonTitle, IonContent,
  ModalController, IonButton, IonButtons, IonLabel, IonItem
} from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhar-atividade',
  templateUrl: './detalhar-atividade.component.html',
  styleUrls: ['./detalhar-atividade.component.scss'],
  imports: [CommonModule, IonToolbar, IonHeader, IonTitle, IonContent,
    IonButton, IonButtons, IonItem, IonLabel]
})
export class DetalharAtividadeComponent implements OnInit {


  cursoService = inject(CursoService);
  modalCtrl = inject(ModalController)
  atividadeAtual = this.cursoService.getAtividadeAtual();
  cursoAtual = this.cursoService.getCursoAtual();

  constructor() { }

  ngOnInit() {
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  confirm() { }

}
