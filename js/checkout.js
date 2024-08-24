const showSummary = (elem) => {
    const currentStatus = elem.getAttribute("aria-expanded");
    (currentStatus === "false") ? elem.setAttribute("aria-expanded", "true") : elem.setAttribute("aria-expanded", "false")
}
const cartItems = JSON.parse(sessionStorage.getItem("cart"));
const phoneNumber = '03187199492';
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
                        <span class="price">Rs ${totalPrice}.00</span>
                    </p>
                </div>`
        document.querySelector(".order-summary .right-side.total-price").innerHTML = "Rs " + totalPrice + ".00"
    }
}
appendCartItemsInCheckoutPage();

// collecting data from cart and putting it in form
let order = document.getElementById("order");

if (cartItems != null && cartItems != undefined) {

cartItems.forEach(item => {
    order.innerHTML += JSON.stringify(item, null, 2);
})
}

// Make qr code
function generateQrCode(qrContent) {
    return new QRCode(document.getElementById("qr-code"), {
      text: qrContent,
      width: 256,
      height: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
}

function encodeTextToUrl(text) {
    return encodeURI(text);
}
function filterCart(items) {
    let arr = [];
    items.map(item => {
        arr.push(
            {
                id: item.id,
                name: item.name,
                size: item.size,
                color: item.color,
                price: item.price
            }
        )
    })
    return arr;
}
const qrcodeLink = document.querySelector(".qr-code a");
if (cartItems == null || cartItems == undefined || cartItems == "" || cartItems == []) {
    generateQrCode(`https://wa.me/${phoneNumber}/?text=Hi`);
    qrcodeLink.href = `https://wa.me/${phoneNumber}/?text=Hi`;
} else {
    qrcodeLink.href = `https://wa.me/${phoneNumber}/?text=${encodeTextToUrl(JSON.stringify(filterCart(cartItems)))}`;
    generateQrCode(`https://wa.me/${phoneNumber}/?text=${encodeTextToUrl(JSON.stringify(filterCart(cartItems)))}`)
}