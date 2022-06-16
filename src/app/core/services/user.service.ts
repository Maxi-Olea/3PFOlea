import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //isLoggedIn:boolean = false;
  isLoggedIn:boolean = true;


  //userData!:User | null;
  userData:User | null = {id: 1, username: 'Admin', name: 'Maxi', lastname: 'Olea', rol: 'admin'} //user mockeado para pruebas
  usersData:User[] = [];
  userToEdit!:User | null;

  usersUrl = 'https://62aa1e323b314385544268cd.mockapi.io/users/';

  constructor(
    private http: HttpClient
  ) {}

  getIsLoggedIn():Observable<boolean> {
    return of(this.isLoggedIn)
  }

  setIsLoggedIn(isLogged: boolean, user: User | null) {
    this.isLoggedIn = isLogged;
    if(user) {
      this.userData = {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        rol: user.rol
      }
    } else {
      this.userData = user;
    }
  }

  logOff() {
    this.isLoggedIn = false;
  }

  getUsers():Observable<User[]> { //Devuelve un array de los usuarios y sus roles
    return this.http.get<User[]>(this.usersUrl);
  }

  getUserById(id: number):Observable<User> {
    return this.http.get<User>(this.usersUrl + id);
  }

  addUser(user: User):Observable<User> {
    return this.http.post<User>(this.usersUrl, user);
  }

  editUser(id:number, user:User):Observable<User> {
    return this.http.put<User>(this.usersUrl + id, user);
  }

  deleteUser(id:number):Observable<User> {
    console.log('el id recibido en el delete: ', id);
    return this.http.delete<User>(this.usersUrl + id);
  }

  getUserToEdit():Observable<User | null> {
    return of(this.userToEdit);
  }

  setUserToEdit(user:User | null):Promise<any> {
    return new Promise((resolve, reject) => {
      if(user || user === null) {
        this.userToEdit = user;
        return resolve(true)
      }else {
        return reject({ message: 'No se pudo setear el userToEdit' })
      }
    })
  }

  getUserData():Observable<User|null> {
    return of(this.userData);
  }

}
