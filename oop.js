class productsClass {
    #productPrice;
    constructor(productName, productPrice) {
        this.id = Date.now()
        this.productName = productName;
        this.#productPrice = productPrice;
    }

    getProductPrice() {
        return parseInt(this.#productPrice);
    }

    getProductsObject() {
        let productsObject = {
            id: Date.now(),
            title: this.productName,
            price: this.getProductPrice(),
        }
        return productsObject
    }
}

export { productsClass }