import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { NotificationService } from './notification.service';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firebaseService: FirebaseService) { }

  deleteTask(task): void {
    this.firebaseService.deleteData('tasks', task);
  };

  editTask(task): void {
    this.firebaseService.updateData('tasks', task, task.id);
  };
}
