import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { HeaderService } from "../../../services/header/header.service";
import { Role } from "../../../types/Role";
import { TokenService } from "../../../services/token/token.service";
import { menuNames } from "../../../util/menuNames";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-header",
  imports: [CommonModule, RouterModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = true;
  isAuthenticated: boolean = true;
  headerService = inject(HeaderService);
  tokenService = inject(TokenService);
  menus = menuNames;

  ngOnInit(): void {
    // this.isAuthenticated = this.tokenService.get_token()? true : false;
    // this.isAdmin = this.headerService.get_role() === Role.ADMIN;
  }
}
