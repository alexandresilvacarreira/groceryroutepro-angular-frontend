import {Component} from '@angular/core';
import {GoogleApiService} from "../../services/google-api.service";
import {RouteObject, ShoppingList, User} from "../../interfaces";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons/faCartShopping";
import {faRoute} from "@fortawesome/free-solid-svg-icons/faRoute";
import {ShoppingListService} from "../../services/shopping-list.service";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent {

  //input Variables
  routes!: RouteObject[];
  cheapestRoute!: RouteObject;
  fastestRoute!: RouteObject;
  savings!: number;
  shoppingList?: ShoppingList;
  showToast = false;
  toastMessage = "";
  showListChangedWarning = false;
  isLoaded!:boolean;

  constructor(private googleApiService: GoogleApiService, private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {

    this.showToast = false;
    this.isLoaded = false;

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

    this.shoppingListService.shoppingList.subscribe(list => {
      if (list)
        this.shoppingList = list;
    });

  }

  protected readonly faCirclePlus = faCirclePlus;
  protected readonly faCartShopping = faCartShopping;
  protected readonly faRoute = faRoute;
  protected readonly faCircleExclamation = faCircleExclamation;
}
