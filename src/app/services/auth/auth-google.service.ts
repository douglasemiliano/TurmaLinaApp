import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  private oAuthService = inject(OAuthService);
  private router = inject(Router);
  profile = signal<any>(null);
  idUser = signal<any>(null);
  private token = signal<any>(null);

  constructor() {
    this.initConfiguration();
  }

  private async initConfiguration() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();

    try {
      await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
      if (this.oAuthService.hasValidAccessToken()) {
        this.updateUserData();
      }
    } catch (error) {
      console.error('Erro ao carregar o login:', error);
    }
  }

  login() {
    this.oAuthService.initCodeFlow(); // Usando Code Flow com PKCE
  }
  

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
    window.localStorage.clear();
    this.profile.set(null);
    this.router.navigate(['/login']);
    window.location.reload();
  }

  private updateUserData() {
    const claims = this.oAuthService.getIdentityClaims();
    
    if (claims) {
      this.profile.set(claims);
      this.idUser.set(claims['sub']);
      this.token.set(this.oAuthService.getAccessToken());
      localStorage.setItem("accessToken", this.oAuthService.getAccessToken());
      localStorage.setItem("userId", this.oAuthService.getIdentityClaims()['sub'])
      localStorage.setItem("profile", JSON.stringify(this.oAuthService.getIdentityClaims()));

    }
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('accessToken');
    return token != null && this.oAuthService.hasValidAccessToken();
  }

  getAccessToken(): string | null {
    return this.oAuthService.getAccessToken();
  }

  getUserId(): string | null {
    return this.idUser();
  }

  getProfile() {
    return this.profile();
  }
}
