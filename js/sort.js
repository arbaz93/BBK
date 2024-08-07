const sort = document.querySelector(".sort")
const sortHeading = document.querySelector(".sort > .h > p");
const sortOptions = document.querySelectorAll(".sort > .sort-options > button");

sortOptions.forEach(option => {
    option.addEventListener("click", () => {
        sortHeading.innerHTML = option.getAttribute("data-value");

        console.log(option.getAttribute("data-value"))
    })
})