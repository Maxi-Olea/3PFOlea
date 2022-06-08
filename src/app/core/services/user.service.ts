import { Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { User } from '../../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn:boolean = false;

  users:User[] = [{
    id: 1,
    username: 'Admin',
    name: 'Maxi',
    lastname: 'Olea',
    password: 'admin1234',
    rol: 'admin'
  },{
    id: 2,
    username: 'User01',
    name: 'User',
    lastname: 'Olea',
    password: 'user1234',
    rol: 'user'
  },];

  userData!:User | null;
  usersData:User[] = [];


  getUsers():Observable<User[]> { //Devuelve un array de los usuarios y sus roles
    this.users.forEach(user => {
      let userData = {
        id: user.id,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        rol: user.rol
      }
      this.usersData.push(userData)
    });
    return of(this.usersData)
  }

  getIsLoggedIn():Observable<boolean> {
    return of(this.isLoggedIn)
  }

  checkLogin(username:string, password:string):Observable<boolean> {
    let user = this.users.find((usr) => usr.username === username)
    if(user && user.password === password) {
      console.log(user)
      this.isLoggedIn = true;
      this.userData = {
        id: user.id,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
        rol: user.rol
      }
      return of(this.isLoggedIn);
    } else {
      this.isLoggedIn = false;
      this.userData = null;
      return of(this.isLoggedIn)
    }
  }

  getUserData():Observable<User|null> {
    return of(this.userData);
  }

  getTime():Observable<string> {
    return new Observable<string>((observer: Observer<string>) => {
      setInterval(() => observer.next(new Date().toString()), 1000);
    });
  }
}
