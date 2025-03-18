import { Injectable } from "@angular/core";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { environment } from "../../../environments/environment";

const SOCEKT_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    // Connect to the WebSocket endpoint
    this.socket$ = webSocket(`${SOCEKT_URL}/ws/listings`);
  }

  // Method to listen for incoming messages
  public getListingUpdates() {
    return this.socket$.asObservable();
  }
}
