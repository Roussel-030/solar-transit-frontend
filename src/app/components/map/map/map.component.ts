import { AfterViewInit, Component, inject, OnInit } from "@angular/core";
import * as L from "leaflet";
import { ListingRequest } from "../../../types/Listing";
import { environment } from "../../../../environments/environment";
import { ListingsService } from "../../../services/listings/listings.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CategoryRequest } from "../../../types/Category";
import { CategoryService } from "../../../services/category/category.service";
import { ListingFormComponent } from "../../listing-form/listing-form.component";

@Component({
  selector: "app-map",
  imports: [CommonModule, FormsModule, ListingFormComponent],
  templateUrl: "./map.component.html",
  styleUrl: "./map.component.css",
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  private markers: L.Marker[] = [];
  private googleTileLayer!: L.TileLayer;
  // Sample data for listings
  listings: ListingRequest[] = [];
  categories: CategoryRequest[] = [];
  selectedListing!: ListingRequest;

  // Filtered listings based on search and category
  filteredListings = this.listings;

  // Search query and selected category
  searchQuery = "";
  selectedCategory: number = 0;
  listingServices = inject(ListingsService);
  categoryService = inject(CategoryService);
  readonly httpMapLayer = "";

  //Modal
  isModalOpen: boolean = false;
  isEditing: boolean = false;

  ngOnInit(): void {
    this.initMap();
    this.getListing();
    this.getCategory();
  }

  ngAfterViewInit(): void {
    this.updateMarkers(this.listings);
  }

  // Function to apply search and category filters
  applyFilters() {
    this.listingServices
      .searchListings(this.searchQuery, +this.selectedCategory)
      .subscribe({
        next: (data) => {
          this.filteredListings = data.data;
          this.updateMarkers(this.filteredListings);
        },

        error: () => {},
        complete: () => {},
      });
  }

  closeModal(isFetch: boolean = false) {
    this.isModalOpen = false;
    if (isFetch) this.getListing();
  }

  addListing() {
    this.isModalOpen = true;
    this.isEditing = false;
    this.selectedListing;
  }

  onEdit(listing: ListingRequest) {
    this.selectedListing = listing;
    this.isModalOpen = true;
    this.isEditing = true;
  }

  getListing() {
    this.listingServices.getListing().subscribe({
      next: (data) => {
        this.listings = data.data;
        this.updateMarkers(this.listings);
      },

      error: () => {},
      // complete: () => {
      //   this.applyFilters();
      // }
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

  private initMap(): void {
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
    this.map = L.map("map").setView([48.8566, 2.3522], 3);

    this.googleTileLayer = L.tileLayer(environment.httpMapLayer, {
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
      attribution: "&copy; Google Maps",
    }).addTo(this.map);
  }

  private updateMarkers(listingRequest: ListingRequest[]): void {
    this.markers.forEach((marker) => this.map.removeLayer(marker));
    this.markers = [];

    listingRequest.forEach((listing) => {
      const marker = L.marker([
        Number(listing.latitude),
        Number(listing.longitude),
      ])
        .addTo(this.map)
        .bindPopup(this.getPopupContent(listing));

      this.markers.push(marker);

      marker.on("popupopen", () => {
        setTimeout(() => {
          const updateButton = document.getElementById(`update-${listing.id}`);
          if (updateButton) {
            updateButton.addEventListener("click", () => this.onEdit(listing));
          }
        }, 100);
      });
    });
  }

  private getPopupContent(listing: ListingRequest): string {
    return `
    <div class="p-3">
      <div class="text-sm text-gray-700 space-y-1">
        <p class="font-medium text-gray-950">
          Latitude: <span class="text-gray-600">${listing.latitude}</span>
        </p>
        <p class="font-medium text-gray-900">
          Longitude: <span class="text-gray-600">${listing.longitude}</span>
        </p>
        <p class="font-medium text-gray-900">
          Address: <span class="text-gray-600">${listing.address}</span>
        </p>
      </div>
      <div class="flex flex-col space-y-2">
        <button id="update-${listing.id}" class="flex items-center justify-center px-5 py-2 bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition duration-300">
          Action
        </button>
      </div>
    </div>`;
  }
}
