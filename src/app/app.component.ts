import { Component, OnInit } from '@angular/core';
import Checkout from './lib/Checkout';
import Total from './models/Total.model';
import ProductsPricing from './models/ProductsPricing.model';
import Data from '../assets/constants/data.json';
import Text from '../assets/i18n/en.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  total: Total = { CAP: 0, MUG: 0, TSHIRT: 0 };
  checkout: Checkout;
  totalPrice: number;
  products = Data;
  texts: any = Text.home;

  constructor() {

  }

  ngOnInit() {
    this.checkout = new Checkout(this.total);
  }

  add(id: string) {
    this.checkout.scan(id);
  }

  findProductPrice(id: string) {
    const currentId = id.toLowerCase();
    for (const price in ProductsPricing) {
      if (price === currentId) {
        return ProductsPricing[currentId];
      }
    }
  }

  calculateProductsTotal(id: string) {
    const individuaTotal = this.checkout.individualTotal(id);
    return individuaTotal;
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
   return this.checkout.totalWithoutDiscount();
  }

  getFinalTotal() {
    return this.totalPrice = this.checkout.total();
  }

  showTotal() {
    alert('Total amount to be paid ' + this.getFinalTotal() + '€');
  }

}
