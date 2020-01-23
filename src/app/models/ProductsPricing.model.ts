//  This enum will allow us to define a set of named constants where each key of the object represents an id of a product and each value
//  the price of the corresponding product.
//  This way we avoid the use of hardcoded numbers in the .ts files and make the functions where this constants are used scalables.

enum ProductsPricing {
    CAP = 5,
    MUG = 7.5,
    TSHIRT = 20
}

export default ProductsPricing;
