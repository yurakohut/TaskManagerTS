import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { faPlus, faSignOutAlt, faTasks, faUserFriends, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ITask } from 'src/app/shared/interfaces/task.interface';
import { Task } from 'src/app/shared/classes/task.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { CheckUserService } from './../../../shared/services/check-user.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-tasks-manager-home',
  templateUrl: './tasks-manager-home.component.html',
  styleUrls: ['./tasks-manager-home.component.css']
})
export class TasksManagerHomeComponent implements OnInit {
  faPlus = faPlus;
  faSignOutAlt = faSignOutAlt;
  faTasks = faTasks;
  faUserFriends = faUserFriends;
  faShoppingBasket = faShoppingBasket
  modalRef: BsModalRef;
  users: Array<IUser> = [];
  userInSystem: IUser;
  minDate: Date;
  taskTitle: string = '';
  taskDeadline: any;
  taskDescription: string = '';
  tabIndex: number = 1;
  username: string;
  taskSharedTo: Array<string> = [];
  tasks: Array<ITask> = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  emails: Array<object> = [];
  tasksCount: any;

  constructor(private route: Router,
    private firebaseService: FirebaseService,
    private localStorageService: LocalStorageService,
    private modalService: BsModalService,
    private notificationsService: NotificationService,
    private checkUserService: CheckUserService,

  ) {
    this.getCount();
  }

  ngOnInit() {
    this.checkUserService.getAllUsers();
    this.userInSystem = this.localStorageService.getDataLocalStorage("User")[0]
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.firebaseService.getData('tasks').subscribe(actionArray => {
      this.tasks = actionArray.map(user => {
        return {
          id: user.payload.doc.id,
          ...user.payload.doc.data()
        };
      });
      this.tasksCount = this.tasks.filter(task => task.sharedTo.some(el =>
        el == this.userInSystem.email)).length;
    });
  };

  activeLink(index) {
    this.tabIndex = index;
  };

  logOut() {
    this.localStorageService.deleteDataFromLS('User');
    this.route.navigate(['tasks/authorization']);
  };

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  };

  closeModal(): void {
    this.modalRef.hide();
  };

  resetData(): void {
    this.taskTitle = '';
    this.taskDescription = '';
    this.taskDeadline = '';
    this.emails = [];
    this.taskSharedTo = [];
  };

  addTask(): void {
    this.taskSharedTo = this.emails.map(email => email['name']) || [];
    const newTask: ITask = new Task(
      this.taskTitle,
      this.taskDescription,
      this.userInSystem.email,
      false,
      this.taskDeadline,
      this.taskSharedTo);
    this.firebaseService.setData(newTask, 'tasks');
    this.closeModal();
    this.notificationsService.successNotification(`Task successfully added`);
    this.resetData();
  };

  addNewEmail(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our email
    if ((value || '').trim()) {
      this.emails.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  };

  removeEmail(email): void {
    const index = this.emails.indexOf(email);
    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  };

  getCount(): void {
    this.firebaseService.tasksStream.subscribe(data => this.tasksCount = data);
  };

}
