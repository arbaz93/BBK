// 
const HERO_SECTION_ARTICLE = document.querySelectorAll("#homepage > .hero > .item > article");
const HERO_SECTION_IMG = document.querySelectorAll("#homepage > .hero > .item > .img-body > img");

function setArticleHeight() {
    HERO_SECTION_ARTICLE.forEach((article, i) => {
        article.style.height = HERO_SECTION_IMG[i].clientHeight + "px";
    })
}
// __________________________ //
// Image Slider
// __________________________ //
const HERO_ITEMS = document.querySelectorAll(".hero > .item");
let count = 0;
let arrowClicked = false;

function imageItemSlider(arrow) {
    if (arrow != undefined) arrowClicked = true;
    if (arrow === "left" && count > -1) {count--}
    if (arrow === "left" && count === -1) {count = HERO_ITEMS.length - 1}
    if (arrow === "right" && count <= HERO_ITEMS.length) {count++}
    if (arrow === "right" && count === HERO_ITEMS.length) {count = 0}
    
    HERO_ITEMS.forEach((item, i) => {
        const ITEM_ID = item.getAttribute('data-slider-item-id');
        if (count == ITEM_ID) {
            item.setAttribute("data-slider-item-show", "true")
        } else {
            item.setAttribute("data-slider-item-show", "false")
        }
    })
 
    if (!arrowClicked) {
        if (count >= HERO_ITEMS.length - 1) {
            count = 0;
        } else {
            count++
        }
        setTimeout(imageItemSlider, 5000)
    }
}

window.addEventListener("load", function() {
    // loaded
    imageItemSlider();
    setArticleHeight();

}, false); 

// IE
window.attachEvent("onload", function() {
    // loaded
    imageItemSlider();
    setArticleHeight();
});