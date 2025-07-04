import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { IonHeader, IonIcon, IonToolbar, IonButton, IonContent, IonTitle } from '@ionic/angular/standalone';

import { PhotoService } from '../services/photo.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CursoService } from '../services/curso.service';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { ModalController } from "@ionic/angular/standalone";
import { QrCodeComponent } from '../components/qr-code/qr-code.component';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonToolbar, IonContent, ReactiveFormsModule, NgOtpInputComponent, IonButton, IonTitle, FormsModule, IonHeader, IonIcon, CommonModule]
})
export class Tab2Page {
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>; // Referência ao elemento <video>
  badgeCode = '';
  otp:FormControl = new FormControl();
  config: NgOtpInputConfig = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    separator:'-'
  };
  badges: Array<{ title: string; image: string }> = [];

  private cursoService = inject(CursoService);
  modalCtrl = inject(ModalController)

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
        alert(response.nome)
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

    async abrirModalQrCode() {
      const modal = await this.modalCtrl.create({
        component: QrCodeComponent,
      });
      modal.present();
  
    }

  
}

