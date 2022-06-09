import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  usersData!:User[]; //array de todos lod usuarios registrados en la app
  usr!:User | null; //datos del usuario que esta logueado en este momento

  displayedColumns = ['id', 'name', 'username', 'actions'];
  dataSource = new MatTableDataSource(this.usersData);
  
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn();
    this.getUserData();
    this.getUsers();
  }

  isLoggedIn() {
    this.subscriptions.add(
      this.userService.getIsLoggedIn().subscribe((res) => {
        console.log('esta logueado?: ', res)
        if(!res) {
          console.log('nevego a la otra dirección')
          this.router.navigate(['/']);
        }
      })
    );
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

  onClickDetails(user:User){
    console.log('Usuario: ', user);
    this.router.navigate([`/users/${user.id}`])
  }

  onClickEdit(user:User){
    console.log('Usuario: ', user);
  }

  onDeleteuser(user:User){
    console.log('Usuario: ', user);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
