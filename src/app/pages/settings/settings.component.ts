import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRange,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircle, personCircleOutline, sunny, sunnyOutline } from 'ionicons/icons';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [
    FormsModule,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonRange,
    IonText,
    IonTitle,
    IonToggle,
    IonToolbar,
  ],
})
export class SettingsComponent implements OnInit {
  paletteToggle = false;

  constructor() {
    addIcons({ personCircle, personCircleOutline, sunny, sunnyOutline });
  }

  ngOnInit() {
    // Recuperar o valor do modo de tema do localStorage
    const storedTheme = localStorage.getItem('theme');

    // Verificar se o valor existe no localStorage, caso contrário, verificar a preferência do sistema
    if (storedTheme) {
      // Se o valor estiver no localStorage, usar esse valor
      this.paletteToggle = storedTheme === 'dark';
    } else {
      // Caso não haja valor no localStorage, verificar a preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      this.paletteToggle = prefersDark.matches;
    }

    // Aplicar o tema inicial
    this.toggleDarkPalette(this.paletteToggle);

    // Escutar mudanças no sistema de preferência de cores
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }

  // Método para inicializar o tema
  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  // Método chamado quando o toggle é alterado
  toggleChange(event: CustomEvent) {
    const isDark = event.detail.checked;
    this.toggleDarkPalette(isDark);
    
    // Salvar o novo valor no localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  // Adicionar ou remover a classe "ion-palette-dark" no elemento HTML
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }
}
