import { Injectable } from '@angular/core';
import {BehaviorSubject, delay} from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUser } from "../models/user";
import { UsersApiService } from "./users-api.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly localStorageKey = 'usersData';
  private readonly usersSubject$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  public readonly users$ = this.usersSubject$.asObservable();
  private initialLength: number = 0;

  constructor(private api: UsersApiService) {
    const storedUsers = this.loadUsersFromLocalStorage();
    if (storedUsers && storedUsers.length > 0) {
      this.usersSubject$.next(storedUsers);
    } else {
      this.loadUsers();
    }
  }

  private loadUsers(): void {
    this.api.getUsers().pipe(
      tap((users: IUser[]) => {
        this.usersSubject$.next(users);
        this.initialLength = users.length;
        this.saveUsersToLocalStorage(users);
      }),
      delay(1000)
    ).subscribe();
  }

  deleteUser(userId: number): void {
    const users: IUser[] = this.usersSubject$.getValue();
    this.usersSubject$.next(users.filter(user => user.id !== userId));
    this.updateLocalStorage();
  }

  addUser(newUserInfo: IUser) {
    this.usersSubject$.next([...this.usersSubject$.value, newUserInfo]);
    this.updateLocalStorage();
  }

  editUser(userInfo: IUser) {
    const updatedUsers = this.usersSubject$.value.map(user => {
      if (user.id === userInfo.id) {
        return userInfo;
      }
      return user;
    });
    this.usersSubject$.next(updatedUsers);
    this.updateLocalStorage();
  }

  loadUsersFromLocalStorage(): IUser[] | null {
    const usersData = localStorage.getItem(this.localStorageKey);
    if (usersData) {
      const users: IUser[] = JSON.parse(usersData);
      this.initialLength = users.length;
      return users;
    }
    return null;
  }

  private saveUsersToLocalStorage(users: IUser[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  private updateLocalStorage(): void {
    this.saveUsersToLocalStorage(this.usersSubject$.getValue());
  }
}


