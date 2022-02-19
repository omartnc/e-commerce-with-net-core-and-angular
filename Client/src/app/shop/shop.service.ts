import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IProductBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProductType } from '../shared/models/type';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:7073/api/";

  constructor(private http: HttpClient) { }
  getProducts(productBrandId?: string, productTypeId?: string) {
    let params = new HttpParams();
    if (productBrandId) {
      params = params.append("brandId", productBrandId);
    }
    if (productTypeId) {
      params = params.append("typeId", productTypeId);
    }
    return this.http.get<IPagination>(`${this.baseUrl}products`, { observe: "response", params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }
  getBrands() {
    return this.http.get<IProductBrand[]>(`${this.baseUrl}products/brands`);
  }
  getTypes() {
    return this.http.get<IProductType[]>(`${this.baseUrl}products/types`);
  }
}
