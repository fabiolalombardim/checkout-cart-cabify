//  This enum will allow us to define a set of named constants where each key of the object represents an id of a product and each value
//  the id of the corresponding product.
//  This will make easy going through JSON objects to find a determinated value by matching some parameter to the keys of the enum.

enum ProductsId {
    CAP = 'CAP',
    MUG = 'MUG',
    TSHIRT = 'TSHIRT'
}

export default ProductsId;
