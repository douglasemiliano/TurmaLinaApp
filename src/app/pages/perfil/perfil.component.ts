import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { IonAvatar } from '@ionic/angular/standalone';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [NgOptimizedImage, CommonModule, IonAvatar, ProgressBarComponent]
})
export class PerfilComponent {
  isOpen = false;
  fotos: { label: string, path: string }[] = [
    { label: 'Padrão', path: 'assets/default-avatar.png' },
    { label: 'Cachorro', path: 'assets/dog.png' },
    { label: 'Sapo', path: 'assets/frog.png' },
    { label: 'Girafa', path: 'assets/giraffe.png' },
    { label: 'Leão', path: 'assets/lion.png' },
    { label: 'Panda', path: 'assets/panda.png' },
    { label: 'Tubarão', path: 'assets/shark.png' },
    { label: 'Tigre', path: 'assets/tiger.png' },
    { label: 'Lobo', path: 'assets/wolf.png' },
    { label: 'Zebra', path: 'assets/zebra.png' },
  ];
  perfil: WritableSignal<any> = signal<any>(null);
  private cursoService = inject(CursoService);
  private userId = localStorage.getItem('userId');

  constructor() {
    if (typeof window !== 'undefined') {

      if (this.userId) {
        this.cursoService.getPerfilAluno(this.userId).subscribe({
          next: (perfil: any) => {
            console.log(perfil);
            this.perfil.set(perfil);
          }
        })
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
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('perfil', JSON.stringify(this.perfil()));
    }
  }
}