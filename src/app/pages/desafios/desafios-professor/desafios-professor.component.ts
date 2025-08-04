import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonHeader, IonInput, IonSelect, IonItem, IonListHeader, IonToolbar, IonList, IonSelectOption, IonItemGroup, IonButton,
  IonLabel, IonDatetimeButton, IonModal, IonTextarea, IonContent, IonTitle, IonItemDivider, IonDatetime, IonToggle } from "@ionic/angular/standalone";
import { WinCondition, WinConditionTipo } from 'src/app/models/Desafio.model';
import { Desafio } from 'src/app/models/Desafio.model';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-desafios-professor',
  templateUrl: './desafios-professor.component.html',
  styleUrls: ['./desafios-professor.component.scss'],
  imports: [IonToggle, IonDatetime, IonItemDivider, CommonModule, FormsModule, ReactiveFormsModule, IonHeader, IonToolbar, IonInput, IonLabel, 
    IonTextarea, IonItem, IonDatetimeButton, IonModal, IonList, IonSelect, IonSelectOption, IonItemGroup, IonListHeader, IonButton, IonContent, IonTitle]
})
export class DesafiosProfessorComponent implements OnInit {

  form: FormGroup;
  private cursoService = inject(CursoService);

  tiposWincondition: WinConditionTipo[] = Object.values(WinConditionTipo);
  badges: any[] = [];


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      cursoId: [this.cursoService.getCursoAtual().id, Validators.required],
      createdBy: [this.cursoService.idUser, Validators.required],
      titulo: ['', Validators.required],
      descricao: [''],
      ativo: [true],
      dataFinal: ['', Validators.required],
      premio: this.fb.array([
        this.fb.group({
          pontuacao: [0, Validators.required],
          badgeId: ['', Validators.required],
        }),
      ]),
      winCondition: this.fb.array([
        this.fb.group({
          tipo: ['PRIMEIRA_ATIVIDADE', Validators.required],
          quantidade: [1, Validators.required],
          estado: this.fb.array([
            this.fb.control('TURNED_IN'),
            this.fb.control('RETURNED'),
          ]),
        }),
      ]),
    });
  }

  ngOnInit(): void {
    this.getBadges();
  }

  get premio() {
    return this.form.get('premio') as FormArray;
  }

  get winCondition() {
    return this.form.get('winCondition') as FormArray;
  }

  addPremio() {
    this.premio.push(
      this.fb.group({
        pontuacao: [0],
        badgeId: [''],
      })
    );
  }

  addWinCondition() {
    this.winCondition.push(
      this.fb.group({
        tipo: [''],
        quantidade: [1],
        estado: this.fb.array([]),
      })
    );
  }

  getEstadoControls(winCond: AbstractControl): FormArray {
  return winCond.get('estado') as FormArray;
}


  submit() {
      console.log(this.form.value);
      this.cursoService.criarDesafio(this.form.value).subscribe({
        next: (desafio: any) => {
          alert(desafio.message)
        }
      })
  }

    getBadges(){
    this.cursoService.getAllBadges().subscribe({
      next: (badges: any) => {
        this.badges = badges;
      }
    })
  }
}