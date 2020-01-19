import { Component, OnInit } from '@angular/core';
import  Checkout  from './lib/Checkout';
import Total from './models/Total.model';
import TotalPricing from './models/ProductsPricing.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  total: Total = {CAP : 0, MUG : 0, TSHIRT : 0}
  checkout: Checkout;
  totalPrice: number;
  
  constructor() { 

  }

  ngOnInit() {
      this.checkout = new Checkout(this.total);
  }

  add(id:string) {
    this.checkout.scan(id);
  }

  calculateTshirtTotal() {
    return this.total.TSHIRT * TotalPricing.tshirt;
  }

  calculateMugTotal() {
    return this.total.MUG * TotalPricing.mug;
  }

  calculateCapTotal() {
    return this.total.CAP * TotalPricing.cap;
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


}
