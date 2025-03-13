import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CategoryRequest } from "../../types/Category";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ListingRequest } from "../../types/Listing";
import { ListingsService } from "../../services/listings/listings.service";

@Component({
  selector: "app-listing-form",
  imports: [FormsModule, CommonModule],
  templateUrl: "./listing-form.component.html",
  styleUrl: "./listing-form.component.css"
})
export class ListingFormComponent implements OnInit {
  constructor(private listingService: ListingsService) {}
  @Input() listening!: ListingRequest;
  @Input() categories: CategoryRequest[] = [];
  @Output() onCancel = new EventEmitter<any>();
  selectedCategory: number = 0;

  selectedImageName: string | null = null;
  selectedImageFile: File | null = null; // To store the selected image file

  ngOnInit(): void {
    if (!this.listening) {
      this.listening = {
        name: "",
        description: "",
        address: "",
        latitude: "",
        longitude: "",
        category_id: 0,
        image_name: ""
      };
    }
  }

  cancel() {
    this.onCancel.emit();
  }

  // Handle image upload
  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0]; // Store the selected file
      this.selectedImageName = this.selectedImageFile.name; // Update the selected image name
    } else {
      this.selectedImageFile = null;
      this.selectedImageName = null;
    }
  }

  onSubmit(): void {
    if (this.selectedImageFile) {
      this.listingService.uploadImage(this.selectedImageFile).subscribe({
        next: (response) => {
          this.listening.image_name = response;
          this.listingService.createListing(this.listening).subscribe({
            next: (listing) => {
              if (listing) {
              }
            },
            error: () => {},
            complete: () => {}
          });
        },
        error: (error) => {
          console.error("Error uploading image:", error);
          alert("Error uploading image. Please try again.");
        }
      });
    } else {
      this.listingService.createListing(this.listening).subscribe({
        next: (listing) => {
          if (listing) {
          }
        },
        error: () => {},
        complete: () => {}
      });
    }
  }
}
