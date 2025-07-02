import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";
import { IonButton } from "@ionic/angular/standalone";
import { IonIcon } from "@ionic/angular/standalone";
import { AuthGoogleService } from 'src/app/services/auth/auth-google.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonContent, IonButton, NgOptimizedImage, IonIcon]
})
export class LoginComponent  implements OnInit {

  authService = inject(AuthGoogleService)

  constructor() { }

  ngOnInit() {
    this.authService.logout(false);
  }

  loginWithGoogle() {
    this.authService.login();
  }
}
