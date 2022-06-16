import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Student } from 'src/app/shared/interfaces/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl = 'https://62aa1e323b314385544268cd.mockapi.io/students/';

  studentToEdit!: Student | null;

  constructor(
    private http: HttpClient
  ) {}

  getStudents():Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(this.apiUrl + id);
  }

  deleteStudentById(id: number): Observable<Student> {
    return this.http.delete<Student>(this.apiUrl + id);
  }

  editStudentById(id:number, student: Student): Observable<Student> {
    console.log('El id recibido es: ', id)
    return this.http.put<Student>(this.apiUrl + id, student);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  getStudentToEdit():Observable<Student | null> {
    return of(this.studentToEdit);
  }

  setStudentToEdit(student: Student | null) {
    return new Promise((resolve, reject) => {
      if(student || student === null) {
        this.studentToEdit = student;
        return resolve(true)
      }else {
        return reject({ message: 'No se pudo setear el studentToEdit' })
      }

    });
  }

}

