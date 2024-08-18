const showSummary = (elem) => {
    const currentStatus = elem.getAttribute("aria-expanded");
    (currentStatus === "false") ? elem.setAttribute("aria-expanded", "true") : elem.setAttribute("aria-expanded", "false")
}
const cartItems = JSON.parse(sessionStorage.getItem("cart"));

// Show cart items
function appendCartItemsInCheckoutPage() {
    const orderSummary = document.querySelector(".order-summary .cart-items");
    let totalPrice = 0;

    if (cartItems != undefined && cartItems != "" && cartItems != []) {
        cartItems.forEach(item => {
            const temp = `<div class="item">
                    <div class="image">
                        <p class="qty">${item['total qty']}</p>
                        <img src="${item['main image']}" alt="${item['main image']}">
                    </div>
                    <div class="info">
                        <p class="name">${item.name}</p>
                        <p><span class="size">${item.size}</span> / <span class="color">${item.color}</span></p>
                    </div>
                    <div class="price">
                        <p>Rs.${item.price}</p>
                    </div>
                </div>`;
            totalPrice = totalPrice + (item.price * Number(item["total qty"]))
            orderSummary.innerHTML += temp;
        });
        orderSummary.innerHTML += `<div class="total">
                    <p>
                        <span>Total : </span>
                        <span class="price">Rs ${totalPrice}</span>
                    </p>
                </div>`
    }
}
appendCartItemsInCheckoutPage();

// collecting data from cart and putting it in form
let order = document.getElementById("order");

cartItems.forEach(item => {
    order.innerHTML += JSON.stringify(item, null, 2);
})