import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-listing-list",
  imports: [FormsModule, CommonModule],
  templateUrl: "./listing-list.component.html",
  styleUrl: "./listing-list.component.css"
})
export class ListingListComponent {
  // Sample data for listings
  listings = [
    {
      id: 1,
      name: "Shoes",
      description: "Beautiful shoes",
      category: "Announce",
      image: "Announce",
      address: "Announce"
    },
    {
      id: 2,
      name: "T-Shirt",
      description: "Comfortable T-Shirt",
      category: "Clothing"
    },
    {
      id: 3,
      name: "Watch",
      description: "Elegant watch",
      category: "Accessories"
    },
    {
      id: 4,
      name: "Backpack",
      description: "Durable backpack",
      category: "Accessories"
    },
    {
      id: 5,
      name: "Jeans",
      description: "Stylish jeans",
      category: "Clothing"
    }
  ];

  // Filtered listings based on search and category
  filteredListings = this.listings;

  // Search query and selected category
  searchQuery = "";
  selectedCategory = "";

  // Available categories for filtering
  categories = ["Announce", "Clothing", "Accessories"];

  constructor() {}

  ngOnInit(): void {
    this.applyFilters(); // Apply filters on initialization
  }

  // Function to apply search and category filters
  applyFilters() {
    this.filteredListings = this.listings.filter((listing) => {
      const matchesSearch = listing.name
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory
        ? listing.category === this.selectedCategory
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
