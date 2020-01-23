import Total from '../models/Total.model';
import ProductsPricing from '../models/ProductsPricing.model';
import ProductsId from '../models/ProductsId.model';
class Discount {
    totalResult: Total;
    constructor(total: Total) {
        this.totalResult = total;
    }

    getDiscount(productId) {
        if (productId === ProductsId.MUG) {
            return this.twoForOneDiscount(productId);
        } else if (productId === ProductsId.TSHIRT) {
            return this.bulkDiscount(productId, 3, 5);
        }
    }

    twoForOneDiscount(productId: string) {
        const currentId = productId.toLowerCase();
        if (this.totalResult[productId] % 2 === 0) {
            return ((this.totalResult[productId] * ProductsPricing[currentId]) / 2);
        } else {
            return (((this.totalResult[productId] - 1) * ProductsPricing[currentId]) / 2);
        }
    }

    bulkDiscount(productId: string, quantity: number, percentage: number) {
        const currentId = productId.toLowerCase();
        if (this.totalResult[productId] >= quantity) {
            return ((this.totalResult[productId] * (ProductsPricing[currentId] *  percentage / 100)));
        } else {
            return 0;
        }
    }
}

export default Discount;
