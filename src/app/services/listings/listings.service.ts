import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { environment } from "../../../environments/environment";
import { Observable, tap, catchError, of } from "rxjs";
import { ListingResponse } from "../../types/Listing";

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: "root"
})
export class ListingsService {
  private http = inject(HttpClient);
  private httpOption = inject(HttpService);
  readonly listingUrl = `${API_URL}/listings/`;
  readonly searchUrl = `${API_URL}/listings/search`;

  getListing(): Observable<ListingResponse> {
    return this.http
      .get<ListingResponse>(this.listingUrl, this.httpOption.getHttpOptions())
      .pipe(
        tap((response) => {}),
        catchError((error) => this.handleError(error, null))
      );
  }

  searchListings(
    name: string = "",
    categoryId: number = 0
  ): Observable<ListingResponse> {
    let params = new HttpParams()
      .append("name", name)
      .append("category_id", categoryId);
    return this.http
      .get<ListingResponse>(
        this.searchUrl,
        this.httpOption.getHttpOptions(params)
      )
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
