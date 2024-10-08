// Image slider
const main_image = document.querySelector(".product-page > .product > .item-image > .big-image > img");
const small_images = document.querySelectorAll(".product-page > .product > .item-image > .small-images > img");
let currentIndex = 0;

const changeImage = (btn, elem) => {
    if(btn === "left" && currentIndex > 0) currentIndex--; 
    if(btn === "right" && currentIndex < small_images.length - 1) currentIndex++;
    const currentImage = document.querySelector(`.product-page .product [data-i='${currentIndex}']`);
    console.log(currentIndex)
    const imgSrc = currentImage.src;

    main_image.src = imgSrc;

    console.log(elem)
    small_images.forEach(img => {img.classList.remove("active")})
    if(btn === "direct") {
        main_image.src = elem.src;
        currentIndex = Number(elem.getAttribute("data-i"))
        elem.classList.add("active");    
    }
}

// Scale overview main image on mouse move
const scaleImage = (e) => {
    let x = e.offsetX;
    let y = e.offsetY;
    main_image.style.transformOrigin = `${x}px ${y}px`
}
main_image.addEventListener("mousemove", scaleImage)
main_image.addEventListener("touchmove", scaleImage)

// Increment decrement quantity
    const qtyInput = document.querySelector(".product-page > .product #qty");
    const minus = document.querySelector(".product-page > .product .item-info .qty .minus");
    const plus = document.querySelector(".product-page > .product .item-info .qty .plus");
    const changeQty = (symbol) => {
        const max = Number(qtyInput.max);
        if(symbol === "plus" && qtyInput.value < max) {
            qtyInput.value++;
        }
        if(symbol === "minus" && qtyInput.value > 1) {
            qtyInput.value--;
        }

    }