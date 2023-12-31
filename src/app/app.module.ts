import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SplashComponent } from './components/splash/splash.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {HeaderDashboardComponent} from "./components/header-dashboard/header-dashboard.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {MobileNavbarComponent} from "./components/mobile-navbar/mobile-navbar.component";
import {SignupComponent} from "./pages/signup/signup.component";
import { ConfirmRegistrationComponent } from './pages/confirm-registration/confirm-registration.component';
import { ErrorComponent } from './pages/error/error.component';
import { DesktopNavbarComponent } from './components/desktop-navbar/desktop-navbar.component';
import {LoginComponent} from "./pages/login/login.component";
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SearchComponent } from './pages/search/search.component';
import {DatePipe, registerLocaleData} from "@angular/common";
import localePt from '@angular/common/locales/pt';
import { ChainStickerComponent } from './components/chain-sticker/chain-sticker.component';

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
    ChainStickerComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
