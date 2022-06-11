import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  subscriptions:Subscription = new Subscription();

  @ViewChild('table') table!: MatTable<any>;

  usersData!:User[]; //array de todos los usuarios registrados en la app
  usr!:User | null; //datos del usuario que esta logueado en este momento

  displayedColumns = ['id', 'name', 'username', 'actions'];
  dataSource = new MatTableDataSource(this.usersData);
  
  constructor(
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getUsers();
  }

  getUserData() {
    this.subscriptions.add(
      this.userService.getUserData().subscribe((userData) => {
        console.log('Datos del usuario logueado: ', userData)
        this.usr = userData;
      })
    );
  }

  getUsers() {
    this.subscriptions.add(
      this.userService.getUsers().subscribe((users) => {
        console.log('Estos son los usuarios registrados: ', users)
        this.usersData = users;
      })
    )
  }

  onClickAdd() {
    this.userService.setUserToEdit(null)
    .then((res) => {
      if(res) {
        this.router.navigate(['/users/userform']);
      }
    })
    .catch((error) => {
      this._snackBar.open(error.message, 'Cerrar')
    })
  }

  onClickDetails(user:User){
    console.log('Usuario: ', user);
    this.router.navigate([`/users/${user.id}`])
  }

  onClickEdit(user:User){
    console.log('Usuario: ', user);
    this.userService.setUserToEdit(user)
    .then((res) => {
      console.log(res);
      this.router.navigate(['/users/userform']);
    })
    .catch((res) => {
      this._snackBar.open(res.message, 'Cerrar');
    })
  }

  onDeleteuser(user:User){
    console.log('Usuario: ', user);
      /* Se busca el elemento por el id en el array de usuarios,
    Se elimina por el index, y luego usando el ViewChild se renderiza de nuevo la tabla.
    Por ultimo, se actualiza el listado de usuarios en el servicio */
    let indexOfUser = this.usersData.findIndex((usr) => usr.id === user.id)
    this.usersData.splice(indexOfUser, 1)
    this.table.renderRows();
    this.onUpdateDelete(this.usersData)
    this.userService.deleteUser(this.usersData)
    .then((res) => {
      this._snackBar.open(res.message, 'OK')
    })
    .catch((error) => {
      this._snackBar.open(error.message, 'Cerrar')
    })
  }

  onUpdateDelete(el:any) {
    /* Una vez editado por el delete, 
    se modifican los ids (para evitar errores en delete) y ademas hace un update del valor de data */
    el.forEach((el:any,index:number)=>{
      el['id']=index+1
    })
    this.usersData=el;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
