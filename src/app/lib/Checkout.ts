import ProductsId from '../models/ProductsId.model';
import Total from '../models/Total.model';
import ProductsPricing from '../models/ProductsPricing.model';
import Discount from './Discount';

//  Class that calculate all the prices and discounts of the cart that recived an object
//  whose type is Total.
class Checkout {
    totalResult: Total;
    constructor(total: Total) {
        this.totalResult = total;
    }

    //  This method is used to increment by one the amount of products saved as value of the key of the totalResult
    //  object that equals the id received.
    //  It first checks that the id received exists in the ProductId enum and then searchs for its match in the totalResult
    //  object (the id received must match with a key of the object) and increment by one its value.
    //  Returns the modified object.

    scan(productId: string) {
        for (const id in ProductsId) {
            if (productId === ProductsId[id]) {
                for (const product in this.totalResult) {
                    if (productId === product) {
                        this.totalResult[product]++;
                    }
                }
            }
        }
        return this.totalResult;
    }

    //  This method is used to decrement by one the amount of products saved as value of the key of the totalResult
    //  object that equals the id received.
    //  It first checks that the id received exists in the ProductId enum and then searchs for its match in the totalResult
    //  object (the id received must match with a key of the object) and decrement by one its value.

    delete(productId: string) {

        for (const id in ProductsId) {
            if (productId === ProductsId[id]) {
                for (const product in this.totalResult) {
                    if (productId === product) {
                        this.totalResult[product]--;

                    }
                }
            }
        }
        return this.totalResult;
    }

    //  Method that returns the total price that the user has to pay with all the discounts applied.

    total() {
        return this.totalResult.MUG * ProductsPricing.MUG + this.totalResult.CAP *
            ProductsPricing.CAP + this.totalResult.TSHIRT * ProductsPricing.TSHIRT -
            this.calculateDiscount(ProductsId.MUG) - this.calculateDiscount(ProductsId.TSHIRT);
    }

    //  Method that instance the Discount class (that receives as parameter the totalResult object) and returns
    //  the result of it's getDiscount method.

    calculateDiscount(productId: string) {
        const discount = new Discount(this.totalResult);
        return discount.getDiscount(productId);
    }

    //  Method that calculates the total price without any discount applied by going through the totalResult object
    //  and adding the individual total of each product.

    totalWithoutDiscount() {
        let total = 0;
        for (const product in this.totalResult) {
            if (product) {
                total += this.individualTotal(product);
            }
        }
        return total;
    }

    //  Method that calculates the indivual total price without any discount applied of the product (whose id was received)
    //  as a parameter of the method and multipling it by its price.

    individualTotal(productId: string) {
        const individualTotal = this.totalResult[productId] * ProductsPricing[productId];
        return individualTotal;
    }
}

export default Checkout;
