// Simple product class with private attributs needed and the necesary methods to get them.

class Product {
    #sku;
    #title;
    #price;

    constructor(pSku, pTitle, pPrice) {
        this.#sku = pSku;
        this.#title = pTitle;
        this.#price = pPrice;
    }

    getSku() {
        return this.#sku;
    }

    getTitle() {
        return this.#title;
    }

    getPrice() {
        return this.#price;
    }
}

// ItemCart extends the product class to store all data required by a Shopping cart. It adds the number of units of each product,  and some methods to manage them. Probably I could add a stock atributte instead using a limit in the ShoppingCart class...

class ItemCart extends Product {
    #nUnits;
    constructor(pSku, title, price, nUnits) {
        super(pSku, title, price);
        this.#nUnits = nUnits;
    }

    // setUnits prevents that negative values are set.
    setUnits(units) {
        const n = parseInt(units);
        if (n >= 0) { this.#nUnits = n; }
        else { this.#nUnits = 0; }
    }

    getUnits() {
        return this.#nUnits;
    }

    getTotalPrice() {
        return Math.round((this.getPrice() * this.#nUnits) * 100) / 100; // Rounding to 2 decimals
    }
}

