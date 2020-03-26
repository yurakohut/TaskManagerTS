import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/shared/interfaces/task.interface';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-tasks-manager-shared-tasks',
  templateUrl: './tasks-manager-shared-tasks.component.html',
  styleUrls: ['./tasks-manager-shared-tasks.component.css']
})
export class TasksManagerSharedTasksComponent implements OnInit {
  tasks: Array<ITask> = [];
  filterTasks: any;
  userInSystem: any;
  options = {
    position: ["right", "top"],
    timeOut: 2000,
    lastOnBottom: true,
    clickToClose: true
  }
  constructor(private firebase: FirebaseService,
    private localStorageService: LocalStorageService,
    private notificationsService: NotificationService,
    private taskService: TaskService, ) { }

  ngOnInit() {
    this.firebase.getData('tasks').subscribe(actionArray => {
      this.tasks = actionArray.map(user => {
        return {
          id: user.payload.doc.id,
          ...user.payload.doc.data()
        };
      });
      this.userInSystem = this.localStorageService.getDataLocalStorage("User")[0];
      this.filterTasks = this.tasks.filter(task =>
        task.sharedTo.some(el => el == this.userInSystem.email));
      this.firebase.getTasksCount(this.filterTasks.length);
    });
  };

  changeStatusOFTask(task) {
    task.isDone = !task.isDone;
    this.taskService.editTask(task);
    this.notificationsService.infoNotification(`The status of the task has changed `);
  };

}
