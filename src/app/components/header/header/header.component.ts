import { AuthenticationService } from "./../../../services/authentication/authentication.service";
import { CommonModule } from "@angular/common";
import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  imports: [CommonModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent implements OnDestroy {
  authenticationService = inject(AuthenticationService);
  isAdmin: boolean = false;
  isAuthenticated: boolean = false;

  private isAdminSubscription: Subscription;
  private isAuthenticatedSubscription: Subscription;

  constructor() {
    this.isAdminSubscription = this.authenticationService.isAdmin$.subscribe(
      (isAdmin) => {
        this.isAdmin = isAdmin;
      }
    );

    this.isAuthenticatedSubscription =
      this.authenticationService.isAuthenticated$.subscribe((authenticated) => {
        this.isAuthenticated = authenticated;
      });
  }

  ngOnDestroy(): void {
    if (this.isAdminSubscription) {
      this.isAdminSubscription.unsubscribe();
    }

    if (this.isAuthenticatedSubscription) {
      this.isAuthenticatedSubscription.unsubscribe();
    }
  }
}
