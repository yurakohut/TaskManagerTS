import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user.interface';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CheckUserService {
  users: Array<IUser> = [];
  userInSystem: any = 'Guest';

  constructor(
    private localStorageService: LocalStorageService,
    private route: Router,
    private firebaseService: FirebaseService) { }

  checkAuthorization() {
    const userFromLS = this.localStorageService.getDataLocalStorage('User');
    if (userFromLS.length === 0) {
      this.route.navigate(['tasks/authorization']);
    }
    else {
      //Якщо користувач змінить щось в Local Storage,
      //то його викине на форму логування, а Local Storage очиститься
      const isCorrectUser = this.users.find(user =>
        user.username === userFromLS[0].username
        && user.password === userFromLS[0].password
        && user.email === userFromLS[0].email);
      if (isCorrectUser) {
        this.userInSystem = userFromLS[0];
      }
      else {
        this.logOut();
      }
    };
  };

  logOut() {
    this.localStorageService.deleteDataFromLS('User');
    this.route.navigate(['tasks/authorization']);
  };

  getAllUsers() {
    this.firebaseService.getData('users').subscribe(actionArray => {
      this.users = actionArray.map(user => {
        return {
          id: user.payload.doc.id,
          ...user.payload.doc.data()
        };
      });
      this.checkAuthorization();
    });
  };
}
