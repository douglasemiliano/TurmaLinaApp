import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonSpinner } from '@ionic/angular/standalone';
import { AuthGoogleService } from 'src/app/services/auth/auth-google.service';
import { CoreService } from 'src/app/services/core.service';
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

  ngOnInit() {
    setTimeout(() => {
      if(this.authService.isTokenValid()){
        this.router.navigateByUrl("/cursos");
      } else {
        this.router.navigateByUrl("/login");
      }
    }, 5000
  );
  }

}
