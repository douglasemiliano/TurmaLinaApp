import { Component, inject, OnInit, Signal, WritableSignal } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TabsPage } from './tabs/tabs.page';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from './services/core.service';
import { AuthGoogleService } from './services/auth/auth-google.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, TabsPage],
})
export class AppComponent implements OnInit {
  paletteToggle = false;

  private coreService = inject(CoreService);
  private authService = inject(AuthGoogleService);
  private router = inject(Router);

  rotaAtual: Signal<string> = this.coreService.rotaAtual;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.redirectToLogin();

    console.log(location.pathname);
    console.log(this.rotaAtual());
    
    this.coreService.atualizarRotaAtual(location.pathname);
    // Recuperar o valor do modo de tema do localStorage
    const storedTheme = localStorage.getItem('theme');

    // Verificar se o valor existe no localStorage, caso contrário, verificar a preferência do sistema
    if (storedTheme) {
      // Se o valor estiver no localStorage, usar esse valor
      this.paletteToggle = storedTheme === 'dark';
    } else {
      // Caso não haja valor no localStorage, verificar a preferência do sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      this.paletteToggle = prefersDark.matches;
    }

    // Aplicar o tema inicial
    this.toggleDarkPalette(this.paletteToggle);

    // Escutar mudanças no sistema de preferência de cores
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }

  // Método para inicializar o tema
  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }


  // Adicionar ou remover a classe "ion-palette-dark" no elemento HTML
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  redirectToLogin() {

    setInterval(() => {
      console.log("Verificando token de autenticação...");
      if(!this.authService.isTokenValid()){
        console.log("Token inválido, redirecionando para o login...");
        this.router.navigate(['/login']);
      }
      console.log("Token de autenticação válido, continuando a navegação...");
    }, 100000);

    

  }
}
