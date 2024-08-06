const PRELOADER = document.querySelector(".preloader");
const TIME = 2000;
window.addEventListener("load", function() {
    setTimeout(() => {
        PRELOADER.setAttribute("data-page-loaded", true);
    }, TIME)
}, false); 

// IE
window.attachEvent("onload", function() {
    // loaded
    setTimeout(() => {
        PRELOADER.setAttribute("data-page-loaded", true);
    }, TIME)
});