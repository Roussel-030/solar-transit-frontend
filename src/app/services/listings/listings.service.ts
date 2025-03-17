import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { environment } from "../../../environments/environment";
import { Observable, tap, catchError, of } from "rxjs";
import {
  ListingImageRequest,
  ListingRequest,
  ListingResponse,
} from "../../types/Listing";

const API_URL = environment.apiUrl;
@Injectable({
  providedIn: "root",
})
export class ListingsService {
  private http = inject(HttpClient);
  private httpOption = inject(HttpService);
  readonly listingUrl = `${API_URL}/listings/`;

  getListing(): Observable<ListingResponse> {
    return this.http
      .get<ListingResponse>(this.listingUrl, this.httpOption.getHttpOptions())
      .pipe(
        tap((response) => {}),
        catchError((error) => this.handleError(error, null))
      );
  }

  createListing(request: ListingRequest): Observable<ListingRequest> {
    return this.http
      .post<ListingRequest>(
        this.listingUrl,
        request,
        this.httpOption.getHttpOptions()
      )
      .pipe(
        tap((response) => {}),
        catchError((error) => this.handleError(error, null))
      );
  }

  deleteListing(id: number): Observable<ListingRequest> {
    let params = new HttpParams().append("listings_id", id);
    return this.http
      .delete<ListingRequest>(
        this.listingUrl,
        this.httpOption.getHttpOptions(params)
      )
      .pipe(
        tap((response) => {}),
        catchError((error) => this.handleError(error, null))
      );
  }

  createListingImage(
    request: ListingImageRequest
  ): Observable<ListingImageRequest> {
    return this.http
      .post<ListingImageRequest>(
        this.listingUrl,
        request,
        this.httpOption.getHttpOptions()
      )
      .pipe(
        tap((response) => {}),
        catchError((error) => this.handleError(error, null))
      );
  }

  updateListing(
    request: ListingRequest,
    id: number
  ): Observable<ListingRequest> {
    let params = new HttpParams().append("listings_id", id);
    return this.http
      .put<ListingRequest>(
        this.listingUrl,
        request,
        this.httpOption.getHttpOptions(params)
      )
      .pipe(
        tap((response) => {}),
        catchError((error) => this.handleError(error, null))
      );
  }

  getListingById(id: number): Observable<ListingRequest> {
    let params = new HttpParams().append("listings_id", id);
    return this.http
      .get<ListingRequest>(
        this.listingUrl + "by_id/",
        this.httpOption.getHttpOptions(params)
      )
      .pipe(
        tap((response) => {}),
        catchError((error) => this.handleError(error, null))
      );
  }

  searchListings(
    name: string = "",
    categoryId: number = 0,
    userId: number = 0
  ): Observable<ListingResponse> {
    let params = new HttpParams()
      .append("name", name)
      .append("category_id", categoryId)
      .append("user_id", userId);
    return this.http
      .get<ListingResponse>(
        this.listingUrl + "search",
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

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file); // 'file' should match the parameter name in your FastAPI endpoint

    return this.http.post(this.listingUrl + "upload-image/", formData);
  }

  getImage(name: string) {
    if (name) return `${this.listingUrl}image/?name_file=${name}`;
    return "";
  }
}
