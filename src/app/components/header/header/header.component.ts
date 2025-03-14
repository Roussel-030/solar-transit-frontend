import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { HeaderService } from "../../../services/header/header.service";
import { Role } from "../../../types/Role";
import { TokenService } from "../../../services/token/token.service";
import { menuNames } from "../../../util/menuNames";
import { Router, RouterModule } from "@angular/router";
import { AuthenticationService } from "../../../services/authentication/authentication.service";

@Component({
  selector: "app-header",
  imports: [CommonModule, RouterModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css"
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;
  isAuthenticated: boolean = false;
  headerService = inject(HeaderService);
  tokenService = inject(TokenService);
  router = inject(Router);
  authService = inject(AuthenticationService);
  menus = menuNames;

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    // Initial check
    this.authService.checkAuthentication();
  }

  logout() {
    this.tokenService.remove_token();
    this.router.navigate([menuNames.login.path]);
  }
}
