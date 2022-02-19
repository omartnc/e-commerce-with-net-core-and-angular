import { Component, OnInit } from '@angular/core';
import { IProductBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IProductType } from '../shared/models/type';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[];
  productBrands: IProductBrand[];
  productTypes: IProductType[];
  productTypeIdSelected: string;
  productBrandIdSelected: string;
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  getProducts() {
    this.shopService.getProducts(this.productBrandIdSelected, this.productTypeIdSelected).subscribe(response => {
      this.products = response.data;
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
    this.productBrandIdSelected = productBrandId;
    this.getProducts();
  }
  onTypeSelected(productTypeId: string) {
    this.productTypeIdSelected = productTypeId;
    this.getProducts();
  }
}
