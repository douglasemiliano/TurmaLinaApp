import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-activity-button',
  imports: [IonIcon],
  templateUrl: './activity-button.component.html',
  styleUrl: './activity-button.component.scss'
})
export class ActivityButtonComponent {

  @Input() type: 'primary' | 'secondary' | 'aux' | 'icon' | 'accent' | 'gray' = 'primary';
  @Input() label: string = '';
  @Input() iconName?: string;
  @Input() isDisabled: 'true' | 'false' = 'false';

  @Output() onClick = new EventEmitter<void>();
  isClicked = false;

  constructor(){
    
  }

  clickEmitter(): void {
    navigator.vibrate(200);
    this.isClicked = true;
    this.onClick.emit();
    this.resetClick();
  } 

  resetClick(): void {
    setTimeout(() => {
      this.isClicked = false;
    }, 300);
  }
  
}
