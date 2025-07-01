export class PerfilRequestDto {
  alunoId: string;
  nome: string;
  email: string;
  foto: string;

  constructor() {
    this.alunoId = '';
    this.nome = '';
    this.email = '';
    this.foto = 'assets/default-avatar.png';
  }
}