import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

const SOCKET_URL = environment.socketUrl;

@Injectable({
  providedIn: "root"
})
export class WebSocketService {
  private webSocket!: WebSocket;
  private shouldReconnect: boolean = true;
  private reconnectInterval: number = 5000; // 5 seconds
  private newNotification: boolean = false;
  private nbrNotification: number = 0;

  constructor() {}

  // Method to open a WebSocket connection
  openWebsocketConnection(id?: number) {
    this.webSocket = new WebSocket(`${SOCKET_URL}/socket/ws/${id}`);

    this.webSocket.onopen = (e) => {
      console.log("WebSocket connection opened", e);
    };

    this.webSocket.onmessage = (e) => {
      let message = JSON.parse(e.data);
      if (message?.status === "refresh") {
        // Call a service to refresh the menu or perform other actions
        // this.homeService.refreshMenu();
      } else {
        this.newNotification = true;
        this.nbrNotification += 1;
        this.createBasicNotification("bottomRight", JSON.parse(e.data));
      }
    };

    this.webSocket.onclose = (e) => {
      console.log("WebSocket connection closed", e);
      if (this.shouldReconnect) {
        setTimeout(() => {
          this.openWebsocketConnection(id);
        }, this.reconnectInterval);
      }
    };

    this.webSocket.onerror = (e) => {
      console.error("WebSocket error", e);
      this.webSocket.close();
    };
  }

  // Method to close the WebSocket connection
  closeWebsocketConnection() {
    this.shouldReconnect = false;
    this.webSocket.close();
  }

  // Method to create a basic notification (you can implement this as needed)
  private createBasicNotification(position: string, data: any) {
    // Implement your notification logic here
    console.log("New notification:", data);
  }

  // Method to listen for incoming messages (optional, if needed)
  public getListingUpdates() {
    return new Observable((observer) => {
      this.webSocket.onmessage = (e) => {
        observer.next(e.data);
      };
    });
  }
}
