export {retrieveData, displayOverviewWindow};
const retrieveData = async () => {
    const request = await fetch("json/prodData.json");
    const response = await request.json();

    return response;
} 
function displayOverviewWindow(item, data) {
    let itemId = item.getAttribute("data-product-id");
    const mainImage = document.querySelector(".overview-item > .item-image > .big-image > img");
    const subImages = document.querySelectorAll(".overview-item > .item-image > .small-images > img");
    const name = document.querySelector(".overview-item > .item-info > .item-name");
    const price = document.querySelector(".overview-item > .item-info > .item-price");
    const sizes = document.querySelector(".overview-item > .item-info #size");
    const colors = document.querySelector(".overview-item > .item-info #color");
    const qty = document.querySelector(".overview-item > .item-info .qty > #qty");

    
    let selectedElem = data.filter(i => i.id == itemId)[0];
    console.log(selectedElem)
    mainImage.src = selectedElem["main image"];
    subImages.forEach((image, i) => {
        image.src = selectedElem['sub images'][i]
    });
    name.innerHTML = selectedElem.name;
    price.innerHTML = selectedElem.price;
    sizes.innerHTML = ""
    selectedElem["sizes"].forEach((size, i) => {
        let temp = `<option value="${size}">${size}</option>`;
        sizes.innerHTML += temp
    })
    colors.innerHTML = ""
    selectedElem["colors"].forEach((color, i) => {
        let temp = `<option value="${color}">${color}</option>`;
        colors.innerHTML += temp
    })
    qty.value = 1;
    qty.max = selectedElem["total qty"]
    overviewWindow.setAttribute("data-overview-open", true);


    // CART WINDOWS DATA
    const cartProductImage = document.querySelector(".added-to-cart-confirmation-window > .left-side > .product-image > img");
    const cartProductName = document.querySelector(".added-to-cart-confirmation-window > .left-side > .product-name");
    const cartProductQty = document.querySelector(".added-to-cart-confirmation-window > .left-side > .product-qty > span");
    const cartProductPrice = document.querySelector(".added-to-cart-confirmation-window > .left-side > .product-total-price > span");
    cartProductImage.src = selectedElem["main image"];
    cartProductName.innerHTML = selectedElem["name"];
    cartProductQty.innerHTML = 1;
    cartProductPrice.innerHTML = selectedElem["price"];
}
