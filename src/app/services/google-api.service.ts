import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment as environmentDev} from "../../environments/environment.development";
import {environment} from "../../environments/environment.development";
import {RouteObject, RouteResponse, ServerResponse, ShoppingList, ShoppingListResponse} from "../interfaces";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";

const BASE_URL = environmentDev.BASE_URL; //dev
// const BASE_URL = environment.BASE_URL; //prod

@Injectable({
  providedIn: "root"
})
export class GoogleApiService {

  constructor(private http: HttpClient) {
    this.getRoutes();
  }

  _oldRoutes = new BehaviorSubject<RouteObject[]>([]);

  createRoute(partidaLat:number, partidaLng: number, destinoLat: number, destinoLng: number){
    return this.http.post<ServerResponse>(BASE_URL + "/google-maps-api/create-route", {partida :{
      lat: partidaLat,
        lng: partidaLng
    },
    destino : {
      lat: destinoLat,
      lng: destinoLng
    }
    })
  }

  getRoutes(){
    return this.http.get<RouteResponse>(BASE_URL+"/google-maps-api/get-route")
      .pipe(
        catchError(error => {
          console.error(error)
          return throwError(() => error);
        }),
        tap(routeResponse => {
          if (routeResponse.success || this._oldRoutes.value.length === 0)
            this._oldRoutes.next(routeResponse.data.routes);
        }))
    }

    getOldRoutes() {
      return this._oldRoutes.value;
    }

}
