import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CursoService } from '../../../services/curso.service';
import { CoreService } from 'src/app/services/core.service';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonThumbnail, IonSkeletonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-listar-curso',
  imports: [ RouterModule, IonContent, IonHeader, IonToolbar, IonTitle, IonThumbnail, IonSkeletonText],
  templateUrl: './listar-curso.component.html',
  styleUrl: './listar-curso.component.scss'
})
export class ListarCursoComponent implements OnInit {

  private router = inject(Router);
  private cursoService = inject(CursoService);
  private coreService = inject(CoreService);

  cursos: any[];

    ngOnInit(): void {      
      this.cursoService.getCursos().subscribe({
        next: (cursos: any) => {
          this.cursos = cursos;
        },
        error: (error) => {
          console.error('Erro ao carregar os cursos:', error);
        }
      })
      this.coreService.atualizarRotaAtual(location.pathname);
    }

  entrarNoCurso(curso: any) {
    this.router.navigate(['/cursos', curso.id]);
    this.setCursoAtual(curso);
  }

  setCursoAtual(curso: any) {
    this.cursoService.setCursoAtual(curso);
  }

}
