import ProductsId from '../models/ProductsId.model';
import Total from '../models/Total.model';
import ProductsPricing from '../models/ProductsPricing.model';
import Discount from './Discount';

class Checkout {
    totalResult: Total;
    constructor(total: Total) {
        this.totalResult = total;
    }
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

    total() {
        return this.totalResult.MUG * ProductsPricing.mug + this.totalResult.CAP *
            ProductsPricing.cap + this.totalResult.TSHIRT * ProductsPricing.tshirt -
            this.calculateDiscount(ProductsId.MUG) - this.calculateDiscount(ProductsId.TSHIRT);
    }

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

    calculateDiscount(productId: string) {
        const discount = new Discount(this.totalResult);
        return discount.getDiscount(productId);
    }

    totalWithoutDiscount() {
        let total = 0;
        for (const product in this.totalResult) {
            if (product) {
                total += this.individualTotal(product);
            }
        }
        return total;
    }

    individualTotal(productId: string) {
        const currentId = productId.toLowerCase();
        const individualTotal = this.totalResult[productId] * ProductsPricing[currentId];
        return individualTotal;
    }
}

export default Checkout;
