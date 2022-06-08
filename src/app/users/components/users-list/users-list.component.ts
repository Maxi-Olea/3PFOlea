import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
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

  onClickDetails(user:User){
    console.log('Usuario: ', user);
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
