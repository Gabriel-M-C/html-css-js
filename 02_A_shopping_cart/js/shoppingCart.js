// Shopping Cart Class with array of products, currency constant, methods get them, and to calculate the total checkout.
class ShoppingCart {
    #products;
    #currency;
    #limit;
    constructor() {
        this.#products = [];
        this.#currency = "";
        this.#limit = 9; // maximum avaliable products, if needed could be connectesd with stock if future versions.
    }

    setCurrency(currency) {
        this.#currency = currency;
    }

    getCurrency() {
        return this.#currency;
    }

    addProduct(p) {
        this.#products.push(p);
    }

    getProductList() {
        return this.#products;
    }

    getLimit() {
        return this.#limit;
    }

    calcTotalCheckout() {
        let total = 0;
        this.#products.forEach(prod => {
            total += prod.getPrice() * prod.getUnits();
        });
        return Math.round(total * 100) / 100; //Rounding to 2 decimals
    }

    findProduct(sku) {
        return this.#products.find(p => p.getSku() === sku);
    }

}