import { inject, Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { HttpClient, HttpParams } from "@angular/common/http";
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
      .pipe(tap((response) => this.log(response)));
  }

  readCategory(): Observable<CategoryResponse> {
    return this.http
      .get<CategoryResponse>(
        this.apiUrlCategory,
        this.httpOption.getHttpOptions()
      )
      .pipe(tap((response) => this.log(response)));
  }

  updateCategory(request: CategoryRequest, categoryId: number) {
    let params = new HttpParams().append("categories_id", categoryId);
    return this.http
      .put(this.apiUrlCategory, request, this.httpOption.getHttpOptions(params))
      .pipe(tap((response) => this.log(response)));
  }

  deleteCategory(categoryId: number) {
    let params = new HttpParams().append("categories_id", categoryId);

    return this.http.delete(
      `${this.apiUrlCategory}`,
      this.httpOption.getHttpOptions(params)
    );
  }

  getByIdCategory(categoryId: number): Observable<CategoryRequest> {
    let params = new HttpParams().append("categories_id", categoryId);
    return this.http
      .get<CategoryRequest>(`${this.apiUrlCategory}`)
      .pipe(tap((response) => this.log(response)));
  }

  private log(response: any) {
    console.table(response);
  }
}
