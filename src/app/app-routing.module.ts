import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {LoginComponent} from "./pages/login/login.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {ConfirmRegistrationComponent} from "./pages/confirm-registration/confirm-registration.component";
import {ErrorComponent} from "./pages/error/error.component";
import {ProductDetailsComponent} from "./pages/product-details/product-details.component";
import {SearchComponent} from "./pages/search/search.component";
import {buildGuard} from "./guards/auth.guard";
import {VerifyAccountComponent} from "./pages/verify-account/verify-account.component";
import {ShoppingListComponent} from "./pages/shopping-list/shopping-list.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {ForgotPasswordSucessComponent} from "./pages/forgot-password-sucess/forgot-password-sucess.component";


const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent, canActivate: [buildGuard("/dashboard", false)]},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent, canActivate: [buildGuard("/dashboard", false)]},
  {path: 'confirm-registration', component: ConfirmRegistrationComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [buildGuard("/login")]},
  {path: 'product-details/:productId', component: ProductDetailsComponent, canActivate: [buildGuard("/login")]},
  {path: 'search', component: SearchComponent, canActivate: [buildGuard("/login")],  data: {title: 'Pesquisa'}},
  {path: 'verify-account', component: VerifyAccountComponent},
  {path: 'shopping-list', component: ShoppingListComponent, canActivate: [buildGuard("/login")], data: {title: 'Lista de Compras'}},
  {path: 'forgot-password', component: ForgotPasswordComponent },
  {path: 'forgot-password-confirm', component: ForgotPasswordSucessComponent },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
