import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IProductBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { ShopParams } from '../shared/models/shopParams';
import { IProductType } from '../shared/models/type';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = "https://localhost:7073/api/";

  constructor(private http: HttpClient) { }
  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    if (shopParams.productBrandId != "") {
      params = params.append("brandId", shopParams.productBrandId);
    }
    if (shopParams.productTypeId != "") {
      params = params.append("typeId", shopParams.productTypeId);
    }
    params = params.append("sort", shopParams.productSort);
    if (shopParams.pageNumber) {
      params = params.append("pageIndex", shopParams.pageNumber.toString());
    }
    if (shopParams.pageSize) {
      params = params.append("pageSize", shopParams.pageSize.toString());
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
