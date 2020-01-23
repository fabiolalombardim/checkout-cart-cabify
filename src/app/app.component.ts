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

  //                                      Declaration of variables                              //

  //  Variable total of type Total is always initialized with all of its keys values set to 0.
  //  Variable checkout of type Checkout (will be instanced later).
  //  Variable totalPrice will be bound to the view to show the total price (discounts applied).
  //  Variable products is an JSON array consisting of all the products and their information that will be bound to the view using Angular
  //  directive *ngFor.
  //  Variable texts refers to the JSON of translations imported as Text.


  total: Total = { CAP: 0, MUG: 0, TSHIRT: 0 };
  checkout: Checkout;
  totalPrice: number;
  products = Data;
  texts: any = Text.home;


  //  This lifecycle method is used to handle the initialization task: The instance of the Checkout class
  //  thats receives as a parameter an object of type Total.

  ngOnInit() {
    this.checkout = new Checkout(this.total);
  }

  //  Function used to access the method of the Checkout class that allows an user to add a product to the
  //  total object (scan method). This function is triggered when the user clicks in the button whose id is "add" and
  //  in the button "Add to cart" of the ModalComponent.

  addProduct(id: string) {
    this.checkout.scan(id);
  }

  //  Function used to access the method of the Checkout class that allows an user to remove a product of the
  //  total object (delete method). This function is triggered when the user clicks in the button whose id is "delete".

  removeProduct(id: string) {
    this.checkout.delete(id);
  }

  //  Function used to bind the price of each product in the column "Price"
  //  It receives a string that is in fact the product id and then goes through each key of the ProductsPricing JSON  (Object
  //  used to match a product with its price given the fact that the object key is equal to the product id (the string received as a
  //  parameter in the fuction) and grabs its value and returns it).

  findProductPrice(id: string) {
    for (const price in ProductsPricing) {
      if (price === id) {
        return ProductsPricing[id];
      }
    }
  }

  // Function used to calculate each product individual total price. It returns a number that gets bound to the column "Total".
  // The function uses the method "individualTotal" of the Checkout class to achive the total price of a single product
  // (no discounts applied).

  calculateProductsTotal(id: string) {
    const individuaTotal = this.checkout.individualTotal(id);
    return individuaTotal;
  }

  //  Function used to calculate the amount discounted of each product total using the method "calculateDiscount" of the Checkout class.

  getDiscounts(id) {
    return this.checkout.calculateDiscount(id);
  }


  //  Function used to calculate the total of products added to the cart.

  totalProducts() {
    return this.total.CAP + this.total.MUG + this.total.TSHIRT;
  }

  //  Function that using the method of the Checkout class called totalWithoutDiscounts,  returns the total price to be paid
  //  without discounts.

  totalPricing() {
    return this.checkout.totalWithoutDiscount();
  }

  //  Function that using the method of the Checkout class called total,  returns the total price to be paid with discounts included.

  getFinalTotal() {
    return this.totalPrice = this.checkout.total();
  }

  //  Function that gets trigger when an user clicks the button that says "Checkout". This button in a real application should redirect
  //  the user to the payment page.

  showTotal() {
    alert('Total amount to be paid ' + this.getFinalTotal() + '€');
  }

}
