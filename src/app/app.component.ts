import { Component, OnInit } from '@angular/core';
import  Checkout  from './lib/Checkout';
import Total from './models/Total.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  total: Total = {capAmount : 0, mugAmount : 0, shirtAmount : 0, mugTotal : 0, shirtTotal : 0, capTotal :0 }
  checkout: any;
  
  constructor() { 

  }

  ngOnInit() {
      this.checkout = new Checkout(this.total);
  }

  add(id:string) {
    this.checkout.scan(id);
    console.log(this.checkout.total())
  }


  delete(id: string) {
    this.checkout.delete(id);
  }


  totalProducts() {
    return this.total.capAmount + this.total.mugAmount + this.total.shirtAmount;
  }

  totalPricing() {
    return this.total.capTotal + this.total.mugTotal + this.total.shirtTotal;
  }


}
