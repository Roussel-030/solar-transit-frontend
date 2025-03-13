import { Injectable } from "@angular/core";
import { Role } from "../../types/Role";

@Injectable({
  providedIn: "root",
})
export class HeaderService {
  set_header_role(role: Role) {
    localStorage.setItem("role", role);
  }

  get_role() {
    return localStorage.getItem("role") as string;
  }
}
