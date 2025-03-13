import { inject, Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";
import { CategoryRequest, CategoryResponse } from "../../types/Category";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private http = inject(HttpClient);
  private httpOption = inject(HttpService);

  createCategory(request: CategoryRequest): Observable<CategoryResponse> {
    return this.http
      .post<CategoryResponse>("req", request, this.httpOption.getHttpOptions())
      .pipe(
        tap((response) => this.log(response)),
        catchError((error) => this.handleError(error, null))
      );
  }

  readCategory(): Observable<CategoryRequest[]> {
    return this.http.get<CategoryRequest[]>("req").pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  updateCategory() {}

  deleteCategory() {}

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
  }
}
