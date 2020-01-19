import ProductsId from '../models/ProductsId.model';
import Total from '../models/Total.model';
import ProductsPricing from '../models/ProductsPricing.model';
import Discount from './Discount';

class Checkout extends Discount {
    constructor(total: Total) {
        super(total)
        this.totalResult = total;
    }
    scan(productId) {
        for (let id in ProductsId) {
            if (productId === ProductsId[id]) {
                for (let product in this.totalResult) {
                    if (productId === product) {
                        this.totalResult[product]++;
                    }
                }
            }
        }
        return this.totalResult;
    }

    total() {
        return this.totalResult.MUG * ProductsPricing.mug + this.totalResult.CAP * ProductsPricing.cap + this.totalResult.TSHIRT * ProductsPricing.tshirt -
            this.calculateDiscount('MUG') - this.calculateDiscount('TSHIRT')
    }

    delete(productId) {

        for (let id in ProductsId) {
            if (productId === ProductsId[id]) {
                for (let product in this.totalResult) {
                    if (productId === product) {
                        this.totalResult[product]--;

                    }
                }
            }
        }
        return this.totalResult;
    }

    calculateDiscount(productId) {
        return super.getDiscount(productId)
    }
}

export default Checkout;