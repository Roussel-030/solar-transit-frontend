import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  public getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({ "Content-type": "application/json" })
    };
    return httpOptions;
  }

  public getHttpLoginOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json"
      })
    };
    return httpOptions;
  }
}
