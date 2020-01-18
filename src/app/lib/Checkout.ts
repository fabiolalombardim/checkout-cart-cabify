import ProductsId from '../models/ProductsId';
import Total from '../models/Total.model';
import ProductsPricing from '../models/ProductsPricing';

class Checkout {
    totalResult: Total;
    constructor(total: Total) {
         this.totalResult = total;
    }
    scan(productId) {
        if(productId === ProductsId.cap) {
            this.totalResult.capAmount++;
            this.totalResult.capTotal = this.totalResult.capAmount * ProductsPricing.cap;
        } else if( productId === ProductsId.mug) {
            this.totalResult.mugAmount++;
            this.totalResult.mugTotal = this.totalResult.mugAmount * ProductsPricing.mug;
        } else {
            this.totalResult.shirtAmount++;
            this.totalResult.shirtTotal = this.totalResult.shirtAmount * ProductsPricing.tshirt;
        }
        return  this.totalResult;
    }

    total() {
        console.log(this.totalResult);
    }

    delete(productId) {
        if(productId === ProductsId.cap) {
            this.totalResult.capAmount--;
            this.totalResult.capTotal = this.totalResult.capTotal - ProductsPricing.cap;
        } else if( productId === ProductsId.mug) {
            this.totalResult.mugAmount--;
            this.totalResult.mugTotal = this.totalResult.mugTotal - ProductsPricing.mug;
        } else {
            this.totalResult.shirtAmount--;
            this.totalResult.shirtTotal = this.totalResult.shirtTotal - ProductsPricing.tshirt;
        }
        return  this.totalResult;
    }
}

export default Checkout;