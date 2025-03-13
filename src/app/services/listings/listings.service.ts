import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { environment } from "../../../environments/environment";
import { Observable, tap, catchError, of } from "rxjs";
import { Listing, ResponseListing } from "../../types/Listing";

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: "root"
})
export class ListingsService {
  private http = inject(HttpClient);
  private httpOption = inject(HttpService);
  readonly listingUrl = `${API_URL}/listings/`;

  getListing(): Observable<ResponseListing> {
    return this.http
      .get<ResponseListing>(this.listingUrl, this.httpOption.getHttpOptions())
      .pipe(
        tap((response) => {}),
        catchError((error) => this.handleError(error, null))
      );
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
