import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ProductSearchFilterOptions} from "../interfaces";

@Injectable({
  providedIn: "root"
})

export class ProductFilterService {

  private defaultProductFilterValues: ProductSearchFilterOptions = {sort: "currentLowestPricePrimaryValue,asc", chains: [1, 2, 3, 4, 5, 6, 7], categories:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10] };

  private filterOptions = new BehaviorSubject<ProductSearchFilterOptions>(this.defaultProductFilterValues);

  getFilterValues(){
    return this.filterOptions.asObservable();
  }

  setFilterValues(filterOptions : ProductSearchFilterOptions){
    this.filterOptions.next(filterOptions);
  }


}
