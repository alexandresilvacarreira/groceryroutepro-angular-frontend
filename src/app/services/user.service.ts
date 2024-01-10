import {Injectable, OnInit} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Login, ServerResponse, Signup, User} from "../interfaces";
import {BehaviorSubject, catchError, Observable, of, throwError} from "rxjs";

const BASE_URL = environment.BASE_URL;


@Injectable({
  providedIn: "root"
})

export class UserService {

  private authenticatedUser = new BehaviorSubject<User | boolean | null>(null);

  constructor(private http: HttpClient) {
    this.getAuthenticatedUser();
  }

  getAuthenticatedUser() {
    return this.http.get<User | null>(BASE_URL + "/users/get-authenticated-user", {withCredentials: true})
      .pipe(catchError((error) => {
        return of(false);
      }))
      .subscribe(user => {
        this.authenticatedUser.next(user);
      });
  }

  getCurrentUser() {
    return this.authenticatedUser.asObservable();
  }

  setCurrentUser(user : User) {
    this.authenticatedUser.next(user);
  }

  clearCurrentUser(){
    this.authenticatedUser.next(false);
  }




}
