import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CategoryRequest } from "../../types/Category";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ListingRequest } from "../../types/Listing";

@Component({
  selector: "app-listing-form",
  imports: [FormsModule, CommonModule],
  templateUrl: "./listing-form.component.html",
  styleUrl: "./listing-form.component.css"
})
export class ListingFormComponent implements OnInit {
  @Input() listening!: ListingRequest;
  @Input() categories: CategoryRequest[] = [];
  @Output() onCancel = new EventEmitter<any>();
  selectedCategory: number = 0;

  ngOnInit(): void {
    console.log(this.categories);
    if (!this.listening) {
      this.listening = {
        name: "",
        description: "",
        address: "",
        latitude: "",
        longitude: "",
        category_id: 0
      };
    }
  }

  cancel() {
    this.onCancel.emit();
  }
}
