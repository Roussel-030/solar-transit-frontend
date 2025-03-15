import { AuthenticationService } from "./../../services/authentication/authentication.service";
import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { menuNames } from "../../util/menuNames";
import { RegisterRequest } from "../../types/Register";
import { Role } from "../../types/Role";
import { FormsModule } from "@angular/forms";
import { LoadingIndicatorComponent } from "../../components/loading-indicator/loading-indicator.component";

@Component({
  selector: "app-register",
  imports: [FormsModule, LoadingIndicatorComponent],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  private router = inject(Router);
  private authenticationService = inject(AuthenticationService);
  isSending: boolean = false;
  registerRequest: RegisterRequest = {
    username: "",
    password: "",
    role: Role.USER,
  };

  onSubmitRegister() {
    this.isSending = true;
    this.authenticationService.register(this.registerRequest).subscribe({
      next: () => {
        this.goToLogin();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  goToLogin() {
    this.router.navigate([menuNames.login.path]);
  }
}
