import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { menuNames } from "../../util/menuNames";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { LoginRequest, LoginResponse } from "../../types/Login";
import { FormsModule } from "@angular/forms";
import { TokenService } from "../../services/token/token.service";

@Component({
  selector: "app-login",
  imports: [FormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css"
})
export class LoginComponent {
  private router = inject(Router);
  private authenticationService = inject(AuthenticationService);
  private tokenService = inject(TokenService);
  loginRequest: LoginRequest = { username: "", password: "" };

  onSubmitLogin() {
    this.authenticationService.login(this.loginRequest).subscribe({
      next: (res: LoginResponse) => {
        this.router.navigate([""]);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  goToRegister() {
    this.router.navigate([menuNames.register.path]);
  }
}
