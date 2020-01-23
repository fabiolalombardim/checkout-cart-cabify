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
            if (this.totalResult.MUG % 2 === 0) {
                return ((this.totalResult.MUG * ProductsPricing.mug) / 2);
            } else {
                return (((this.totalResult.MUG - 1) * ProductsPricing.mug) / 2);
            }
        } else if (productId === ProductsId.TSHIRT) {
            if (this.totalResult.TSHIRT >= 3) {
                return ((this.totalResult.TSHIRT * ProductsPricing.tshirt) -  (this.totalResult.TSHIRT * 19));
            } else {
                return 0;
            }
        }
    }
}

export default Discount;
