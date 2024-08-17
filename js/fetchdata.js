export {retrieveData, displayOverviewWindow, setItemToSessionStorage};
const retrieveData = async () => {
    const request = await fetch("json/prodData.json");
    const response = await request.json();

    localStorage.setItem("total-items", response.length)
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
    const addCartBtn = document.querySelector(".overview-item .add-to-cart");
    const buyNowBtn =  document.querySelector(".overview-item .buy-now");
    
    let selectedElem = data.filter(i => i.id == itemId)[0];
    buyNowBtn.setAttribute("data-value", selectedElem.id)
    mainImage.src = selectedElem["main image"];
    subImages.forEach((image, i) => {
        image.src = selectedElem['sub images'][i]
    });
    name.innerHTML = selectedElem.name;
    price.innerHTML = "Rs." + selectedElem.price;
    sizes.innerHTML = "";
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
    addCartBtn.setAttribute("data-value", selectedElem.id)

    
}
const categoriesPage = document.querySelector("#categories_page");
const homePage = document.querySelector("#homepage");
const productPage = document.querySelector("#product_page");
const shoppingBagPage = document.querySelector("#product_page");

function setItemToSessionStorage(location, data) {
    let arr = [];
    if (sessionStorage.getItem(location) != undefined) {
        let d = JSON.parse(sessionStorage.getItem(location));
        d.forEach(e => {
            arr.push(e)
        });
    }
    const productPage = document.querySelector(".product-page");
    let newD;

    if (categoriesPage != undefined || homePage != undefined) {
        newD = {
            "id": data.id,
            "name": data.name,
            "main image": data["main image"],
            "size": document.querySelector(".overview-item > .item-info #size").value ,
            "color": document.querySelector(".overview-item > .item-info #color").value,
            "type": data.type,
            "price": data.price,
            "total qty": document.querySelector(".overview-item > .item-info input#qty").value,
        };
    } 
    if(productPage != undefined) {
        newD = {
            "id": data.id,
            "name": data.name,
            "main image": data["main image"],
            "size": document.querySelector(".product-page > .product > .item-info > .item-options > #size").value,
            "color": document.querySelector(".product-page > .product > .item-info > .item-options > #color").value,
            "type": data.type,
            "price": data.price,
            "total qty": document.querySelector(".product-page > .product .item-info input#qty").value,
        };
    } 
    if(shoppingBagPage != undefined) {
        newD = {
            "id": data.id,
            "name": data.name,
            "main image": data["main image"],
            "size": document.querySelector(".product-page > .product > .item-info > .item-options > #size").value,
            "color": document.querySelector(".product-page > .product > .item-info > .item-options > #color").value,
            "type": data.type,
            "price": data.price,
            "total qty": document.querySelector(".product-page > .product .item-info input#qty").value,
        };
    } 
        arr.push(newD)
    sessionStorage.setItem(location, JSON.stringify(arr))
}