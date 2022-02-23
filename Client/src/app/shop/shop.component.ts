import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProductBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { IProductType } from '../shared/models/type';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('search', { static: false }) searchTerm: ElementRef;
  products: IProduct[];
  productBrands: IProductBrand[];
  productTypes: IProductType[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    { name: "Alphabetical", value: "name" },
    { name: "Price: Low to High", value: "priceAsc" },
    { name: "Price: High to Low", value: "priceDsc" }
  ]
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageSize = response.pageSize;
      this.shopParams.pageNumber = response.pageIndex;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }
  getBrands() {
    this.shopService.getBrands().subscribe(response => {
      this.productBrands = [{ id: "", name: "All" }, ...response];
    }, error => {
      console.log(error);
    });
  }
  getTypes() {
    this.shopService.getTypes().subscribe(response => {
      this.productTypes = [{ id: "", name: "All" }, ...response];
    }, error => {
      console.log(error);
    });
  }
  onBrandSelected(productBrandId: string) {
    this.shopParams.productBrandId = productBrandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onTypeSelected(productTypeId: string) {
    this.shopParams.productTypeId = productTypeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onSortSelected(sort: string) {
    this.shopParams.productSort = sort;
    this.getProducts();
  }
  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }
  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onReset() {
    this.searchTerm.nativeElement.value = "";
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
