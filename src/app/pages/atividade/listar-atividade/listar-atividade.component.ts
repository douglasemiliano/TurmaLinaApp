import { Component, inject } from '@angular/core';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonLabel,
  IonAvatar,
  IonContent,
  IonItem,
  IonList,
  IonBadge,
} from '@ionic/angular/standalone';
import { CursoService } from 'src/app/services/curso.service';
import { TrilhaComponent } from '../trilha/trilha.component';

@Component({
  selector: 'app-listar-atividade',
  templateUrl: './listar-atividade.component.html',
  styleUrls: ['./listar-atividade.component.scss'],
  imports: [IonBackButton,
    IonButtons,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    IonSegmentContent,
    IonSegmentView,
    TrilhaComponent,
    IonAvatar,
    IonContent,
    IonItem,
    IonList,
    IonBadge,
  IonLabel]
})
export class ListarAtividadeComponent {

  private cursoService = inject(CursoService);
  cursoAtual = this.cursoService.getCursoAtual();

  currentStep: number = 0; // Para controlar o progresso da trilhas
  atividades = [{id: 1, nome: "Apresentação", status: "concluido"}, 
      {id: 2, nome: "Leitura dirigida", status: "concluido"}, 
      {id: 3, nome: "Produzir Artigo", status: "atribuida"},
      {id: 4, nome: "Seminário Design Thinking", status: "atribuida"}, 
      {id: 5, nome: "Projeto de Vida", status: "concluido"},
      {id: 6, nome: "Atividade 6", status: "atribuida"},
      {id: 7, nome: "Atividade 7", status: "concluido"},
      {id: 8, nome: "Atividade 8", status: "atribuida"},
      {id: 9, nome: "Atividade 9", status: "concluido"},
      {id: 10, nome: "Atividade 10", status: "atribuida"}];
      
  tabs = [
    {
      name: 'Tab 1',
      icon: 'apple'
    },
    {
      name: 'Tab 2',
      icon: 'android'
    }
  ];

  students = [
    { name: 'João Silva', email: 'joao.silva@email.com', photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg', badges: [{ nome: 'Explorador', foto: '🧑‍🚀' }, { nome: 'Finalizador', foto: '🏊🏾‍♂️' }, { nome: 'Aventureiro', foto: '🧗🏾‍♂️' }, { nome: 'Iniciante', foto: '👣' }] },
    { name: 'Maria Souza', email: 'maria.souza@email.com', photoUrl: 'https://randomuser.me/api/portraits/women/2.jpg', badges: [{ nome: 'Conquistador', foto: '🏅' }, { nome: 'Líder', foto: '👑' }, { nome: 'Guerreiro', foto: '🛡️' }] },
    { name: 'Carlos Oliveira', email: 'carlos.oliveira@email.com', photoUrl: 'https://randomuser.me/api/portraits/men/3.jpg', badges: [{ nome: 'Mestre', foto: '🧙🏾‍♂️' }, { nome: 'Herói', foto: '🦸🏾‍♂️' }, { nome: 'Legendário', foto: '🌠' }] },
    { name: 'Ana Lima', email: 'ana.lima@email.com', photoUrl: 'https://randomuser.me/api/portraits/women/4.jpg', badges: [{ nome: 'Aventureiro', foto: '🧗🏾‍♂️' }, { nome: 'Finalizador', foto: '🏊🏾‍♂️' }] },
    { name: 'Pedro Rocha', email: 'pedro.rocha@email.com', photoUrl: 'https://randomuser.me/api/portraits/men/5.jpg', badges: [{ nome: 'Explorador', foto: '🧑‍🚀' }, { nome: 'Guerreiro', foto: '🛡️' }] },
    { name: 'Julia Mendes', email: 'julia.mendes@email.com', photoUrl: 'https://randomuser.me/api/portraits/women/6.jpg', badges: [{ nome: 'Líder', foto: '👑' }, { nome: 'Conquistador', foto: '🏅' }, { nome: 'Mestre', foto: '🧙🏾‍♂️' }] },
    { name: 'Felipe Santos', email: 'felipe.santos@email.com', photoUrl: 'https://randomuser.me/api/portraits/men/7.jpg', badges: [{ nome: 'Herói', foto: '🦸🏾‍♂️' }, { nome: 'Legendário', foto: '🌠' }] },
    { name: 'Camila Alves', email: 'camila.alves@email.com', photoUrl: 'https://randomuser.me/api/portraits/women/8.jpg', badges: [{ nome: 'Aventureiro', foto: '🧗🏾‍♂️' }, { nome: 'Explorador', foto: '🧑‍🚀' }, { nome: 'Finalizador', foto: '🏊🏾‍♂️' }] },
    { name: 'Rafael Martins', email: 'rafael.martins@email.com', photoUrl: 'https://randomuser.me/api/portraits/men/9.jpg', badges: [{ nome: 'Conquistador', foto: '🏅' }, { nome: 'Líder', foto: '👑' }] },
    { name: 'Larissa Costa', email: 'larissa.costa@email.com', photoUrl: 'https://randomuser.me/api/portraits/women/10.jpg', badges: [{ nome: 'Guerreiro', foto: '🛡️' }, { nome: 'Mestre', foto: '🧙🏾‍♂️' }] },
    { name: 'Gustavo Freitas', email: 'gustavo.freitas@email.com', photoUrl: 'https://randomuser.me/api/portraits/men/11.jpg', badges: [{ nome: 'Herói', foto: '🦸🏾‍♂️' }, { nome: 'Legendário', foto: '🌠' }, { nome: 'Iniciante', foto: '👣' }] },
    { name: 'Beatriz Nunes', email: 'beatriz.nunes@email.com', photoUrl: 'https://randomuser.me/api/portraits/women/12.jpg', badges: [{ nome: 'Finalizador', foto: '🏊🏾‍♂️' }, { nome: 'Aventureiro', foto: '🧗🏾‍♂️' }] },
    { name: 'Rodrigo Ferreira', email: 'rodrigo.ferreira@email.com', photoUrl: 'https://randomuser.me/api/portraits/men/13.jpg', badges: [{ nome: 'Explorador', foto: '🧑‍🚀' }, { nome: 'Conquistador', foto: '🏅' }] },
    { name: 'Vanessa Moreira', email: 'vanessa.moreira@email.com', photoUrl: 'https://randomuser.me/api/portraits/women/14.jpg', badges: [{ nome: 'Líder', foto: '👑' }, { nome: 'Guerreiro', foto: '🛡️' }] },
    { name: 'Thiago Barros', email: 'thiago.barros@email.com', photoUrl: 'https://randomuser.me/api/portraits/men/15.jpg', badges: [{ nome: 'Mestre', foto: '🧙🏾‍♂️' }, { nome: 'Herói', foto: '🦸🏾‍♂️' }] },
    { name: 'Isabela Fernandes', email: 'isabela.fernandes@email.com', photoUrl: 'https://randomuser.me/api/portraits/women/16.jpg', badges: [{ nome: 'Legendário', foto: '🌠' }, { nome: 'Iniciante', foto: '👣' }] },
    { name: 'Eduardo Ramos', email: 'eduardo.ramos@email.com', photoUrl: 'https://randomuser.me/api/portraits/men/17.jpg', badges: [{ nome: 'Finalizador', foto: '🏊🏾‍♂️' }, { nome: 'Aventureiro', foto: '🧗🏾‍♂️' }, { nome: 'Conquistador', foto: '🏅' }] },
    { name: 'Patricia Duarte', email: 'patricia.duarte@email.com', photoUrl: 'https://randomuser.me/api/portraits/women/18.jpg', badges: [{ nome: 'Guerreiro', foto: '🛡️' }, { nome: 'Líder', foto: '👑' }] },
    { name: 'Marcos Teixeira', email: 'marcos.teixeira@email.com', photoUrl: 'https://randomuser.me/api/portraits/men/19.jpg', badges: [{ nome: 'Mestre', foto: '🧙🏾‍♂️' }, { nome: 'Explorador', foto: '🧑‍🚀' }] },
    { name: 'Renata Xavier', email: 'renata.xavier@email.com', photoUrl: 'https://randomuser.me/api/portraits/women/20.jpg', badges: [{ nome: 'Herói', foto: '🦸🏾‍♂️' }, { nome: 'Legendário', foto: '🌠' }] }
  ];

  
  getPositionClass(index: number): string {
    const positions = ['item-left', 'item-middle', 'item-right', 'item-middle']; 
    return positions[index % positions.length];
  }
}
