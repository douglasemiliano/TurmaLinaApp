import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { barbell, basket, call, globe, heart, home, map, people, person, pin, star, trash } from 'ionicons/icons';
import { ListarCursoComponent } from "../pages/curso/listar-curso/listar-curso.component";

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
export class Tab1Page {
  constructor() {
    addIcons({ barbell, basket, call, globe, heart, home, person, pin, star, trash, people, map });
  }
}
