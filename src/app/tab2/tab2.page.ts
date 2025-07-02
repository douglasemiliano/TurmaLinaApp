import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonIcon, IonInput, IonToolbar, IonItem, IonButton, IonContent, IonTitle, IonLabel } from '@ionic/angular/standalone';

import { PhotoService } from '../services/photo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CursoService } from '../services/curso.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonToolbar, IonContent, IonButton, IonItem, IonLabel, IonTitle, FormsModule, IonInput, IonHeader, IonIcon, CommonModule]
})
export class Tab2Page {
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>; // Referência ao elemento <video>
  badgeCode: string = '';
  badges: Array<{ title: string; image: string }> = [];

  private cursoService = inject(CursoService);

  constructor(public photoService: PhotoService) {}

  async scanQRCode() {
    const qrCodeContent = await this.photoService.scanQRCode(this.videoElement.nativeElement); // Passa o elemento <video>
    if (qrCodeContent) {
      this.resgatar(qrCodeContent);
      this.stopCamera();
    } else {
      alert('Nenhum QR Code encontrado.');
    }
  }

  stopCamera() {
    const stream = this.videoElement.nativeElement.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach(track => track.stop()); // Para todos os fluxos de vídeo
      this.videoElement.nativeElement.srcObject = null; // Remove o fluxo do elemento <video>
    }
  }

  resgatar(codigo: string){
    this.cursoService.resgatarBadge(codigo).subscribe({
      next:(response: any) =>{
        alert(response)
      }, error: (error: any) => {
        alert(error.error.text)
      }
    })
  }

  redeemBadge() {
    if (this.badgeCode.length === 8) {
      this.resgatar(this.badgeCode);
    } else {
      alert('Código inválido! Certifique-se de que possui 8 dígitos.');
    }
  }
}

