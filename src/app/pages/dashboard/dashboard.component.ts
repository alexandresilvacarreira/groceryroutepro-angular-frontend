import {Component, OnInit} from '@angular/core';
import {RouteObject, ShoppingList} from "../../interfaces";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons/faCartShopping";
import {faCoins} from "@fortawesome/free-solid-svg-icons/faCoins";
import {ShoppingListService} from "../../services/shopping-list.service";
import {faRoute} from "@fortawesome/free-solid-svg-icons/faRoute";
import {GoogleApiService} from "../../services/google-api.service";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  shoppingList!: ShoppingList;

  routes!: RouteObject[];
  cheapestRoute!: RouteObject;
  fastestRoute!: RouteObject;
  savings!: number;
  showToast = false;
  toastMessage = "";
  showListChangedWarning = false;
  isLoaded!:boolean;


  constructor(private shoppingListService: ShoppingListService,
              private googleApiService: GoogleApiService) {
  }


  ngOnInit(): void {

    this.isLoaded = false;

    this.showToast = false;

    this.shoppingListService.shoppingList.subscribe(list => {
      if (list) {
        this.shoppingList = list;
      }
    })

    this.googleApiService.getRoutes().subscribe(response => {
      if (response){
        if (!response.success && response.data.routes.length !== 0) {
          this.showToast = true;
          this.toastMessage = "Lista de compras alterada, deverão ser geradas novas rotas."
          this.showListChangedWarning = true;
          this.routes = this.googleApiService.getOldRoutes();
        } else {
          this.routes = response.data.routes;
        }
        if (this.routes.length !== 0) {
          this.cheapestRoute = this.routes[0];
          this.fastestRoute = this.routes[1];
          this.savings = Number((this.fastestRoute.shoppingListCost - this.cheapestRoute.shoppingListCost).toFixed(2));
        }
        this.isLoaded = true;
      }
    })


  }

  protected readonly faCirclePlus = faCirclePlus;
  protected readonly faCartShopping = faCartShopping;
  protected readonly faCoins = faCoins;
  protected readonly faRoute = faRoute;
  protected readonly faCircleExclamation = faCircleExclamation;
}
