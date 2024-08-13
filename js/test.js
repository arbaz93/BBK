import {fileData as data, overviewBtns } from './appendData.js'
import { displayOverviewWindow, setItemToSessionStorage} from './fetchdata.js';
let btnUpdated = false;
const addCartBtn = document.querySelector(".overview-item .add-to-cart");


document.querySelector("body").addEventListener("click", () => {
    update()
})

function update() {
    if (overviewBtns != []) {
        if (!btnUpdated) {
            btnUpdated = true;
            overviewBtns.forEach(btn => {
                btn.addEventListener("click", () => {
                    displayOverviewWindow(btn, data)
                })
            })
        }

    }
}
function getAddItemData() {
    const itemClickedId =  addCartBtn.getAttribute("data-value");
    let itemClickedData = data.filter(d => d.id == itemClickedId)[0];
    setItemToSessionStorage("cart", itemClickedData)

    // CART WINDOWS DATA
    const cartProductImage = document.querySelector(".added-to-cart-confirmation-window > .left-side > .product-image > img");
    const cartProductName = document.querySelector(".added-to-cart-confirmation-window > .left-side > .product-name");
    const cartProductQty = document.querySelector(".added-to-cart-confirmation-window > .left-side > .product-qty > span");
    const cartProductPrice = document.querySelector(".added-to-cart-confirmation-window > .left-side > .product-total-price > span");
    cartProductImage.src = itemClickedData["main image"];
    cartProductName.innerHTML = itemClickedData["name"];
    const quantity = Number(document.querySelector(".overview-item > .item-info input#qty").value);
    cartProductQty.innerHTML = quantity;
    cartProductPrice.innerHTML = itemClickedData["price"] * quantity;

    let cartItems = getSessionItems("cart");
    const totalItems = document.querySelector(".added-to-cart-confirmation-window > .right-side .total-items > span");
    const totalPrice = document.querySelector(".added-to-cart-confirmation-window > .right-side .subtotal");
    let tp = 0;
    let ti = 0;

    (cartItems != undefined) ? cartItems.map(item => ti += Number(item["total qty"])) : ti = 1;
    (cartItems != undefined) ? cartItems.map(item => tp += item.price * item["total qty"]) : tp = itemClickedData["price"] * quantity;
    totalPrice.innerHTML = "Rs." + tp;
    totalItems.innerHTML = ti;
    addToCart();

    addedToCartWindow.setAttribute("data-addedtocart-open", true);
}
function addToCart() {
    const cartItems = getSessionItems("cart");
    const cart = document.querySelector(".top-bar .cart-section > .cart-items > .items");
    let totalPrice = 0;
    cartItems.map(item => {totalPrice += item.price * item['total qty']})
    document.querySelector(".top-bar .shopping-options > .subtotal > .price").innerHTML = "Rs." + totalPrice;
    document.querySelector(".top-bar .cart-section .total-price-cart-icon").innerHTML = totalPrice;
    cart.innerHTML = "";
    // Add events to delete btn
    // ##########################
    
    if(cartItems != undefined) {
        cartItems.map((item, i) => {
            const temp = `<div class="cart-item">
                                <div class="product-image">
                                    <img src="${item["main image"]}" alt="${item.name}">
                                </div>
                                <div class="product-info">
                                    <p class="product-name">${item.name}</p>
                                    <small class="product-requirement"><span class="product-size">${item.size}</span> / <span class="product-color">${item.color}</span></small>
                                    <p class="product-qty-and-price"><span class="qty">${item["total qty"]} x </span><span class="total-price">Rs.${Number(item["total qty"]) * item.price}</span></p>
                                </div>
                                <button class="delete-btn" data-value="${item.id}" data-index="${i}">
                                    <svg class="cross-icon" version="1.1" id="cross-11" xmlns="http://www.w3.org/2000/svg" width="11px"
                                        height="11px" viewBox="0 0 11 11" data-value="${item.id}" data-index="${i}">
                                        <path data-value="${item.id}" data-index="${i}"
                                            d="M2.2,1.19l3.3,3.3L8.8,1.2C8.9314,1.0663,9.1127,0.9938,9.3,1C9.6761,1.0243,9.9757,1.3239,10,1.7&#xA;&#x9;c0.0018,0.1806-0.0705,0.3541-0.2,0.48L6.49,5.5L9.8,8.82C9.9295,8.9459,10.0018,9.1194,10,9.3C9.9757,9.6761,9.6761,9.9757,9.3,10&#xA;&#x9;c-0.1873,0.0062-0.3686-0.0663-0.5-0.2L5.5,6.51L2.21,9.8c-0.1314,0.1337-0.3127,0.2062-0.5,0.2C1.3265,9.98,1.02,9.6735,1,9.29&#xA;&#x9;C0.9982,9.1094,1.0705,8.9359,1.2,8.81L4.51,5.5L1.19,2.18C1.0641,2.0524,0.9955,1.8792,1,1.7C1.0243,1.3239,1.3239,1.0243,1.7,1&#xA;&#x9;C1.8858,0.9912,2.0669,1.06,2.2,1.19z" />
                                    </svg>
                                </button>
                            </div>`
            cart.innerHTML += temp;
        })
        let deleteItemFromCartBtn = document.querySelectorAll(".top-bar .cart-section > .cart-items > .items > .cart-item > .delete-btn");
        deleteItemFromCartBtn.forEach(btn => {
            btn.addEventListener("click", (e) => {deleteItemfromSession("cart", e)})
        })
        document.querySelector(".top-bar .cart-section > .total-items-in-cart").innerHTML = cartItems.length;
    }

}
addToCart()
window.addEventListener("storage", addToCart)
function getSessionItems(location) {
    return JSON.parse(sessionStorage.getItem(location))
}

addCartBtn.addEventListener("click", () => {
    getAddItemData();
})

function deleteItemfromSession(location, itemId) {
    let data = JSON.parse(sessionStorage.getItem(location));
    let id = itemId.srcElement.getAttribute("data-index");

    let arr = JSON.stringify(data.filter((item, i) => i != id))
    sessionStorage.setItem(location, arr);
    addToCart();
}