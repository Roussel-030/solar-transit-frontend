import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { menuNames } from "../../util/menuNames";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { LoginRequest } from "../../types/Login";
import { FormsModule } from "@angular/forms";
import { LoadingIndicatorComponent } from "../../components/loading-indicator/loading-indicator.component";
import { finalize } from "rxjs";

@Component({
  selector: "app-login",
  imports: [FormsModule, LoadingIndicatorComponent],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  private router = inject(Router);
  private authenticationService = inject(AuthenticationService);
  isSending: boolean = false;
  loginRequest: LoginRequest = { username: "", password: "" };

  onSubmitLogin() {
    this.isSending = true;
    this.authenticationService
      .login(this.loginRequest)
      .pipe(finalize(() => (this.isSending = false)))
      .subscribe({
        next: () => {
          this.router.navigate([menuNames.home.path]);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  goToRegister() {
    this.router.navigate([menuNames.register.path]);
  }
}
