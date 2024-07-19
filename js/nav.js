// Topbar cart hide and show function ______________________________________________//
const COLLAPSE_ATTRIBUTE = document.querySelectorAll("[data-collapse]");

COLLAPSE_ATTRIBUTE.forEach(c => {
    c.addEventListener("mouseover", () => {
        c.setAttribute("data-collapse", "false")
    })
    c.addEventListener("mouseout", () => {
        c.setAttribute("data-collapse", "true")
    })
})
// _________________________________________________________________________________________ //

// Show search bar when search icon is clicked ________________________________________ //
const SEARCH_ICON_BTN = document.querySelector(".right-float button");
const MOBILE_NAV= document.querySelector(".mobile-navigation");

SEARCH_ICON_BTN.addEventListener("click", () => {
    const SEARCH_BAR = document.querySelector(".right-float .search-bar");
    let searchBarStatus = SEARCH_BAR.getAttribute("data-clicked");
    if (searchBarStatus === "true") {

        MOBILE_NAV.setAttribute("data-search-clicked", "false")
        SEARCH_BAR.setAttribute("data-clicked", "false")
    } else {
        MOBILE_NAV.setAttribute("data-search-clicked", "true")
        SEARCH_BAR.setAttribute("data-clicked", "true")
    }
    console.log("Working")
})

// Mobile Navigation display animation ___________________________________________________//
const HAM_ICON = document.querySelector(".hamburger-icon-btn");
const CROSS_ICON = document.querySelector(".nav-item > .close-btn");
const MOBILE_NAV_ITEM_LIST = document.querySelector(".mobile-navigation .nav-items");
const MOBILE_NAV_OVERLAY = document.querySelector(".mobile-navigation .nav-overlay")

HAM_ICON.addEventListener("click", () => {
    MOBILE_NAV_ITEM_LIST.style.animation = "swipeRight 200ms ease-in forwards";
    MOBILE_NAV_OVERLAY.style.animation = "fadeIn 200ms ease-in forwards";
    document.querySelector("body").style.overflow = "hidden";
})
CROSS_ICON.addEventListener("click", () => {
    MOBILE_NAV_ITEM_LIST.style.animation = "swipeLeft 200ms ease-in forwards";
    MOBILE_NAV_OVERLAY.style.animation = "fadeOut 200ms ease-in forwards";
})
