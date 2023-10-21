class productsLocalstorageClass {
    constructor(productList) {
        this.productList = productList;
    }

    getProductsFromLocalstorage() {
        return JSON.parse(localStorage.getItem("products")) || [];
    }

    addProductsToLocalstorage(productList) {
        return window.localStorage.setItem("products", JSON.stringify(productList));
    }

    deleteProductFromLocalstorage(productList, id) {
        window.localStorage.setItem("products", JSON.stringify(this.productList = productList.filter((product) => {
            return product.id != id;
        })));
        return this.productList
    }
}

export { productsLocalstorageClass }