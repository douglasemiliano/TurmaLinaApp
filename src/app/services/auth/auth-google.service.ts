import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { PerfilRequestDto } from 'src/app/models/DTO.model';
import { ClassroomScopes } from './classroom-scopes.constants';
import { Oauth2Scopes } from './oauth2-scopes.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  private auth = inject(Auth);
  private router = inject(Router);

  profile = signal<any>(null);
  idUser = signal<string | null>(null);
  private token = signal<string | null>(null);
  private perfilRequestDto: WritableSignal<PerfilRequestDto> = signal(new PerfilRequestDto());

  constructor() {
    this.loadFromStorage();
  }

  async login() {
    try {
      const provider = new GoogleAuthProvider();
    provider.addScope(ClassroomScopes.CLASSROOM_COURSES),
    provider.addScope(ClassroomScopes.CLASSROOM_COURSEWORK_STUDENTS),
    provider.addScope(ClassroomScopes.CLASSROOM_COURSEWORK_STUDENTS_READONLY),
    provider.addScope(ClassroomScopes.CLASSROOM_COURSEWORK_ME),
    provider.addScope(ClassroomScopes.CLASSROOM_COURSEWORK_ME_READONLY),
    provider.addScope(ClassroomScopes.CLASSROOM_ROSTERS),
    provider.addScope(ClassroomScopes.CLASSROOM_PROFILE_EMAILS),
    provider.addScope(ClassroomScopes.CLASSROOM_PROFILE_PHOTOS),
    provider.addScope(Oauth2Scopes.USERINFO_PROFILE);

      const result = await signInWithPopup(this.auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken ?? null;

      const user = result.user;

      this.profile.set(user);
      this.idUser.set(user.uid);
      this.token.set(accessToken);

      console.log(result.user.providerData[0]);
      

      localStorage.setItem('accessToken', accessToken || '');
      localStorage.setItem('userId', user.providerData[0].uid);
      localStorage.setItem('profile', JSON.stringify(user));
      this.router.navigate(['']);

    } catch (err) {
      console.error('Erro ao fazer login com Google Firebase:', err);
    }
  }

  logout(navegar: boolean = true) {
    signOut(this.auth).then(() => {
      localStorage.clear();
      this.profile.set(null);
      this.idUser.set(null);
      this.token.set(null);

      if (navegar) {
        this.router.navigate(['/login']);
        window.location.reload();
      }
    });
  }

  private loadFromStorage() {
    const profile = localStorage.getItem('profile');
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (profile) this.profile.set(JSON.parse(profile));
    if (userId) this.idUser.set(userId);
    if (accessToken) this.token.set(accessToken);
  }

  isTokenValid(): boolean {
    return true;
  }

  getAccessToken(): string | null {
    return this.token();
  }

  getUserId(): string | null {
    return this.idUser();
  }

  getProfile() {
    return this.profile();
  }

  gerarPerfilRequestDto(): PerfilRequestDto {
    this.perfilRequestDto().nome = this.profile()?.displayName;
    this.perfilRequestDto().email = this.profile()?.email;
    this.perfilRequestDto().foto = this.profile()?.photoURL;
    this.perfilRequestDto().alunoId = this.idUser()!;
    return this.perfilRequestDto();
  }
}
