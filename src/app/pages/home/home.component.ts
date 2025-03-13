import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { Router } from "@angular/router";
import { menuNames } from "../../util/menuNames";
import { ListingListComponent } from "../../components/listing-list/listing-list.component";

@Component({
  selector: "app-home",
  imports: [FormsModule, ListingListComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css"
})
export class HomeComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate([menuNames.login.path]);
  }
}
