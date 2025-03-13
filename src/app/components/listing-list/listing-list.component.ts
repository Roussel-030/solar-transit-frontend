import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ListingsService } from "../../services/listings/listings.service";
import { Listing } from "../../types/Listing";

@Component({
  selector: "app-listing-list",
  imports: [FormsModule, CommonModule],
  templateUrl: "./listing-list.component.html",
  styleUrl: "./listing-list.component.css"
})
export class ListingListComponent {
  // Sample data for listings
  listings: Listing[] = [];

  // Filtered listings based on search and category
  filteredListings = this.listings;

  // Search query and selected category
  searchQuery = "";
  selectedCategory: number = 0;

  // Available categories for filtering
  categories = ["Announce", "Clothing", "Accessories"];

  constructor(private listingServices: ListingsService) {}

  ngOnInit(): void {
    this.getListing(); // Apply filters on initialization
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
