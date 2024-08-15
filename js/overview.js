const ADD_TO_CART_BTN = document.querySelector(".add-to-cart ");
const overviewWindow = document.querySelector("[data-overview-open]");
const addedToCartWindow = document.querySelector("[data-addedtocart-open]");


function closeWindow() {
    overviewWindow.setAttribute("data-overview-open", false);
    addedToCartWindow.setAttribute("data-addedtocart-open", false);
}


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

// Image slider
const main_image = document.querySelector(".overview-item .big-image img");
const small_images = document.querySelectorAll(".overview-item .small-images img");
let currentIndex = 0;

const changeImage = (btn, elem) => {
    if(btn === "left" && currentIndex > 0) currentIndex--; 
    if(btn === "right" && currentIndex < small_images.length - 1) currentIndex++;
    let currentImage = document.querySelector(`[data-i='${currentIndex}']`);
    let imgSrc = currentImage.src;

    main_image.src = imgSrc;

    
    if(btn === "direct") {
        main_image.src = elem.src;
        currentIndex = Number(elem.getAttribute("data-i"))
        currentImage = document.querySelector(`[data-i='${currentIndex}']`);
    
    }
    small_images.forEach(img => {img.classList.remove("active")})
    currentImage.classList.add("active");    
}

// Scale overview main image on mouse move
const scaleImage = (e) => {
    let x = e.offsetX;
    let y = e.offsetY;
    main_image.style.transformOrigin = `${x}px ${y}px`
}
main_image.addEventListener("mousemove", scaleImage)
main_image.addEventListener("touchmove", scaleImage)