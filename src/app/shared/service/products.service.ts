import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, IResponse } from '../model/products.model';

const API_URL = 'https://dummyjson.com';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getProducts(value: string | undefined, limit: number): Observable<IResponse> {
    return this.httpClient.get<IResponse>(`${API_URL}/products/search?q=${value}&limit=${limit}`);
  }
  getProductById(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${API_URL}/products/${id}`);
  }
}
