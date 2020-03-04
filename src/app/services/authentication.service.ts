import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loggedInUserSubject: BehaviorSubject<User>;
  loggedinUser: Observable<User>;
  
  constructor(private http: HttpClient) { 
    this.loggedInUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('loggedinUser')));
    this.loggedinUser = this.loggedInUserSubject.asObservable();
  }

  public get LoggedInUser(){
    return this.loggedInUserSubject.value;
  }

  login(userName: string, password: string): Observable<any>{
    return this.http.post<any>('api/users/authenticate', {userName, password})
      .pipe(
        map(user => {
          localStorage.setItem('user', JSON.stringify(user))
          this.loggedInUserSubject.next(user);
          return user;
        })
      )
  }
  logout(): void{
    localStorage.removeItem('user');
    this.loggedInUserSubject.next(null);
  }
}
