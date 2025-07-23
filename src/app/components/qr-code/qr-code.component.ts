import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ModalController } from "@ionic/angular/standalone";
import { IonContent, IonButton, IonHeader, IonToolbar, IonTitle, IonButtons, ToastController } from '@ionic/angular/standalone';
import { CursoService } from 'src/app/services/curso.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
  imports: [IonButton, 
      IonContent,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonButtons
    ]
})
export class QrCodeComponent  implements OnInit {

  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>; // Referência ao elemento <video>

  modalCtrl = inject(ModalController);
  photoService = inject(PhotoService);
  cursoService = inject(CursoService);
  private toastCtrl = inject(ToastController);

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.scanQRCode();
  }

  ngOnDestroy(){
    this.stopCamera();
  }

  cancel(){
    this.modalCtrl.dismiss();
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


}
