import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons, IonModal} from '@ionic/angular/standalone';
import { settings, settingsOutline, close } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { PerfilComponent } from '../pages/perfil/perfil.component';
import { SettingsComponent } from '../pages/settings/settings.component';
import { ModalController } from "@ionic/angular/standalone";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, PerfilComponent, IonButton, IonIcon, IonButtons],
})
export class Tab3Page {

  
  modalControl = inject(ModalController)
  presentingElement!: HTMLElement | null;

  constructor() {
    addIcons({ settings, settingsOutline, close });

  }

  // openModal() {
  //   this.presentingElement = document.querySelector('.ion-page');
  // } 

    async openModal() {
      const modal = await this.modalControl.create({
        component: SettingsComponent,
      });
      modal.present();
  
    }
}
