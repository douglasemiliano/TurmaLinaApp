import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { IonAvatar } from '@ionic/angular/standalone';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [ NgOptimizedImage, CommonModule, IonAvatar, ProgressBarComponent]
})
export class PerfilComponent {
  isOpen = false;
  fotos: {label: string, path: string}[] = [
    {label: 'Padrão', path:'assets/default-avatar.png'}, 
    {label: 'Cachorro', path:'assets/dog.png'},
    {label: 'Sapo', path:'assets/frog.png'},
    {label: 'Girafa', path:'assets/giraffe.png'},
    {label: 'Leão', path:'assets/lion.png'}, 
    {label: 'Panda', path:'assets/panda.png'},
    {label: 'Tubarão', path:'assets/shark.png'},
    {label: 'Tigre', path:'assets/tiger.png'},
    {label: 'Lobo', path:'assets/wolf.png'},
    {label: 'Zebra', path:'assets/zebra.png'},
  ];
  perfil: WritableSignal<any> = signal<any>(null);

  constructor() {
    if(typeof window !== 'undefined') {
      const perfil = window.localStorage.getItem('perfil');
      if(perfil) {
        this.perfil.set(JSON.parse(perfil));
      } else {
        this.perfil.set({nome: 'Douglas Emiliano', email: 'emaildedouglas@gmail.com', foto: 'assets/lion.png', 
          badges: [
            { nome: 'Explorador', foto: '🧑‍🚀' }, // Explorador com emoji de astronauta (tom mais escuro)
            { nome: 'Finalizador', foto: '🏊🏾‍♂️' }, // Finalizador com emoji de nadador (tom mais escuro)
            { nome: 'Aventureiro', foto: '🧗🏾‍♂️' }, // Aventureiro com emoji de alpinista (tom mais escuro)
            { nome: 'Iniciante', foto: '👣' }, // Iniciante com emoji de pegada (não é amarelo)
            { nome: 'Conquistador', foto: '🏅' }, // Conquistador com emoji de medalha (tom mais escuro)
            { nome: 'Guerreiro', foto: '🛡️' }, // Guerreiro com emoji de escudo
            { nome: 'Mestre', foto: '🧙🏾‍♂️' }, // Mestre com emoji de mago (tom mais escuro)
            { nome: 'Líder', foto: '👑' }, // Líder com emoji de coroa (tom mais escuro)
            { nome: 'Herói', foto: '🦸🏾‍♂️' }, // Herói com emoji de super-herói (tom mais escuro)
            { nome: 'Legendário', foto: '🌠' } 
          ]  }
        );
      }
    } 
  }

  closeCard() {
    this.isOpen = false; // Fecha o card quando recebe o evento
  }

  toggleCard() {
    this.isOpen = !this.isOpen;
  }

  updateFoto(foto: string) {
    this.perfil().foto = foto;
    if(typeof window !== 'undefined') {
      window.localStorage.setItem('perfil', JSON.stringify(this.perfil()));
    }
  }
}