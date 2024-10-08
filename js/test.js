import { fileData as data } from './appendData.js'
import { displayOverviewWindow, setItemToSessionStorage } from './fetchdata.js';
const addCartBtn = document.querySelector(".overview-item .add-to-cart");
const categoriesPage = document.querySelector("#categories_page");
const homePage = document.querySelector("#homepage");
const productPage = document.querySelector("#product_page");
const shoppingBagPage = document.querySelector("#product_page");

// Function to set event globally
function addGlobalEventListener(type, selector, callback, parent = document) {
    parent.addEventListener(type, e => {
        if (e.target.matches(selector)) {
            callback(e)
        }
    })
}


// This function will set the item that the users has added to cart and show the confirmation message
function getAddItemData() {
    const itemClickedId = addCartBtn.getAttribute("data-value");
    let itemClickedData = data.filter(d => d.id == itemClickedId)[0];
    // #############################################
    setItemToSessionStorage("cart", itemClickedData)
    //############################################## 
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

// This function will append items into cart in topbar nav
function addToCart() {
    const cartItems = getSessionItems("cart");
    const cart = document.querySelector(".top-bar .cart-section > .cart-items > .items");
    let totalPrice = 0;
    if (cartItems != undefined && cartItems != undefined && cartItems != '') {
        cartItems.map(item => { totalPrice += item.price * item['total qty'] })
    }
    document.querySelector(".top-bar .shopping-options > .subtotal > .price").innerHTML = "Rs." + totalPrice;
    document.querySelector(".top-bar .cart-section .total-price-cart-icon").innerHTML = totalPrice;
    cart.innerHTML = "";
    // Add events to delete btn
    // ##########################

    if (cartItems != undefined) {
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
            btn.addEventListener("click", (e) => { deleteItemfromSession("cart", e) })
        })
        document.querySelector(".top-bar .cart-section > .total-items-in-cart").innerHTML = cartItems.length;
        document.querySelector(".navigation .total-items-in-cart").innerHTML = cartItems.length;
    }

}
addToCart()

// This function is self explanatory
function getSessionItems(location) {
    return JSON.parse(sessionStorage.getItem(location))
}

// This function take id and location to search for item and delete it from session storage
function deleteItemfromSession(location, itemId) {
    let data = JSON.parse(sessionStorage.getItem(location));
    let id = itemId.srcElement.getAttribute("data-index");

    let arr = JSON.stringify(data.filter((item, i) => i != id))
    sessionStorage.setItem(location, arr);
    addToCart();
}




// If product link is clicked the function will save that products id in local storage
const productLinkClicked = (item) => {
    const id = item.getAttribute("data-product-id");
    localStorage.setItem("product-id", id)
}
// This function will take us to product.html page
const productPageRedirect = () => {
    window.location.href = "product.html";
}

// Function to add items to cart in product.html page
const addToCartBtnInProductPage = document.querySelector(".product-page > .product > .item-info .add-to-cart");
const buyNowBtnInProductPage = document.querySelector(".product-page > .product > .item-info .buy-now");
const buyNowBtnInOverview = document.querySelector(".overview-item .buy-now");
function getAddItemDataInProductPage(btn) {
    const itemClickedId = btn.getAttribute("data-value");
    let itemClickedData = data.filter(d => d.id == itemClickedId)[0];
    setItemToSessionStorage("cart", itemClickedData)

    addToCartInProductPage();
}
function addToCartInProductPage() {
    const cartItems = getSessionItems("cart");
    const cart = document.querySelector(".top-bar .cart-section > .cart-items > .items");
    let totalPrice = 0;
    if (cartItems != undefined) {
        cartItems.map(item => { totalPrice += item.price * item['total qty'] })
    }
    document.querySelector(".top-bar .shopping-options > .subtotal > .price").innerHTML = "Rs." + totalPrice;
    document.querySelector(".top-bar .cart-section .total-price-cart-icon").innerHTML = totalPrice;
    cart.innerHTML = "";
    // Add events to delete btn
    // ##########################

    if (cartItems != undefined) {
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
        if (document.querySelector("#product_page") != undefined) {

            addToCartBtnInProductPage.classList.add("added");
            addToCartBtnInProductPage.innerText = "Item added";
            setTimeout(() => {
                addToCartBtnInProductPage.classList.remove("added");
                addToCartBtnInProductPage.innerText = "add to cart";
            }, 2000)
        }

        let deleteItemFromCartBtn = document.querySelectorAll(".top-bar .cart-section > .cart-items > .items > .cart-item > .delete-btn");
        deleteItemFromCartBtn.forEach(btn => {
            btn.addEventListener("click", (e) => { deleteItemfromSession("cart", e) })
        })
        document.querySelector(".top-bar .cart-section > .total-items-in-cart").innerHTML = cartItems.length;
    }
    document.querySelector(".navigation .total-items-in-cart").innerHTML = cartItems.length;

}
function addToCartAndRedirectToCheckout(btn) {
    getAddItemDataInProductPage(btn);
    location.href = "checkout.html"
}


function displayCartItemsInShoppingBagPage() {
    let cartItems = getSessionItems("cart");
    const bag = document.querySelector(".shopping-bag-items > .bag-items");
    let totalPrice = 0;
    bag.innerHTML = "";
    cartItems.forEach((item, i) => {
        const temp = `<div class="item" data-product-id="${item.id}"">
                    <div class="image" data-product-id="${item.id}">
                        <img src="assets/images/product images/article 1.jpg" alt="">
                    </div>
                    <div class="name" data-product-id="${item.id}"><p>${item.name} - <span class="size">${item.size}</span> / <span class="color">${item.color}</span></p></div>
                    <div class="quantity"><input type="number" name="qty" id="qty" value="${item["total qty"]}" readonly></div>
                    <div class="unit-price"><p>Rs.${item.price}</p></div>
                    <div class="total-price"><p>Rs.${item.price * Number(item["total qty"])}</p></div>
                    <button class="delete-btn" data-value=${item.id} data-index="${i}">
                        <svg class="cross-icon" version="1.1" id="cross-11" xmlns="http://www.w3.org/2000/svg" width="11px"
                        height="11px" viewBox="0 0 11 11" data-value=${item.id} data-index="${i}">
                        <path
                            d="M2.2,1.19l3.3,3.3L8.8,1.2C8.9314,1.0663,9.1127,0.9938,9.3,1C9.6761,1.0243,9.9757,1.3239,10,1.7&#xA;&#x9;c0.0018,0.1806-0.0705,0.3541-0.2,0.48L6.49,5.5L9.8,8.82C9.9295,8.9459,10.0018,9.1194,10,9.3C9.9757,9.6761,9.6761,9.9757,9.3,10&#xA;&#x9;c-0.1873,0.0062-0.3686-0.0663-0.5-0.2L5.5,6.51L2.21,9.8c-0.1314,0.1337-0.3127,0.2062-0.5,0.2C1.3265,9.98,1.02,9.6735,1,9.29&#xA;&#x9;C0.9982,9.1094,1.0705,8.9359,1.2,8.81L4.51,5.5L1.19,2.18C1.0641,2.0524,0.9955,1.8792,1,1.7C1.0243,1.3239,1.3239,1.0243,1.7,1&#xA;&#x9;C1.8858,0.9912,2.0669,1.06,2.2,1.19z" />
                        </svg>
                    </button>
                </div>`
                totalPrice += item.price * Number(item["total qty"])
        bag.innerHTML += temp;

    })
    document.querySelector(".shopping-next .total-price span").innerHTML = "Rs." + totalPrice
    let deleteBtns = document.querySelectorAll("#shoppingbag_page .item .delete-btn");
    deleteBtns.forEach(btn => {
        btn.addEventListener("click", (e) => { deleteItemfromSession("cart", e), displayCartItemsInShoppingBagPage() })
    })
    let name = document.querySelectorAll("#shoppingbag_page .item .name");
    name.forEach(n => {
        n.addEventListener("click", (e) => { productLinkClicked(n); productPageRedirect() })
    })
    let img = document.querySelectorAll("#shoppingbag_page .item .image");
    img.forEach(ig => {
        ig.addEventListener("click", (e) => { productLinkClicked(ig); productPageRedirect() })
    })
}

// Declaring events when the page is not the specific product page
if (document.querySelector("#shoppingbag_page")) {
    displayCartItemsInShoppingBagPage();
}

// Declaring events when the page is not the specific product page
if (categoriesPage != undefined || homePage != undefined) {
    // Addtocart event btn 
    addGlobalEventListener("click", ".overview-item .add-to-cart", e => { getAddItemData() }, document.querySelector(".overview-item"))
    // Redirect to product page when clicked on cart icon below product
    addGlobalEventListener("click", ".product .cart", e => {
        productLinkClicked(e.target);
        productPageRedirect()
    })
    addGlobalEventListener("click", ".product .cart > svg", e => {
        productLinkClicked(e.target);
        productPageRedirect()
    })
    addGlobalEventListener("click", ".product .cart > svg path", e => {
        productLinkClicked(e.target);
        productPageRedirect()
    })
    // Setting events on overview button
    addGlobalEventListener("click", ".magni-glass", e => { displayOverviewWindow(e.target, data) })
    addGlobalEventListener("click", ".magni-glass > svg", e => { displayOverviewWindow(e.target, data) })

    buyNowBtnInOverview.addEventListener("click", () => {
        addToCartAndRedirectToCheckout(buyNowBtnInOverview);
    })
}
// Declaring events when the page is the specific product page
if (document.querySelector("#product_page") != undefined) {
    addToCartBtnInProductPage.addEventListener("click", () => {
        getAddItemDataInProductPage(addToCartBtnInProductPage);
        console.log("clicked")
    });
    buyNowBtnInProductPage.addEventListener("click", () => {
        addToCartAndRedirectToCheckout(buyNowBtnInProductPage);
    })
}