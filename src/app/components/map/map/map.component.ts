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
import { Delete_Modal_Type } from "../../../types/Delete_Modal";
import { ModalDeleteComponent } from "../../modal-delete/modal-delete.component";
import { RegisterRequest } from "../../../types/Register";
import { UserService } from "../../../services/users/user.service";

@Component({
  selector: "app-map",
  imports: [
    CommonModule,
    FormsModule,
    ListingFormComponent,
    ModalDeleteComponent,
  ],
  templateUrl: "./map.component.html",
  styleUrl: "./map.component.css",
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  private markers: L.Marker[] = [];
  users: RegisterRequest[] = [];
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
  selectedUser: number = 0;
  listingServices = inject(ListingsService);
  categoryService = inject(CategoryService);
  userService = inject(UserService);
  readonly httpMapLayer = "";

  //Modal
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  isModalDelete: boolean = false;
  valueDeleteModal: Delete_Modal_Type = {
    title: "Deleting listing",
    content: "Are you sure you want to delete the listing ",
    valueBtnAccepted: "Yes, delete the listing",
    valueBtnCancelled: "Cancel, keep the listing",
    entityToDelete: null,
  };

  ngOnInit(): void {
    this.initMap();
    this.getListing();
    this.getCategory();
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.updateMarkers(this.listings);
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data.data;
      },

      error: () => {},
      complete: () => {},
    });
  }

  // Function to apply search and category filters
  applyFilters() {
    this.listingServices
      .searchListings(
        this.searchQuery,
        +this.selectedCategory,
        +this.selectedUser
      )
      .subscribe({
        next: (data) => {
          this.filteredListings = data.data;
          this.updateMarkers(this.filteredListings);
        },

        error: () => {},
        complete: () => {},
      });
  }

  openModalDelete(listingRequest: ListingRequest) {
    this.valueDeleteModal.entityToDelete = listingRequest;
    this.isModalDelete = true;
  }

  closeModal(isFetch: boolean = false) {
    this.isModalOpen = false;
    if (isFetch) this.getListing();
  }

  closeModalDelete() {
    this.isModalDelete = false;
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

  updateListingForDragAndDrop(listing: ListingRequest) {
    if (listing.id) {
      this.listingServices.updateListing(listing, listing.id).subscribe({
        complete: () => {
          this.getListing();
        },
      });
    }
  }

  deleteListing(listing: unknown) {
    if (this.isListingRequest(listing) && listing.id) {
      this.listingServices.deleteListing(listing.id).subscribe({
        complete: () => {
          this.getListing();
          this.closeModalDelete();
        },
      });
    }
  }
  applyUserFilter() {}

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
      const marker = L.marker(
        [Number(listing.latitude), Number(listing.longitude)],
        {
          draggable: true,
        }
      )
        .addTo(this.map)
        .bindPopup(this.getPopupContent(listing));

      this.markers.push(marker);

      marker.on("moveend", (e) => {
        const newPosition = e.target.getLatLng();
        listing.latitude = newPosition.lat;
        listing.longitude = newPosition.lng;
        this.updateListingForDragAndDrop(listing);
      });

      marker.on("popupopen", () => {
        setTimeout(() => {
          const updateButton = document.getElementById(`update-${listing.id}`);
          const deleteButton = document.getElementById(`delete-${listing.id}`);
          if (updateButton) {
            updateButton.addEventListener("click", () => this.onEdit(listing));
          }
          if (deleteButton) {
            deleteButton.addEventListener("click", () =>
              this.openModalDelete(listing)
            );
          }
        }, 100);
      });
    });
  }

  private isListingRequest(obj: unknown): obj is ListingRequest {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "name" in obj &&
      "address" in obj &&
      "description" in obj &&
      "category_id" in obj &&
      "latitude" in obj &&
      "longitude" in obj
    );
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
      <div class="flex justify-center space-x-4">
        <button id="update-${listing.id}" class="rounded-full p-3 bg-blue-600 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
        </button>
        <button id="delete-${listing.id}" class="rounded-full p-3 bg-gray-500 text-white">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
        </button>
      </div>
    </div>`;
  }
}
