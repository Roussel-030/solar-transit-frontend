import { AfterViewInit, Component, inject, OnInit } from "@angular/core";
import * as L from "leaflet";
import { ListingRequest } from "../../../types/Listing";
import { environment } from "../../../../environments/environment";
import { ListingsService } from "../../../services/listings/listings.service";

@Component({
  selector: "app-map",
  imports: [],
  templateUrl: "./map.component.html",
  styleUrl: "./map.component.css"
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  private markers: L.Marker[] = [];
  private googleTileLayer!: L.TileLayer;
  listings: ListingRequest[] = [];
  listingServices = inject(ListingsService);
  readonly httpMapLayer = "";

  ngOnInit(): void {
    this.initMap();
    this.getListing();
  }

  ngAfterViewInit(): void {
    this.updateMarkers(this.listings);
  }

  private updateMarkers(listingRequest: ListingRequest[]): void {
    this.markers.forEach((marker) => this.map.removeLayer(marker));
    this.markers = [];
    listingRequest.forEach((listing) => {
      const marker = L.marker([
        Number(listing.latitude),
        Number(listing.longitude)
      ])
        .addTo(this.map)
        .bindPopup(this.getPopupContent(listing));
      this.markers.push(marker);
    });
  }

  getListing() {
    this.listingServices.getListing().subscribe({
      next: (data) => {
        this.listings = data.data;
        this.updateMarkers(this.listings);
      },

      error: () => {}
      // complete: () => {
      //   this.applyFilters();
      // }
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
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
    });
    this.map = L.map("map").setView([48.8566, 2.3522], 3);

    this.googleTileLayer = L.tileLayer(environment.httpMapLayer, {
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
      attribution: "&copy; Google Maps"
    }).addTo(this.map);
  }

  private getPopupContent(listing: ListingRequest): string {
    return `
      <div class="relative bg-white rounded-lg shadow-md overflow-hidden hover:cursor-pointer">
        <img
          class="absolute inset-0 w-full h-full object-cover"
          src="${this.listingServices.getImage(listing.image_name)}"
          alt="Listing Image"
        />
        <div class="absolute inset-0 bg-black bg-opacity-40"></div>
        <div class="relative p-6 h-48 flex flex-col justify-end">
          <p class="text-lg font-semibold text-white">${listing.name}</p>
          <p class="text-sm text-gray-200">${listing.address}</p>
        </div>
      </div>
    `;
  }
}
