import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  deleteDataFromLS(subject): void {
    if (localStorage.length > 0 && localStorage.getItem(subject)) {
      localStorage.removeItem(subject);
    }
  }

  setUserLocalStorage(item): void {
    localStorage.setItem('User', JSON.stringify([item]));
  };

  getDataLocalStorage(subject): any {
    if (localStorage.length > 0 && localStorage.getItem(subject)) {
      return JSON.parse(localStorage.getItem(subject));
    }
    else {
      return [];
    }
  };
}
