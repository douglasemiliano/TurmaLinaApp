import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CursoService } from '../../../services/curso.service';
import { CoreService } from 'src/app/services/core.service';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonThumbnail, IonSkeletonText } from '@ionic/angular/standalone';
import { AuthGoogleService } from 'src/app/services/auth/auth-google.service';


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
  private authService = inject(AuthGoogleService);

  // cursos = [{id: 1, nome: "Matemática", section: "1", descricao: "Um curso de matemática voltado para gamificação", codigoAcesso: "1234567890", status: "ACTIVE"}, 
  //   {id: 2, nome: "Português", section: "2", descricao: "Um curso de português voltado para pratica de redação", codigoAcesso: "1234567890", status: "ACTIVE"}, 
  //   {id: 3, nome: "História", section: "3", descricao: "Um curso de história voltado para antiguidade", codigoAcesso: "1234567890", status: "ACTIVE"},
  //   {id: 4, nome: "Geografia", section: "4", descricao: "Um curso de geografia voltado para geologia", codigoAcesso: "1234567890", status: "ACTIVE"},
  //   {id: 5, nome: "Programação", section: "5", descricao: "Um curso de programação voltado para a lógica de programação", codigoAcesso: "1234567890", status: "ACTIVE"},
  //   {id: 6, nome: "Química", section: "6", descricao: "Um curso de química voltado para a química orgânica", codigoAcesso: "1234567890", status: "ACTIVE"  },
  //   {id: 7, nome: "Física", section: "7", descricao: "Um curso de física voltado para a física quântica", codigoAcesso: "1234567890", status: "ACTIVE"  },
  //   {id: 8, nome: "Biologia", section: "8", descricao: "Um curso de biologia voltado para a biologia molecular", codigoAcesso: "1234567890", status: "ACTIVE"  },
  //   {id: 9, nome: "Inglês", section: "9", descricao: "Um curso de inglês voltado para a gramática inglesa", codigoAcesso: "1234567890", status: "ACTIVE"  },
  //   {id: 10, nome: "Espanhol", section: "10", descricao: "Um curso de espanhol voltado para a gramática espanhola", codigoAcesso: "1234567890", status: "ACTIVE"  },
  //   {id: 11, nome: "Programação de computadores", section: "11", descricao: "Um curso de programação de computadores voltado para a lógica de programação", codigoAcesso: "1234567890", status: "ACTIVE"  },
  //   ]

  cursos: any[] = [];

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
