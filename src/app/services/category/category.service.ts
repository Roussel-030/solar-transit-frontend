import { inject, Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";
import { CategoryRequest, CategoryResponse } from "../../types/Category";
import { environment } from "../../../environments/environment";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  private http = inject(HttpClient);
  private httpOption = inject(HttpService);
  readonly apiUrlCategory = `${API_URL}/categories`;

  createCategory(request: CategoryRequest): Observable<CategoryResponse> {
    return this.http
      .post<CategoryResponse>(
        this.apiUrlCategory,
        request,
        this.httpOption.getHttpOptions()
      )
      .pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
      );
  }

  readCategory(): Observable<CategoryResponse> {
    return this.http
      .get<CategoryResponse>(
        this.apiUrlCategory,
        this.httpOption.getHttpOptions()
      )
      .pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
      );
  }

  updateCategory(request: CategoryRequest) {
    return this.http
      .put(this.apiUrlCategory, request, this.httpOption.getHttpOptions())
      .pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
      );
  }

  deleteCategory(categoryId: number) {
    return this.http.delete(`${this.apiUrlCategory}/${categoryId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
