import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ListingsService } from "../../services/listings/listings.service";
import { ListingRequest } from "../../types/Listing";
import { CategoryRequest } from "../../types/Category";
import { CategoryService } from "../../services/category/category.service";

@Component({
  selector: "app-listing-list",
  imports: [FormsModule, CommonModule],
  templateUrl: "./listing-list.component.html",
  styleUrl: "./listing-list.component.css"
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

  // Available categories for filtering

  constructor(
    private listingServices: ListingsService,
    private categoryService: CategoryService
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
      }
    });
  }

  getCategory() {
    this.categoryService.readCategory().subscribe({
      next: (data) => {
        this.categories = data.data;
      },

      error: () => {},
      complete: () => {}
    });
  }

  // Function to apply search and category filters
  applyFilters() {
    this.filteredListings = this.listings.filter((listing) => {
      const matchesSearch = listing.name
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory
        ? listing.category_id === this.selectedCategory
        : true;
      return matchesSearch && matchesCategory;
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
}
