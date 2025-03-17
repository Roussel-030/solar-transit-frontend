import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MapComponent } from "../../components/map/map/map.component";

@Component({
  selector: "app-home",
  imports: [FormsModule, MapComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {}
