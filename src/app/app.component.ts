import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AdminHeaderComponent } from "./components/admin-header/admin-header.component";
import { UserHeaderComponent } from "./components/user-header/user-header.component";
import { Role } from "./types/Role";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  imports: [
    RouterOutlet,
    AdminHeaderComponent,
    UserHeaderComponent,
    CommonModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "frontend";
  role: Role | null = null;
}
