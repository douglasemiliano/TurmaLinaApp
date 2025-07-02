import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonSpinner } from '@ionic/angular/standalone';
import { AuthGoogleService } from 'src/app/services/auth/auth-google.service';
import { CoreService } from 'src/app/services/core.service';
import { CursoService } from 'src/app/services/curso.service';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  imports:[NgOptimizedImage, IonSpinner]
})
export class LoadingComponent  implements OnInit {

  constructor() { }

  private router = inject(Router);
  private authService = inject(AuthGoogleService);
  private cursoService = inject(CursoService);

  ngOnInit() {

      if(this.authService.isTokenValid()){
        this.cursoService.atualizarDadosAluno().subscribe({
          next: (response) => {
            this.router.navigateByUrl("/cursos");
          }, error: (error) => {
            console.error("Erro ao atualizar dados do aluno:", error);
            this.router.navigateByUrl("/login");
          }
        })
      } else {
        this.router.navigateByUrl("/login");
      }
  }

}
