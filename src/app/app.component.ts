import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AdminHeaderComponent } from "./components/admin-header/admin-header.component";
import { UserHeaderComponent } from "./components/user-header/user-header.component";
import { Role } from "./types/Role";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header/header.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent {
  title = "frontend";
  role: Role | null = null;
}
