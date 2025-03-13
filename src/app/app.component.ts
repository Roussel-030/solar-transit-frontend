import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from "./components/admin-header/admin-header.component";
import { UserHeaderComponent } from "./components/user-header/user-header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AdminHeaderComponent, UserHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
