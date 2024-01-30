import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {faArrowLeft, faArrowRightToBracket, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../../services/auth.service";
import {Signup} from "../../interfaces";
import {Router} from "@angular/router";
import {catchError, throwError} from "rxjs";
import {fadeAnimation} from "../../animations";
import {MatDialog} from "@angular/material/dialog";
import {GenerateRouteDialogComponent} from "../../components/generate-route-dialog/generate-route-dialog.component";
import {
  ProcessingSignupDialogComponent
} from "../../components/processing-signup-dialog/processing-signup-dialog.component";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [fadeAnimation]
})
export class SignupComponent implements OnInit {

  showPassword = false;
  showPasswordConfirm = false;
  form!: FormGroup;
  showMessage = false;
  showToast = false;
  message = "";

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, public dialog: MatDialog) {
  }

  toggleShowPassword(confirm = false) {
    if (!confirm) {
      this.showPassword ? this.showPassword = false : this.showPassword = true;
    } else {
      this.showPasswordConfirm ? this.showPasswordConfirm = false : this.showPasswordConfirm = true;
    }
  }

  protected readonly faEye = faEye;
  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faArrowRightToBracket = faArrowRightToBracket;
  protected readonly faEyeSlash = faEyeSlash;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/)
      ]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null;
    } else {
      group.get('confirmPassword')?.setErrors({mismatch: true});
      return {mismatch: true};
    }
  }

  signup() {
    this.showToast = false;

    let nameInput = this.form.get("name");
    let emailInput = this.form.get("email");
    let passwordInput = this.form.get("password");
    let confirmPasswordInput = this.form.get("confirmPassword");

    if (nameInput?.valid && emailInput?.valid && passwordInput?.valid && confirmPasswordInput?.valid) {

      let signup: Signup = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
      }

      let dialogRef = this.dialog.open(ProcessingSignupDialogComponent);

      this.authService.signup(signup).pipe(catchError(err =>{
        this.message = err.error.message;
        this.showToast = true;
        dialogRef.close();
        return throwError(() => err);
      }))
        .subscribe(serverResponse =>{
          dialogRef.close();
          this.router.navigate(['/confirm-registration'])
      })

    } else {

      nameInput?.markAsTouched();
      nameInput?.markAsDirty();
      emailInput?.markAsTouched();
      emailInput?.markAsDirty();
      passwordInput?.markAsTouched();
      passwordInput?.markAsDirty();
      confirmPasswordInput?.markAsTouched();
      confirmPasswordInput?.markAsDirty();

      this.showMessage = true;

      setTimeout(() => {
        this.showMessage = false;
      }, 2000);
    }

  }

}
