import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  tasksStream: Subject<Array<any>> = new Subject<Array<any>>();
  constructor(private firestore: AngularFirestore,
  ) { }

  getData(nameOfCollection): any {
    return this.firestore.collection(nameOfCollection).snapshotChanges();
  };

  setData(subject, nameOfCollection): void {
    this.firestore.collection(nameOfCollection).add(JSON.parse(JSON.stringify(subject)));
  };

  updateData(nameOfCollection, subject, id): void {
    this.firestore.doc(nameOfCollection + "/" + id).update(JSON.parse(JSON.stringify(subject)));
    this.getTasksCount(subject);
  };

  deleteData(nameOfCollection, subject): void {
    this.firestore.doc(nameOfCollection + '/' + subject.id).delete();
  };

  setItemLocalStorage(item): void {
    localStorage.setItem('User', JSON.stringify([item]));
  };

  getTasksCount(newTask): void {
    this.tasksStream.next(newTask);
  };
 
}
