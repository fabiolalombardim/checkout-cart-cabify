import { Component, OnInit } from '@angular/core';
import  Checkout  from './lib/Checkout';
import Total from './models/Total.model';
import ProductsPricing from './models/ProductsPricing.model';
import Data from '../assets/constants/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  total: Total = {CAP : 0, MUG : 0, TSHIRT : 0}
  checkout: Checkout;
  totalPrice: number;
  products = Data;
  
  constructor() { 

  }

  ngOnInit() {
      this.checkout = new Checkout(this.total);
  }

  add(id:string) {
    this.checkout.scan(id);
  }

  findProductPrice(id: string) {
    let currentId = id.toLowerCase();
    for (let price in ProductsPricing) {
      if(price === currentId) {
        return ProductsPricing[currentId];
      }
    }
  }

  calculateProductsTotal(id: string) {
    let currentId = id.toLowerCase();
      return this.total[id]  * ProductsPricing[currentId];
  }

  calculateTshirtTotal() {
    return this.total.TSHIRT * ProductsPricing.tshirt;
  }

  calculateMugTotal() {
    return this.total.MUG * ProductsPricing.mug;
  }

  calculateCapTotal() {
    return this.total.CAP * ProductsPricing.cap;
  }

  delete(id: string) {
    this.checkout.delete(id);
  }

  getDiscounts(id) {
    return this.checkout.calculateDiscount(id);
  }

  totalProducts() {
    return this.total.CAP + this.total.MUG + this.total.TSHIRT;
  }

   totalPricing() {
    return this.calculateCapTotal() + this.calculateTshirtTotal() + this.calculateMugTotal();
  }

  getFinalTotal() {
    return this.totalPrice = this.checkout.total();
  }

  saveProduct(product) {
    localStorage.setItem('selectedProduct' , JSON.stringify(product));
  }

}
