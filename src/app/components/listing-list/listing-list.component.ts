import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ListingsService } from "../../services/listings/listings.service";
import { ListingRequest } from "../../types/Listing";
import { CategoryRequest } from "../../types/Category";
import { CategoryService } from "../../services/category/category.service";
import { ListingFormComponent } from "../listing-form/listing-form.component";
import { RegisterRequest } from "../../types/Register";
import { UserService } from "../../services/users/user.service";

@Component({
  selector: "app-listing-list",
  imports: [FormsModule, CommonModule, ListingFormComponent],
  templateUrl: "./listing-list.component.html",
  styleUrl: "./listing-list.component.css",
})
export class ListingListComponent {
  // Sample data for listings
  listings: ListingRequest[] = [];
  categories: CategoryRequest[] = [];

  // Filtered listings based on search and category
  filteredListings = this.listings;

  // Search query and selected category
  searchQuery = "";
  selectedCategory: number = 0;
  isModalOpen: boolean = false;

  selectedListing!: ListingRequest;
  isEditing: boolean = false;

  // Available categories for filtering

  constructor(
    public listingServices: ListingsService,
    private categoryService: CategoryService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getListing();
    this.getCategory();
  }

  getListing() {
    this.listingServices.getListing().subscribe({
      next: (data) => {
        this.listings = data.data;
      },

      error: () => {},
      complete: () => {
        this.applyFilters();
      },
    });
  }

  getCategory() {
    this.categoryService.readCategory().subscribe({
      next: (data) => {
        this.categories = data.data;
      },

      error: () => {},
      complete: () => {},
    });
  }

  // Function to apply search and category filters
  applyFilters() {
    this.listingServices
      .searchListings(this.searchQuery, +this.selectedCategory)
      .subscribe({
        next: (data) => {
          this.filteredListings = data.data;
        },

        error: () => {},
        complete: () => {},
      });
  }

  // Function to handle update button click
  onUpdate(listing: any) {
    console.log("Update:", listing);
    // Add your update logic here
  }

  // Function to handle delete button click
  onDelete(listing: any) {
    console.log("Delete:", listing);
    // Add your delete logic here
  }

  onEdit(listing: ListingRequest) {
    this.selectedListing = listing;
    this.isModalOpen = true;
    this.isEditing = true;
  }

  addListing() {
    this.isModalOpen = true;
    this.isEditing = false;
    this.selectedListing;
  }

  closeModal(isFetch: boolean = false) {
    this.isModalOpen = false;
    if (isFetch) this.getListing();
  }
}
