import { Component, inject, OnInit } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { IonToolbar, IonHeader, IonTitle, IonContent, IonSegment, 
  ModalController,IonSegmentButton, IonButton, IonButtons,IonLabel, IonInput, IonItem } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhar-atividade',
  templateUrl: './detalhar-atividade.component.html',
  styleUrls: ['./detalhar-atividade.component.scss'],
  imports: [CommonModule, IonInput, IonToolbar, IonHeader, IonTitle, IonContent, 
    IonSegment, 
  IonSegmentButton, IonButton, IonButtons, IonItem, IonInput, IonLabel ] 
})
export class DetalharAtividadeComponent  implements OnInit {


  cursoService = inject(CursoService);
  modalCtrl = inject(ModalController)
  atividadeAtual = this.cursoService.getAtividadeAtual();
  cursoAtual = this.cursoService.getCursoAtual();

  constructor() { }

  ngOnInit() {
    console.log(this.atividadeAtual);
    console.log(this.cursoAtual);
    
    
  }

  cancel(){
    this.modalCtrl.dismiss();
  }

  confirm(){}

}
