const ADD_TO_CART_BTN = document.querySelector(".add-to-cart ");
const overviewWindow = document.querySelector("[data-overview-open]");
const addedToCartWindow = document.querySelector("[data-addedtocart-open]");

function displayCartConfirmationWindow() {
    addedToCartWindow.setAttribute("data-addedtocart-open", true);
}
function closeWindow() {
    overviewWindow.setAttribute("data-overview-open", false);
    addedToCartWindow.setAttribute("data-addedtocart-open", false);
}

ADD_TO_CART_BTN.addEventListener("click", displayCartConfirmationWindow)

// Increament decrement qty
let qtyInput = document.querySelector(".qty > #qty");
let plusBtn = document.querySelector(".qty > .plus");
let minusBtn = document.querySelector(".qty > .minus")
function qtyChange(symbol) {
    let currentValue = qtyInput.value;

    if (Number(currentValue) > 20) {
        qtyInput.value = 20
        return
    };
    if (Number(currentValue) <= 0) {
        qtyInput.value = 1
        return
    };

    if (symbol === "plus") qtyInput.value = Number(currentValue) + 1;
    else qtyInput.value = Number(currentValue) - 1;

}
plusBtn.addEventListener("click", () =>{qtyChange("plus")})
minusBtn.addEventListener("click", () => qtyChange("minus"))