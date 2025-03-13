import { Component, Input } from '@angular/core';
import { ActivityButtonComponent } from '../../../components/activity-button/activity-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trilha',
  templateUrl: './trilha.component.html',
  styleUrls: ['./trilha.component.scss'],
  imports: [ActivityButtonComponent, CommonModule]
})
export class TrilhaComponent  {

  @Input() atividades: any[] = [];

  getPositionClass(index: number): string {
    const positions = ['item-left', 'item-middle', 'item-right', 'item-middle']; 
    return positions[index % positions.length];
  }
}
