import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { delay, Observable, retry} from "rxjs";
import {IUser} from "../models/user";

@Injectable({
  providedIn: 'root'
})

export class UsersApiService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(
      delay(200),
      retry(2)
    )
  }

}
