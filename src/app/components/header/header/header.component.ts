import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { HeaderService } from "../../../services/header/header.service";
import { Role } from "../../../types/Role";
import { TokenService } from "../../../services/token/token.service";

@Component({
  selector: "app-header",
  imports: [CommonModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;
  isAuthenticated: boolean = false;
  headerService = inject(HeaderService);
  tokenService = inject(TokenService);

  ngOnInit(): void {
    this.isAuthenticated = this.tokenService.get_token() ? true : false;
    this.isAdmin = this.headerService.get_role() === Role.ADMIN;
  }
}
