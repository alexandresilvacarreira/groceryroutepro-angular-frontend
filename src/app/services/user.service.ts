import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment as environmentDev} from "../../environments/environment.development";
import {environment} from "../../environments/environment";
import {User} from "../interfaces";
import {BehaviorSubject, catchError, of} from "rxjs";

const BASE_URL = environmentDev.BASE_URL; //dev
// const BASE_URL = environment.BASE_URL; //prod

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
