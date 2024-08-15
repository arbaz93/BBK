const footerLinks = document.querySelectorAll("footer .categories .types > a");
const navLinks = document.querySelectorAll(".navigation > .nav-items > .nav-item > a");
const categoriesLinks = document.querySelectorAll(".Items-with-categories > .categories > .categorie-item a")
const allLinks = [...footerLinks, ...navLinks, ...categoriesLinks]

allLinks.forEach(link => {
    link.addEventListener("click", function(event){
        event.preventDefault();
        lastLinkClicked(link);

        window.location.href = "categories.html";
      });
})
const lastLinkClicked = (item) => {
    const id = item.getAttribute("data-value");

    localStorage.setItem("route", id)
}



if(window.performance.navigation && window.performance.navigation.type === 1) localStorage.setItem("route", "")
