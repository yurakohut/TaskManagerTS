import { Component, OnInit, TemplateRef } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { ITask } from 'src/app/shared/interfaces/task.interface';
import { Task } from 'src/app/shared/classes/task.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TaskService } from 'src/app/shared/services/task.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { CheckUserService } from 'src/app/shared/services/check-user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-tasks-manager-my-tasks',
  templateUrl: './tasks-manager-my-tasks.component.html',
  styleUrls: ['./tasks-manager-my-tasks.component.css']
})

export class TasksManagerMyTasksComponent implements OnInit {
  modalRef: BsModalRef;
  tasks: Array<ITask> = [];
  filterTasks: Array<ITask> = [];
  userInSystem: IUser;
  options = {
    position: ["right", "top"],
    timeOut: 2000,
    lastOnBottom: true,
    clickToClose: true
  }
  username: string;
  taskTitle: string;
  taskDescription: string;
  taskDeadline: any;
  temporaryTask: ITask;
  minDate: Date;
  taskId: string;
  taskCreateBy: string;
  checked: boolean = true;
  taskStatus: boolean;
  taskSharedTo: Array<string> = [];
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  emails: Array<object> = [];

  constructor(private firebase: FirebaseService,
    private notificationsService: NotificationService,
    private taskService: TaskService,
    private localStorageService: LocalStorageService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.firebase.getData('tasks').subscribe(actionArray => {
      this.tasks = actionArray.map(user => {
        return {
          id: user.payload.doc.id,
          ...user.payload.doc.data()
        };
      });
      this.userInSystem = this.localStorageService.getDataLocalStorage("User")[0];
      this.filterTasks = this.tasks.filter(tasks => tasks.createBy === this.userInSystem.email)
    });
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
  }

  //Після зміни даних блок  не перерендується. Застосований до головного циклу в HTML
  trackByPackId = (index, pack) => pack.id;

  editTask(template: TemplateRef<any>, { title, description, deadline, id, createBy, isDone, sharedTo }): void {
    this.modalRef = this.modalService.show(template);
    this.taskId = id;
    this.taskTitle = title;
    this.taskDescription = description;
    this.taskCreateBy = createBy;
    this.taskDeadline = new Date(deadline);
    this.taskStatus = isDone;
    this.emails = sharedTo.map(el => ({ name: el }));
  };

  closeModal(): void {
    this.modalRef.hide();
  };

  deleteTask(task): void {
    this.taskService.deleteTask(task);
    this.notificationsService.infoNotification(`Task successfully deleted`);
  };

  saveEditTask(): void {
    this.taskSharedTo = this.emails.map(email => email['name']);
    const editedTask = new Task(
      this.taskTitle,
      this.taskDescription,
      this.taskCreateBy,
      this.taskStatus,
      this.taskDeadline,
      this.taskSharedTo,
      this.taskId);
    this.taskService.editTask(editedTask);
    this.closeModal();
    this.notificationsService.infoNotification(`Task successfully edited`);
  };

  changeStatusOFTask(task) {
    task.isDone = !task.isDone;
    this.taskService.editTask(task);
    this.notificationsService.infoNotification(`The status of the task has changed `);
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
}
