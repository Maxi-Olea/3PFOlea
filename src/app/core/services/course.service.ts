import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Courses } from 'src/app/shared/interfaces/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courseToEdit!: Courses | null;

  apiUrl = 'https://62aa1e323b314385544268cd.mockapi.io/courses/';

  constructor(
    private http: HttpClient
  ) {}

  getCourses():Observable<Courses[]> {
    return this.http.get<Courses[]>(this.apiUrl);
  }

  deleteCourseById(id:number):Observable<Courses> {
    return this.http.delete<Courses>(this.apiUrl + id);
  }

  editCourseById(id:number, course: Courses):Observable<Courses> {
    return this.http.put<Courses>(this.apiUrl + id , course);
  }

  addCourse(course: Courses):Observable<Courses> {
    return this.http.post<Courses>(this.apiUrl, course);
  }

  getCourseToEdit():Observable<Courses | null> {
    return of(this.courseToEdit)
  }

  setCourseToEdit(course: Courses | null) {
    return new Promise((resolve, reject) => {
      if(course || course === null) {
        this.courseToEdit = course;
        return resolve(true)
      } else {
        return reject({ message: ' No se pudo setear el curso a editar' })
      }
    });
  }
  
}
