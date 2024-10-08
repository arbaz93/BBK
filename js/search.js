import { fileData } from "./appendData.js";
let documents = [];
var idx;
function searchQuery(query) {
    if (fileData.length > 0 && documents.length === fileData.length) {
        let newSearch = idx.search(query);
        return newSearch.map(item => documents.find(doc => item.ref == doc.id))
    }
}
function displaySearch() {
    const query = getParameterByName('search');;
    let searchResult = searchQuery(query);
    document.querySelector(".heading > h2").innerHTML = "Search: " + query;
    if (searchResult.length === 0) {
        document.querySelector(".heading > h2").innerHTML = query + " could not be found";    
        return;
    }
    appendSearchData(searchResult)
}
// This function will append html containing product data into the page
const appendSearchData = (data) => {
    const productsGrid = document.querySelector(".now-available .search-result");
    data.forEach((product, i) => {
        const template = `<article class="product" data-product-id="${product.id}">
                    <div class="product-img">
                        <img src="${product["main image"]}" alt="${product.name} image">
                    </div>
                    <div class="product-data">
                        <div class="product-info">
                            <p class="name">${product.name}</p>
                            <p class="price">Rs.${product.price}</p>
                        </div>
                        <div class="product-view">
                            <div class="cart" title="Add to cart" data-product-id="${product.id}">
                                <svg data-product-id="${product.id}" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 475.084 475.085" style="enable-background:new 0 0 475.084 475.085;"
                                    xml:space="preserve" >
                                    <g>
                                        <g>
                                            <path data-product-id="${product.id}" d="M365.446,401.998c0,10.092,3.579,18.702,10.711,25.834c7.132,7.139,15.749,10.711,25.845,10.711
			c10.081,0,18.698-3.572,25.83-10.711c7.139-7.132,10.711-15.742,10.711-25.834s-3.568-18.702-10.711-25.841
			c-7.132-7.132-15.749-10.704-25.83-10.704c-10.096,0-18.713,3.572-25.845,10.704C369.025,383.296,365.446,391.906,365.446,401.998
			z" />
                                            <path data-product-id="${product.id}" d="M469.658,78.51c-3.618-3.617-7.898-5.426-12.848-5.426H113.918c-0.193-1.331-0.621-3.756-1.287-7.277
			c-0.666-3.523-1.188-6.329-1.569-8.425c-0.383-2.087-1.093-4.611-2.142-7.561c-1.047-2.952-2.284-5.286-3.711-6.995
			c-1.425-1.718-3.328-3.189-5.708-4.43c-2.378-1.233-5.092-1.853-8.136-1.853H18.276c-4.952,0-9.234,1.812-12.85,5.424
			C1.809,45.583,0,49.868,0,54.816s1.809,9.231,5.426,12.847c3.619,3.617,7.902,5.424,12.85,5.424h58.237l50.532,234.976
			c-0.378,0.76-2.329,4.373-5.852,10.848c-3.521,6.475-6.328,12.135-8.42,16.988c-2.093,4.859-3.14,8.616-3.14,11.279
			c0,4.948,1.809,9.232,5.424,12.854c3.621,3.606,7.902,5.421,12.851,5.421h18.272h255.815h18.261c4.948,0,9.232-1.814,12.847-5.421
			c3.62-3.621,5.427-7.905,5.427-12.854c0-4.949-1.807-9.233-5.427-12.847c-3.614-3.614-7.898-5.428-12.847-5.428h-262.66
			c4.57-9.138,6.854-15.222,6.854-18.268c0-1.909-0.238-4.004-0.715-6.283s-1.047-4.805-1.713-7.569
			c-0.667-2.752-1.093-4.799-1.283-6.133l298.077-34.831c4.753-0.575,8.658-2.614,11.703-6.14c3.046-3.518,4.565-7.562,4.565-12.133
			V91.363C475.082,86.415,473.278,82.132,469.658,78.51z" />
                                            <path data-product-id="${product.id}" d="M109.632,401.998c0,10.092,3.567,18.702,10.706,25.834c7.141,7.139,15.75,10.711,25.841,10.711
			c10.085,0,18.699-3.572,25.835-10.711c7.139-7.132,10.71-15.742,10.71-25.834s-3.568-18.702-10.71-25.841
			c-7.137-7.132-15.75-10.704-25.835-10.704c-10.09,0-18.704,3.572-25.841,10.704C113.203,383.296,109.632,391.906,109.632,401.998z
			" />
                                        </g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                    <g>
                                    </g>
                                </svg>
                            </div>
                            <div class="magni-glass" title="Overview" data-product-id="${product.id}">
                                <?xml version="1.0" encoding="UTF-8" standalone="no"?> <svg
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" data-product-id="${product.id}">
                                    <g id="Layer_2" data-name="Layer 2">
                                        <g id="Layer_1-2" data-name="Layer 1">
                                            <path class="cls-1"
                                                d="M63.22,59.45,47.3,43.53a26.7,26.7,0,1,0-3.77,3.77L59.45,63.22a2.67,2.67,0,0,0,3.77-3.77ZM26.67,48A21.34,21.34,0,1,1,48,26.67,21.36,21.36,0,0,1,26.67,48Z" />
                                        </g>
                                    </g>
                                </svg>

                            </div>
                        </div>
                    </div>
                </article>`;
                    productsGrid.innerHTML += template;
    });
}
const interval = setInterval(() => {
    documents = [...fileData]
    if(getParameterByName("search") == undefined || getParameterByName("search") == "") {
        document.querySelector(".heading > h2").innerHTML = "Query is undefined";    
        clearInterval(interval)
    }
    if (fileData.length > 0 && documents.length === fileData.length && lunr != undefined) {
        idx = lunr(function () {
            this.field('name')
            this.field('description')
            this.field('type')
            documents.forEach(function (doc) {
                this.add(doc)
            }, this)
        });

        displaySearch()
        clearInterval(interval)
    }
})
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}