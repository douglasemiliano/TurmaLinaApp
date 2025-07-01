import { Component, inject, Input, ViewChild } from '@angular/core';
import { ActivityButtonComponent } from '../../../components/activity-button/activity-button.component';
import { CommonModule } from '@angular/common';
import { CursoService } from 'src/app/services/curso.service';
import { Router } from '@angular/router';
import { 
  IonModal,
  ModalController  } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { DetalharAtividadeComponent } from "../detalhar-atividade/detalhar-atividade.component";
@Component({
  selector: 'app-trilha',
  templateUrl: './trilha.component.html',
  styleUrls: ['./trilha.component.scss'],
  imports: [ActivityButtonComponent, CommonModule,
    FormsModule]
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
    this.cursoService.setAtividadeAtual(atividade);
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
