import Total from '../models/Total.model';
import ProductsPricing from '../models/ProductsPricing.model';
import ProductsId from '../models/ProductsId.model';

//  Class used to calculate discount for products added to the cart.

class Discount {
    totalResult: Total;
    constructor(total: Total) {
        this.totalResult = total;
    }

    //  Function used to apply discounts depending on which id (productId) the function receives as parameter.

    getDiscount(productId: string) {
        if (productId === ProductsId.MUG) {
            return this.twoForOneDiscount(productId);
        } else if (productId === ProductsId.TSHIRT) {
            return this.bulkDiscount(productId, 3, 5);
        }
    }

    //  Method used to obtain the amount discounted to the total price of the product (id) recived as parameter, applying
    //  the logic of "Two for One". The logic goes like this:
    //  1- If the residue of the division of the product amount(searched in the totalResult object) divided by 2 is equal to zero
    //  then when know that the product amount is a even number, so we split the product of the product amount and it's price by two.
    //  2- If the residue of the division of the product amount(searched in the totalResult object) divided by 2 is not equal to zero
    //  then we know that the product amount is not a even number, so we subtract one (1) of the product amount to make it a odd
    //  number and then proceed to multiplicate the product amount (minus 1) and it's price and split it by two.
    //  The result is the amount that has to be sustracted from the product total price.
    //  It has been coded this way, so that it can be applied to any desired product in the future.

    twoForOneDiscount(productId: string) {
        if (this.totalResult[productId] % 2 === 0) {
            return ((this.totalResult[productId] * ProductsPricing[productId]) / 2);
        } else {
            return (((this.totalResult[productId] - 1) * ProductsPricing[productId]) / 2);
        }
    }

    //  Method designed to received as parameters a product id (first parameter), the quantity of products to be considered a bulk shop
    //  (second parameter) and the percentage of discount that will be applied to each product if the condition is true (amount of products
    //  equal or bigger than the one received on the parameter number two).
    //  So, if the condition applies, the function returns the amount of money that with be discounted to the product whose id was received
    //  as the first parameter.
    //  Else, it returns zero.
    //  This function can be applied to any product and is intended to be reusable

    bulkDiscount(productId: string, quantity: number, percentage: number) {
        if (this.totalResult[productId] && this.totalResult[productId] >= quantity) {
            return ((this.totalResult[productId] * (ProductsPricing[productId] * percentage / 100)));
        } else {
            return 0;
        }
    }
}

export default Discount;
