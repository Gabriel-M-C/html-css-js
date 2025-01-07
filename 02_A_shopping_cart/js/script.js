
// FOR THIS EXAMPLE REALLY WORKS IT NEEDS TO BE CONNECTED TO A DATABASE,
// IF IT'S NOT WORKING PASTE THE BELOW JASON
// http://jsonblob.com/1325534155387363328
// https://jsonblob.com/api/jsonBlob/1325534155387363328

// {
//     "currency": "€",
//     "products": [
//       {
//         "sku": "0K3QOSOV4V",
//         "title": "iFhone 13 Pro",
//         "price": "938.99"
//       },
//       {
//         "sku": "TGD5XORY1L",
//         "title": "Cargador",
//         "price": "49.99"
//       },
//       {
//         "sku": "IOKW9BQ9F3",
//         "title": "Funda de piel",
//         "price": "79.99"
//       }
//     ]
//   }

// function to load the shopping cart with the data from  jasonblob.com
const loadShopCart = (info) => {
    console.log(info);
    webShpCart.setCurrency(info.currency);
    info.products.forEach(product => {

        const p = new ItemCart(product.sku, product.title, product.price, 1);
        // I asume, by the context given in the exercice, that in the begining the user will ask for 1 unit of each product. 
        webShpCart.addProduct(p);
    });
}

// Function to update the UI of the shopping cart.
const updateShpCartUI = (target, product) => {
    const parent = target.parentNode.parentNode;
    // update web product list
    parent.querySelector(".list__item--total").textContent = product.getTotalPrice() + currency;
    parent.querySelector(".list__item-input").value = product.getUnits();
    // Update total checkout hidding 0 values ...
    const total = document.getElementById("totalUl");
    const line = total.querySelector(`[data-id="${product.getSku()}"]`);
    line.querySelector(".total__list--price").textContent = product.getTotalPrice() + currency;
    line.style.display = product.getUnits() === 0 ? "none" : "flex"; ///aqui falla !!
    const pf = document.getElementById("finalPrice");
    pf.textContent = webShpCart.calcTotalCheckout() + currency;
}

// Function to handle the input event on the product list.
const inputHandler = (ev) => {
    const target = ev.target;
    const sku = target.dataset.id;
    const limit = webShpCart.getLimit();
    if (sku !== undefined) {
        target.value = target.value > limit ? limit : target.value;
        const product = webShpCart.findProduct(sku);
        product.setUnits(target.value);
        updateShpCartUI(target, product);
    }
}

// Function to handle the click event on the product list.
const listClickHandler = (ev) => {
    const target = ev.target;
    const sku = target.dataset.id;
    if (sku !== undefined) {
        const text = target.textContent;
        const product = webShpCart.findProduct(sku);
        if (text === "+" || text === "-") {
            if (text === "+") {
                if (product.getUnits() < webShpCart.getLimit()) {
                    product.setUnits(product.getUnits() + 1);
                }
            } else {
                product.setUnits(product.getUnits() - 1);
            }
            updateShpCartUI(target, product);
        }
    }
}

// Function to get the html of the product list item.
const getListItem_HTML = (product, reference) => {
    return `<li class="list__item">
                <div class="list__item--product ">
                    <div class="bigger">${product.getTitle()}</div>
                    <div class="small">Ref: ${reference}</div>
                </div>
                <div class="list__item--controls"> 
                <button class="list__item--button" data-id="${reference}">-</button>
                <input class="list__item-input" type="text" value="${product.getUnits()}" data-id = "${reference}">
                <button class="list__item--button" data-id = "${reference}">+</button>
                </div>
                <div class="list__item--units"> ${product.getPrice()}${currency}</div>
                <div class="list__item--total"> ${product.getTotalPrice()}${currency} </div>
            </li>`;
}

// Function to get the html of the total list item.
const getTotalItem_HTML = (product) => {
    return `<li class="total__list" data-id="${product.getSku()}">
                <div>${product.getTitle()} </div>
                <div class="total__list--price"> ${product.getTotalPrice()}${currency}</div>
            </li>`;
}

// Function to get the html of the total checkout
const getFinalPrice_HTML = () => {
    return `<li class="total__list total__divider > </li>
            <li class="total__checkout" >
                <div>TOTAL </div>
                <div class="total__checkout--price" id="finalPrice"> ${webShpCart.calcTotalCheckout()}${currency}</div>
            </li>`;
}
// Function add the products elements in the DOM.
const showProducts = (products) => {
    const listItemParent = document.getElementById("listUl");
    const totalItemParent = document.getElementById("totalUl");
    products.forEach(itemC => {
        const reference = itemC.getSku();
        listItemParent.innerHTML += getListItem_HTML(itemC, reference);
        totalItemParent.innerHTML += getTotalItem_HTML(itemC, reference);
    });
    totalItemParent.innerHTML += getFinalPrice_HTML();
    listItemParent.addEventListener("click", listClickHandler);
    listItemParent.addEventListener("input", inputHandler);
}

// creating instance of the shopping cart
const webShpCart = new ShoppingCart();
let currency = "";

document.addEventListener('DOMContentLoaded', () => {
    fetch("https://jsonblob.com/api/jsonBlob/1325534155387363328").then(res => res.json()).then(data => {
        loadShopCart(data);
        currency = webShpCart.getCurrency();;
        const listContainer = document.getElementById("list");
        const totalContainer = document.getElementById("total");
        const productList = webShpCart.getProductList();
        showProducts(productList);
    });
});



