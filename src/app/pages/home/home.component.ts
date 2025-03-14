import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ListingListComponent } from "../../components/listing-list/listing-list.component";

@Component({
  selector: "app-home",
  imports: [FormsModule, ListingListComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {}
