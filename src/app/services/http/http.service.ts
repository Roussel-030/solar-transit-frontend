import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from "../token/token.service";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private tokenService: TokenService) {}
  public getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        Authorization: "Bearer " + this.tokenService.get_token()
      })
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
