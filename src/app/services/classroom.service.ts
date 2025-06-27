import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private http: HttpClient) { }

  getCursos(){
    return this.http.get('localhost:8080/cursos/102146008654804993284');
  }
}
