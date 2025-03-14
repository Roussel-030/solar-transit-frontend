import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Role } from "./types/Role";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./components/header/header/header.component";
import { ToastComponent } from "./components/toast/toast.component";
import { ToastService } from "./services/toast/toast.service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, HeaderComponent, CommonModule, ToastComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent {
  title = "frontend";
  role: Role | null = null;
  @ViewChild("toast") toast!: ToastComponent;

  constructor(private toastService: ToastService) {}

  ngAfterViewInit(): void {
    // Pass the ToastComponent reference to the ToastService
    this.toastService.setToastComponentRef(this.toast);
  }
}
