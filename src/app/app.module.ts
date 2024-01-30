import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AppRoutingModule} from './app-routing.module';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {SplashComponent} from './components/splash/splash.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderDashboardComponent} from "./components/header-dashboard/header-dashboard.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {MobileNavbarComponent} from "./components/mobile-navbar/mobile-navbar.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {ConfirmRegistrationComponent} from './pages/confirm-registration/confirm-registration.component';
import {ErrorComponent} from './pages/error/error.component';
import {DesktopNavbarComponent} from './components/desktop-navbar/desktop-navbar.component';
import {LoginComponent} from "./pages/login/login.component";
import {ProductDetailsComponent} from './pages/product-details/product-details.component';
import {SearchComponent} from './pages/search/search.component';
import {DatePipe, registerLocaleData} from "@angular/common";
import localePt from '@angular/common/locales/pt';
import {ChainStickerComponent} from './components/chain-sticker/chain-sticker.component';
import {PriceHistoryChartComponent} from './components/price-history-chart/price-history-chart.component';
import {NgChartsModule} from 'ng2-charts';
import Chart from 'chart.js/auto';
import {ProductListItemComponent} from './components/product-list-item/product-list-item.component';
import {UserPanelComponent} from "./components/user-panel/user-panel.component";
import {HighlightCarouselComponent} from "./components/highlight-carousel/highlight-carousel.component";
import {ToastComponent} from './components/toast/toast.component';

import {VerifyAccountComponent} from './pages/verify-account/verify-account.component';
import {ShoppingListComponent} from "./pages/shopping-list/shopping-list.component";
import {HeaderPageComponent} from "./components/header-page/header-page.component";
import {ProductCardItemComponent} from "./components/product-card-item/product-card-item.component";
import {LoaderComponent} from './components/loader/loader.component';
import {ProductSearchFilterComponent} from "./components/product-search-filter/product-search-filter.component";
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import {TabMenuShoppingListComponent} from './components/tab-menu-shopping-list/tab-menu-shopping-list.component';
import {RouteCurrentComponent} from './components/route-current/route-current.component';
import {ForgotPasswordSucessComponent} from './pages/forgot-password-sucess/forgot-password-sucess.component';
import {ChangePasswordComponent} from './pages/change-password/change-password.component';
import {ConfirmChangePasswordComponent} from './pages/confirm-change-password/confirm-change-password.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {RoutesComponent} from './pages/routes/routes.component';
import {HistoryComponent} from './pages/history/history.component';
import {RoutePreviousComponent} from "./components/route-previous/route-previous.component";
import {TabMenuShoppingListDesktopComponent} from './components/tab-menu-shopping-list-desktop/tab-menu-shopping-list-desktop.component';
import {RouteDetailsComponent} from './components/route-details/route-details.component';
import {RouteSuggestionsComponent} from './components/route-suggestions/route-suggestions.component';
import {RouteConfirmationComponent} from './components/route-confirmation/route-confirmation.component';
import {HistoryProductCardComponent} from './components/history-product-card/history-product-card.component';
import {HistoryRouteSummaryCardComponent} from './components/history-route-summary-card/history-route-summary-card.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {DatepickerTouchComponent} from './components/datepicker-touch/datepicker-touch.component';
import {HistoryRoutesComponent} from './pages/history-routes/history-routes.component';
import {HistoryProductsComponent} from './pages/history-products/history-products.component';
import {ShopNotificationsCardComponent} from './components/shop-components/shop-notifications-card/shop-notifications-card.component';
import {CreateRouteComponent} from './pages/create-route/create-route.component';
import {GoogleMapsModule} from "@angular/google-maps";
import {ShopDashboardComponent} from './pages/Shop-Pages/shop-dashboard/shop-dashboard.component';
import {ShopHeaderDashboardComponent} from './components/shop-components/shop-header-dashboard/shop-header-dashboard.component';
import {ShopNavbarComponent} from './components/shop-components/shop-navbar/shop-navbar.component';
import {ShopNewProductComponent} from './pages/Shop-Pages/shop-new-product/shop-new-product.component';
import {TruncateFirstWordPipe} from "./pipes/truncate-first-word-pipe";
import {MatSelectModule} from "@angular/material/select";
import {ShopEditProductComponent} from './pages/Shop-Pages/shop-edit-product/shop-edit-product.component';
import {ShopProductEditCardComponent} from './components/shop-components/shop-product-edit-card/shop-product-edit-card.component';
import {ShopEditFilterComponent} from './components/shop-components/shop-edit-filter/shop-edit-filter.component';
import {MatListModule} from "@angular/material/list";
import {MatOptionModule} from "@angular/material/core";


import {ProductPriceComparisonComponent} from './components/product-price-comparison/product-price-comparison.component';
import {SnackBarComponent} from './components/snack-bar/snack-bar.component';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {RemoveProductConfirmationComponent} from './components/remove-product-confirmation/remove-product-confirmation.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ShopDesktopNavbarComponent} from './components/shop-components/shop-desktop-navbar/shop-desktop-navbar.component';
import {ShopNotificationsComponent} from './pages/Shop-Pages/shop-notifications/shop-notifications.component';
import {RouteMainCardComponent} from './components/route-main-card/route-main-card.component';
import {HighlightCarouselDesktopComponent} from './components/highlight-carousel-desktop/highlight-carousel-desktop.component';
import {GenerateRouteDialogComponent} from './components/generate-route-dialog/generate-route-dialog.component';
import {AuthInterceptor} from "./auth.interceptor";
import { ProcessingSignupDialogComponent } from './components/processing-signup-dialog/processing-signup-dialog.component';


Chart.defaults.font.family = 'Lato';
Chart.defaults.font.size = 16;
Chart.defaults.font.weight = 500;

registerLocaleData(localePt, 'pt'); // Register the locale data

@NgModule({
    declarations: [
        AppComponent,
        WelcomeComponent,
        SplashComponent,
        HeaderDashboardComponent,
        DashboardComponent,
        MobileNavbarComponent,
        SignupComponent,
        LoginComponent,
        ConfirmRegistrationComponent,
        ErrorComponent,
        DesktopNavbarComponent,
        ProductDetailsComponent,
        SearchComponent,
        ChainStickerComponent,
        PriceHistoryChartComponent,
        ProductListItemComponent,
        UserPanelComponent,
        HighlightCarouselComponent,
        ToastComponent,
        VerifyAccountComponent,
        ShoppingListComponent,
        HeaderPageComponent,
        ProductCardItemComponent,
        LoaderComponent,
        ProductSearchFilterComponent,
        ForgotPasswordComponent,
        ForgotPasswordSucessComponent,
        ChangePasswordComponent,
        ConfirmChangePasswordComponent,
        ForgotPasswordComponent,
        TabMenuShoppingListComponent,
        RouteCurrentComponent,
        RoutesComponent,
        HistoryComponent,
        RoutePreviousComponent,
        TabMenuShoppingListDesktopComponent,
        RouteDetailsComponent,
        RouteSuggestionsComponent,
        RouteConfirmationComponent,
        HistoryProductCardComponent,
        HistoryRouteSummaryCardComponent,
        TruncateFirstWordPipe,
        HistoryRoutesComponent,
        HistoryProductsComponent,
        ShopNotificationsCardComponent,
        CreateRouteComponent,
        ShopDashboardComponent,
        ShopHeaderDashboardComponent,
        ShopNavbarComponent,
        ShopNewProductComponent,
        ShopEditProductComponent,
        ShopProductEditCardComponent,
        ShopEditFilterComponent,
        ProductPriceComparisonComponent,
        SnackBarComponent,
        RemoveProductConfirmationComponent,
        ShopDesktopNavbarComponent,
        ShopNotificationsComponent,
        RouteMainCardComponent,
        HighlightCarouselDesktopComponent,
        GenerateRouteDialogComponent,
        ProcessingSignupDialogComponent,
    ],
    imports: [
        BrowserModule,
        FontAwesomeModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgChartsModule,
        InfiniteScrollModule,
        MatDatepickerModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        DatepickerTouchComponent,
        GoogleMapsModule,
        MatListModule,
        MatOptionModule,
        MatSelectModule,
        MatSnackBarModule,
        MatDialogModule
    ],

    providers: [DatePipe,
        {provide: LOCALE_ID, useValue: 'pt'},
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {position: 'absolute'}},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
