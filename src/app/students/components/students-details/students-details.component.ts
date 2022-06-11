import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from 'src/app/core/services/student.service';
import { UserService } from 'src/app/core/services/user.service';
import { Student } from 'src/app/shared/interfaces/student.interface';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.scss']
})
export class StudentsDetailsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  user!:User | null; //Datos del usuario logueado

  student!: Student; //Estudiante a mostrar detalles
  studentsData!: Student[]; //Listado de estudiantes

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private studentService: StudentService,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getStudents();
    this.getStudentDetails();
  }

  getUserData() {
    this.subscriptions.add(
      this.userService.getUserData().subscribe((userData) => {
        console.log('Datos del usuario logueado: ', userData)
        this.user = userData;
      })
    );
  }

  getStudents() {
    this.subscriptions.add(
      this.studentService.getStudents().subscribe((data: Student[]) => {
        this.studentsData = data
        console.log('Data: ', this.studentsData)
      })
    )
  }

  getStudentDetails() {
    let id:number = parseInt(this.route.snapshot.paramMap.get('id') as string);
    let studentData = this.studentsData.find((student) => student.id === id)
    if(studentData) {
      console.log('Detalles del estudiante: ', studentData);
      this.student = studentData;
    }
    else {
      this._snackbar.open('No se pudo recuperar la información del estudiante', 'Cerrar');
    }
  }

  onClickEdit() {
    this.studentService.setStudentToEdit(this.student)
    .then((res) => {
      this.router.navigate(['/students/studentform']);
    })
    .catch((error) => this._snackbar.open(error.message, 'Cerrar'));
  }

  onDeleteStudent() {
    let indexOfStudent = this.studentsData.findIndex((x) => x.id === this.student.id)
    this.studentsData.splice(indexOfStudent, 1)
    this.onUpdateDelete(this.studentsData)
    this.studentService.setStudents(this.studentsData)
    .then((res) => this.router.navigate(['students']))
    .catch((error) => this._snackbar.open(error.message, 'Cerrar'));
  }

  onUpdateDelete(element:any) {
    /* Una vez editado por el delete, 
    se modifican los ids (para evitar errores en delete) y ademas hace un update del valor de data */
    element.forEach((el:any,index:number)=>{
      el['id']=index+1
    })
    this.studentsData=element;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
