import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { User } from 'src/app/shared/classes/user.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-tasks-manager-authorization',
  templateUrl: './tasks-manager-authorization.component.html',
  styleUrls: ['./tasks-manager-authorization.component.css']
})
export class TasksManagerAuthorizationComponent implements OnInit {
  form: FormGroup;
  users: Array<IUser> = [];
  signUpOrLogInCheck: boolean = true;
  title: string = 'Sign Up'
  userName: string;
  existingName: boolean;
  existingEmail: boolean;
  wrongData: boolean;

  constructor(private route: Router,
    private firebaseService: FirebaseService,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
    this.getAllUsers();
    this.checkAuthorization();
  };

  getAllUsers(): void {
    this.firebaseService.getData('users').subscribe(actionArray => {
      this.users = actionArray.map(user => {
        return {
          id: user.payload.doc.id,
          ...user.payload.doc.data()
        };
      });
    });
  }

  //Перевірка логування / реєстрації
  checkLog(): void {
    this.signUpOrLogInCheck = !this.signUpOrLogInCheck;
    this.title = this.title === 'Sign Up' ? 'Log In' : 'Sign Up';
    this.existingName = false;
    this.existingEmail = false;
    this.wrongData = false;
    this.form.reset();
  };

  createNewUser(): User {
    const userData = { ...this.form.value };
    return new User(userData.username, userData.email, userData.password);
  };

  signUp(): void {
    if (this.form.valid) {
      const newUser: IUser = this.createNewUser();
      if (!this.isDataExist(newUser)) {
        this.firebaseService.setData(newUser, 'users');
        this.successfulTransition(newUser);
      }
    }
  };

  checkAuthorization(): void {
    if (this.localStorageService.getDataLocalStorage('User').length > 0) {
      this.route.navigate(['tasks/home']);
    }
  };

  logIn(): void {
    const formData = { ...this.form.value };
    const checkExistenceOfUser = this.users.find(user =>
      user.username === formData.username && user.password === formData.password);
    if (checkExistenceOfUser) {
      this.successfulTransition(checkExistenceOfUser);
      this.wrongData = false;
    }
    else {
      this.wrongData = true;
    }
  };

  isDataExist(newUser): boolean {
    this.existingName = this.users.some(user => user.username === newUser.username);
    this.existingEmail = this.users.some(user => user.email === newUser.email);
    return this.existingName || this.existingEmail;
  };

  successfulTransition(user): void {
    this.localStorageService.setUserLocalStorage(user);
    this.checkAuthorization();
    this.form.reset();
  };

}
