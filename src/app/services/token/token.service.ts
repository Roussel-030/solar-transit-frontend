import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  set_token(token: string) {
    localStorage.setItem("token", token);
  }

  get_token() {
    return localStorage.getItem("token") as string;
  }
}
