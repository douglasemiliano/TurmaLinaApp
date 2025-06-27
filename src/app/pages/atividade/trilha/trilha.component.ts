import { Component, inject, Input, ViewChild } from '@angular/core';
import { ActivityButtonComponent } from '../../../components/activity-button/activity-button.component';
import { CommonModule } from '@angular/common';
import { CursoService } from 'src/app/services/curso.service';
import { Router } from '@angular/router';
import { IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonTitle,
  IonToolbar,ModalController  } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
import { DetalharAtividadeComponent } from "../detalhar-atividade/detalhar-atividade.component";
@Component({
  selector: 'app-trilha',
  templateUrl: './trilha.component.html',
  styleUrls: ['./trilha.component.scss'],
  imports: [IonButton, IonContent, ActivityButtonComponent, CommonModule,
    FormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonModal,
    IonTitle,
    IonToolbar,
    DetalharAtividadeComponent]
})
export class TrilhaComponent  {

  @Input() atividades: any[] = [];
  cursoService = inject(CursoService);
  router = inject(Router);

  modalControl = inject(ModalController)

  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  getPositionClass(index: number): string {
    const positions = ['item-left', 'item-middle', 'item-right', 'item-middle']; 
    return positions[index % positions.length];
  }

  entrarNaAtividade(atividade: any) {
    this.setAtividadeAtual(atividade);
    this.openModal();
  }

  setAtividadeAtual(atividade: any) {
    console.log('setou');
    
    this.cursoService.setAtividadeAtual(atividade);
    console.log(this.cursoService.getAtividadeAtual());
    
  }

  async openModal() {
    const modal = await this.modalControl.create({
      component: DetalharAtividadeComponent,
    });
    modal.present();

  }

  cancel(){

  }

  confirm(){

  }
}
