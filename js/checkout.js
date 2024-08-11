const showSummary = (elem) => {
    const currentStatus = elem.getAttribute("aria-expanded");
    (currentStatus === "false") ? elem.setAttribute("aria-expanded", "true") : elem.setAttribute("aria-expanded", "false")
}