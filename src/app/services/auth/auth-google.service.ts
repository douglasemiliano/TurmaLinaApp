import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithCredential
} from '@angular/fire/auth';
import { PerfilRequestDto } from 'src/app/models/DTO.model';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import {
  ClassroomScopes,
  getAllClassroomScopes
} from './classroom-scopes.constants';
import {
  getAllOath2Scopes,
  Oauth2Scopes
} from './oauth2-scopes.constants';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  private auth = inject(Auth);
  private router = inject(Router);
  private platform = inject(Platform);

  profile = signal<any>(null);
  idUser = signal<string | null>(null);
  private token = signal<string | null>(null);
  private perfilRequestDto: WritableSignal<PerfilRequestDto> = signal(new PerfilRequestDto());

  constructor(private alertCtrl: AlertController) {
    this.loadFromStorage();

    // ⚠️ Só inicializa o plugin em dispositivos nativos
    if (Capacitor.isNativePlatform()) {
      import('@codetrix-studio/capacitor-google-auth').then(({ GoogleAuth }) => {
        GoogleAuth.initialize({
          clientId: environment.GOOGLE_CLIENT_ID,
          scopes: getAllClassroomScopes().concat(getAllOath2Scopes())
        });
      });
    }
  }

  async login() {
    try {
      let userData: any;
      let accessToken: string | null = null;

      const provider = new GoogleAuthProvider();
      provider.addScope(ClassroomScopes.CLASSROOM_COURSES);
      provider.addScope(ClassroomScopes.CLASSROOM_COURSEWORK_STUDENTS);
      provider.addScope(ClassroomScopes.CLASSROOM_COURSEWORK_STUDENTS_READONLY);
      provider.addScope(ClassroomScopes.CLASSROOM_COURSEWORK_ME);
      provider.addScope(ClassroomScopes.CLASSROOM_COURSEWORK_ME_READONLY);
      provider.addScope(ClassroomScopes.CLASSROOM_ROSTERS);
      provider.addScope(ClassroomScopes.CLASSROOM_PROFILE_EMAILS);
      provider.addScope(ClassroomScopes.CLASSROOM_PROFILE_PHOTOS);
      provider.addScope(Oauth2Scopes.USERINFO_PROFILE);

      if (Capacitor.isNativePlatform()) {
        // 📱 Login nativo no Android
        const { GoogleAuth } = await import('@codetrix-studio/capacitor-google-auth');

        const googleUser = await GoogleAuth.signIn();
        const idToken = googleUser.authentication?.idToken;

        this.showDebug(googleUser)
        this.showDebug(idToken)

        if (!idToken) {
          throw new Error('Erro: idToken não encontrado');
        }

        const credential = GoogleAuthProvider.credential(idToken);
        const result = await signInWithCredential(this.auth, credential);

        this.showDebug(credential)
        this.showDebug(result)

        accessToken = googleUser.authentication?.accessToken ?? null;
        userData = result.user;
      } else {
        // 💻 Login na Web
        const result = await signInWithPopup(this.auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        accessToken = credential?.accessToken ?? null;
        userData = result.user;
      }

      // 📦 Salvar dados no signal e localStorage
      this.profile.set(userData);
      this.idUser.set(userData.providerData[0].uid);
      this.token.set(accessToken);

      localStorage.setItem('profile', JSON.stringify(userData));
      localStorage.setItem('userId', userData.providerData[0].uid);
      localStorage.setItem('accessToken', accessToken ?? '');

      this.router.navigate(['']);
    } catch (error) {
      console.error('Erro ao fazer login com Google Firebase:', error);
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
    return this.token() ? true : false;
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

  async showDebug(data: any) {
  const alert = await this.alertCtrl.create({
    header: 'Debug Info',
    message: JSON.stringify(data),
    buttons: ['OK']
  });

  await alert.present();
}
}
