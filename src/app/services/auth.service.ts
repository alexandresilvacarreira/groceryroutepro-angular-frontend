import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment as environmentDev} from "../../environments/environment.development";
import {environment} from "../../environments/environment.development";
import {ServerResponse, Signup} from "../interfaces";


// const BASE_URL = environmentDev.BASE_URL; //dev
const BASE_URL = environment.BASE_URL; //prod


@Injectable({
  providedIn: "root"
})

export class AuthService {


  constructor(private http: HttpClient) {
  }

  signup(signup: Signup) {
    return this.http.post<ServerResponse>(BASE_URL + "/signup", signup)
  }

  login(email: string, password: string) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    let body = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post<ServerResponse>(BASE_URL + "/process-login", body.toString(), {
      headers
    })
  }

  logout() {
    return this.http.post<ServerResponse>(BASE_URL + "/logout", {})
  }

  verifyAccount(email: string, token: string) {
    return this.http.post<ServerResponse>(BASE_URL + "/verify-account/", {email,token}
    )
  }


  requestPasswordLink(email: string){
    return this.http.post<ServerResponse>(BASE_URL + "/users/forgot-password", {email:email});
  }

  changePassword(email:string, token:string, password:string){
  return this.http.post<ServerResponse>(BASE_URL + "/users/change-password/", {
    email:email,
    token:token,
  password:password});
}

}
