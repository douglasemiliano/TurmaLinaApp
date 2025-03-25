import { Component, EventEmitter, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { barbell, basket, call, globe, heart, home, map, people, person, pin, star, trash } from 'ionicons/icons';
import { ListarCursoComponent } from "../pages/curso/listar-curso/listar-curso.component";
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    ListarCursoComponent,
    ListarCursoComponent],
})
export class Tab1Page implements OnInit {
  private coreService = inject(CoreService);

  constructor() {
    addIcons({ barbell, basket, call, globe, heart, home, person, pin, star, trash, people, map });
    this.coreService.atualizarRotaAtual(location.pathname);
    console.log(location.pathname);
    
  }

  ngOnInit(): void {
    console.log("entrou");
    
  }


}
