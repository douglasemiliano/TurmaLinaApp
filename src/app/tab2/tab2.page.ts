import { Component, ElementRef, inject, ViewChild, OnInit } from '@angular/core';
import { IonHeader, IonIcon, IonToolbar, IonCardSubtitle, IonButton, IonSelect, IonSelectOption, IonItem, IonContent, IonTitle, IonListHeader, IonCardHeader, IonCardContent, IonCard, IonCardTitle, IonImg, IonList, ToastController } from '@ionic/angular/standalone';

import { PhotoService } from '../services/photo.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CursoService } from '../services/curso.service';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input'; 
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ModalController } from "@ionic/angular/standalone";
import { QrCodeComponent } from '../components/qr-code/qr-code.component';
import { CoreService } from 'src/app/services/core.service';
import {Clipboard} from '@angular/cdk/clipboard';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonList, IonCardTitle, IonCard, IonCardContent, IonCardHeader, IonListHeader, IonSelect, IonSelectOption, IonItem, IonToolbar, IonContent, ReactiveFormsModule, NgOtpInputComponent, IonButton, IonTitle, FormsModule, IonHeader, IonIcon, CommonModule, ClipboardModule, QRCodeComponent]
})
export class Tab2Page implements OnInit {
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>; // Referência ao elemento <video>
  badgeCode = '';
  textoParaCopiar = '';
  otp: FormControl = new FormControl();
  config: NgOtpInputConfig = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    separator: '-'
  };
  badges: any[] = [];

  private cursoService = inject(CursoService);
  private coreService = inject(CoreService);
  private toastCtrl = inject(ToastController);
  modalCtrl = inject(ModalController)
  modoVisualizacao = this.coreService.modoVisualizacao();
  badgeSelecionada: any = null;

  private clipboard = inject(Clipboard);
  constructor(public photoService: PhotoService) { }


  ngOnInit() {
    console.log(this.modoVisualizacao);

    if (this.modoVisualizacao === "PROFESSOR") {
      this.getBadges();
    }

    this.coreService.getModo().subscribe({
      next: (modo: string) => {
        this.modoVisualizacao = modo;
        console.log(modo);

        if (this.modoVisualizacao === "PROFESSOR") {
          this.getBadges();
        }

      }
    })
  }

  getBadges() {
    this.cursoService.getBadgesByUser(this.cursoService.idUser).subscribe({
      next: (badges: any) => {
        this.badges = badges;
        console.log(this.badges);
      }
    })
  }


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

  async resgatar(codigo: string) {
    this.cursoService.resgatarBadge(codigo).subscribe({
      next: async (response: any) => {
        const toast = await this.toastCtrl.create({
          message: `Você resgatou a recompensa: ${response.nome}!`,
          duration: 3000,
          color: 'success',
          icon: 'trophy-outline'
        });
        await toast.present();
      }, error: async (error: any) => {
        const toast = await this.toastCtrl.create({
          message: error.error.text,
          duration: 3000,
          color: 'danger',
          icon: 'alert-circle-outline'
        });
        await toast.present();
      }
    })
  }

  async redeemBadge() {
    if (this.otp.value.length === 6) {
      this.resgatar(this.otp.value);
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Código inválido! Certifique-se de que possui 6 dígitos.',
        duration: 3000,
        color: 'warning',
        icon: 'warning-outline'
      });
      await toast.present();
    }
  }

  async abrirModalQrCode() {
    const modal = await this.modalCtrl.create({
      component: QrCodeComponent,
    });
    modal.present();

  }

  badgeChange(event: any) {
    this.badgeCode = ''; // Limpa o código ao trocar a badge
    console.log(event.detail.value);
    this.atualizarTextoParaCopiar();
  }

  async gerarCodigo() {
    if (this.badgeSelecionada) {
      this.cursoService.gerarCodigoResgate(this.badgeSelecionada.id).subscribe({
        next: (response: any) => {
          this.badgeCode = response.codigo;
          this.atualizarTextoParaCopiar();
        },
        error: async (error: any) => {
          const toast = await this.toastCtrl.create({
            message: `Erro ao gerar código: ${error.error.text}`,
            duration: 3000,
            color: 'danger',
            icon: 'alert-circle-outline'
          });
          await toast.present();
          this.badgeCode = error.error.text;
        }
      });
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Selecione uma recompensa primeiro.',
        duration: 2000,
        color: 'warning',
        icon: 'warning-outline'
      });
      await toast.present();
    }
  }

  atualizarTextoParaCopiar() {
    if (this.badgeCode && this.badgeSelecionada) {
      this.textoParaCopiar = `Parabéns! Use este código para resgatar sua recompensa "${this.badgeSelecionada.nome}": ${this.badgeCode}`;
    } else {
      this.textoParaCopiar = '';
    }
  }

  async onCodigoCopiado() {
        this.clipboard.copy(this.badgeCode);

    const toast = await this.toastCtrl.create({
      message: 'Frase com o código copiada!',
      duration: 2000,
      color: 'success',
      icon: 'clipboard-outline'
    });
    await toast.present();
  }
}
