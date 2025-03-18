import { Injectable } from "@angular/core";

import { LocationInfo } from "../../types/geolocation";

@Injectable({
  providedIn: "root",
})
export class GeolocationService {
  getLocationAndAddress(): Promise<LocationInfo | null> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.getAddress(latitude, longitude)
              .then((address) => {
                const locationInfo: LocationInfo = {
                  latitude,
                  longitude,
                  address,
                };
                resolve(locationInfo);
              })
              .catch((error) => {
                reject(error);
              });
          },
          (error) => {
            console.error("Error getting location:", error);
            reject(error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        reject(new Error("Geolocation is not supported"));
      }
    });
  }

  getAddress(latitude: number, longitude: number): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    return fetch(url)
      .then((response) => response.json())
      .then((data) => data.display_name)
      .catch((error) => {
        console.error("Error fetching address:", error);
        return "Address not found";
      });
  }
}
