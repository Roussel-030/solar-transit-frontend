import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AuthenticationService } from "../authentication/authentication.service";
import { RegisterRequest } from "../../types/Register";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  user?: RegisterRequest;
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      localStorage.getItem("token") !== "null" &&
      localStorage.getItem("token") !== null
    ) {
      return true;
    }
    this.authService.verify().subscribe();

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
