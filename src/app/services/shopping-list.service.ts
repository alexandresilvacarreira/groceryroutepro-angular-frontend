import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment as environmentDev} from "../../environments/environment.development";
import {environment} from "../../environments/environment";
import {ShoppingListResponse, ShoppingList
} from "../interfaces";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarComponent} from "../components/snack-bar/snack-bar.component";

// const BASE_URL = environmentDev.BASE_URL; //dev
const BASE_URL = environment.BASE_URL; //prod

@Injectable({
  providedIn: "root"
})

export class ShoppingListService {

  _shoppingList = new BehaviorSubject<ShoppingList | null>(null);

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.getShoppingList();
  }

  get shoppingList() {
    return this._shoppingList.asObservable();
  }

  getShoppingList() {
    return this.http.get<ShoppingListResponse>(BASE_URL + "/shopping-list/get")
      .pipe(
        catchError(error => {
          return throwError(() => error);
        }))
      .subscribe(shoppingListResponse => {
        this._shoppingList.next(shoppingListResponse.data.shoppingList);
      });
  }

  addProduct(genericProductId: number) {
    return this.http.post<ShoppingListResponse>(BASE_URL + "/shopping-list/add-product", {genericProductId})
      .pipe(
        catchError(error => {
          this.snackBar.openFromComponent(SnackBarComponent, {
            duration: 2000,
            panelClass: 'snack-bar',
            data: {success: false, message: error.error.message}
          });
          console.error(error)
          return throwError(() => error);
        })
      )
      .subscribe(shoppingListResponse => {
        this._shoppingList.next(shoppingListResponse.data.shoppingList);
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 2000,
          panelClass: 'snack-bar',
          data: {success: true, message: shoppingListResponse.message}
        });
      });
  }

  removeProduct(genericProductId: number) {
    return this.http.post<ShoppingListResponse>(BASE_URL + "/shopping-list/remove-product", {genericProductId})
      .pipe(
        catchError(error => {
          console.error(error)
          return throwError(() => error);
        }))
      .subscribe(shoppingListResponse => {
        this._shoppingList.next(shoppingListResponse.data.shoppingList);
      });
  }

  removeAll(genericProductId: number) {
    return this.http.post<ShoppingListResponse>(BASE_URL + "/shopping-list/remove-all", {genericProductId})
      .pipe(
        catchError(error => {
          console.error(error)
          return throwError(() => error);
        }),
        tap(shoppingListResponse => {
          this._shoppingList.next(shoppingListResponse.data.shoppingList);
        }));
  }


}
