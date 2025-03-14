import { Component, inject, OnInit } from "@angular/core";
import * as L from "leaflet";
import { ListingRequest } from "../../../types/Listing";
import { environment } from "../../../../environments/environment";
import { ListingsService } from "../../../services/listings/listings.service";

@Component({
  selector: "app-map",
  imports: [],
  templateUrl: "./map.component.html",
  styleUrl: "./map.component.css",
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private markers: L.Marker[] = [];
  private googleTileLayer!: L.TileLayer;
  listings: ListingRequest[] = [];
  listingServices = inject(ListingsService);
  readonly httpMapLayer = "";

  ngOnInit(): void {
    this.initMap();
    this.getListing();
    this.updateMarkers(this.listings);
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
        .bindPopup(``);
      this.markers.push(marker);
    });
  }

  getListing() {
    this.listingServices.getListing().subscribe({
      next: (data) => {
        this.listings = data.data;
      },

      error: () => {},
      // complete: () => {
      //   this.applyFilters();
      // }
    });
  }

  private initMap(): void {
    this.map = L.map("map").setView([48.8566, 2.3522], 3);

    this.googleTileLayer = L.tileLayer(environment.httpMapLayer, {
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
      attribution: "&copy; Google Maps",
    }).addTo(this.map);
  }
}
