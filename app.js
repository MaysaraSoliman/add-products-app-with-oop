import { productsLocalstorageClass } from "./localstorage.js";
import { productsClass } from "./oop.js"

const productInput = document.querySelector(".product-input");
const priceInput = document.querySelector(".price-input");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".form");
const productsResultsContainer = document.querySelector(".products-list-container .results");
let productsList = [];
let productsLocalstorage = new productsLocalstorageClass(productsList);
const totalPrice = document.querySelector(".total-price");

function initialApp() {
    productsList = productsLocalstorage.getProductsFromLocalstorage();
    displayProducts(productsList);
}
initialApp();


function getProductsList() {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        putProductsInArray();
        productInput.value = "";
        priceInput.value = "";
    })
}

function putProductsInArray() {
    let products = new productsClass(productInput.value, priceInput.value);
    const productObj = products.getProductsObject();
    productsList.push(productObj);
    displayProducts(productsList);
    productsLocalstorage.addProductsToLocalstorage(productsList);
}

function displayProducts(productsList) {
    productsResultsContainer.innerHTML = "";
    if (productsList != "") {
        return productsList.forEach((product) => {
            productsResultsContainer.innerHTML += ` <div class="row text-center mb-2">
        <span class="col-4 p-2 border border-secondary">${product.title}</span>
        <span class="col-4 p-2 border border-secondary">${product.price}</span>
        <span
          class="remove-btn col-4 p-2 border border-secondary text-white"
          style="background-color: red; cursor: pointer;"
          data-id = "${product.id}"
          >Remove
        </span>
      </div>`
            addEvents();
            displayTotalPrice();
        })
    }
    return productsResultsContainer.innerHTML = ` <div class="row text-center mb-2">
        <span class="col-12 p-2 border border-secondary">There are no items, Try to add some.</span>
    </div>`

}
getProductsList()

function addEvents() {
    let removeBtns = document.querySelectorAll(".remove-btn");
    removeBtns.forEach((btn) => {
        btn.addEventListener("click", removeProduct)
    })
}

function removeProduct() {
    productsList = productsLocalstorage.deleteProductFromLocalstorage(productsList, this.dataset.id);
    displayProducts(productsList);
}

function calcTotalPrice() {
    let totalPrice = productsList.reduce((ac, red) => {
        return ac + red.price
    }, 0)
    return totalPrice;
}

function displayTotalPrice() {
    totalPrice.innerHTML = `Total Price: $${calcTotalPrice()}`
}

function searchProducts() {
    searchInput.addEventListener("keyup", () => {
        let searchValue = searchInput.value.trim();
        let productRegex = new RegExp(searchValue, "ig");
        // console.log(productRegex.test(product))
        let productSearchValue = productsList.filter((product) => {
            return productRegex.test(product.title) || productRegex.test(product.price)
        })
        displayProducts(productSearchValue);
    })
}
searchProducts()



