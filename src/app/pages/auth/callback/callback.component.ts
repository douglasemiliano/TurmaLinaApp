import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from "@ionic/angular/standalone";
import lottie from 'lottie-web';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
  imports: [IonContent]
})
export class CallbackComponent implements OnInit {

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() { }

  ngOnInit() {
    this.route.fragment.subscribe({
      next: (fragment) => {
        if (fragment) {
          const params = new URLSearchParams(fragment);
          const accessToken = params.get('access_token');
          const idToken = params.get('id_token');

          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
          }

          if (idToken) {
            localStorage.setItem("idToken", idToken);
          }

          console.log('Access Token:', accessToken);
          console.log('ID Token:', idToken);
        }

      }
    });


    this.carregarAnimacao();
  }

  carregarAnimacao() {
    lottie.loadAnimation({
      container: document.getElementById('success-animation')!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/animations/success.json',
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
        progressiveLoad: true,
        hideOnTransparent: true,
      },
    });

  }

  ngAfterViewInit() {

  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.router.navigate(["dashboard"])
    }, 3000);

  }

}
