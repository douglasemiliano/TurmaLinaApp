import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonSpinner } from '@ionic/angular/standalone';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  imports:[NgOptimizedImage, IonSpinner]
})
export class LoadingComponent  implements OnInit {

  constructor() { }

  private router = inject(Router);

  ngOnInit() {
    setTimeout(() => {
      this.router.navigateByUrl("/cursos");
    }, 5000
  );
  }

}
