/*
    Grab and store the value of global search field to be later used in the popup
    to show the relevant product with average prices.
 */
const search = document.getElementById("twotabsearchtextbox");

if (search && search.attributes.getNamedItem("value").value) {
    chrome.storage.local.set({
        search: <Message>{
            type: "productSearch", data: search.attributes.getNamedItem("value").value
        }
    })
}

// Recursively scrape the product search page for all the items.
scrapeProducts(document.children)

function scrapeProducts(elements: HTMLCollection) {
    const children = Array.from(elements)

    const scrapedProducts = children.map((c) => {
        if (c.hasAttribute('data-asin')) {
            return scrapeProductDetails(c)
        }

        if (c.hasChildNodes()) {
            scrapeProducts(c.children)
        }
    }).filter((p) => p !== undefined)

    if (scrapedProducts.length) {
        chrome.runtime.sendMessage(<Message>{type: "syncScrapedProducts", data: scrapedProducts});
    }
}

function scrapeProductDetails(e: Element): ScrapedProductDetails {
    if (e.hasAttribute('data-asin') && e.attributes.getNamedItem('data-asin').value === "") {
        return
    }

    const asin = e.attributes.getNamedItem('data-asin').value
    const imageUrl = getProductImage(e)
    const name = getProductName(e)
    const price = getProductPrice(e)

    if ([asin, name, imageUrl, price].some((v) => v === undefined)) {
        return
    }

    return <ScrapedProductDetails>{asin, imageUrl, name, price};
}

// Recursively traverse the dom element of the product details to find the first <img> tag.
function getProductImage(element: Element): string {
    if (element.tagName === "IMG" && element.attributes.getNamedItem("alt").value !== "") {
        return element.attributes.getNamedItem("src").value
    }

    const imagesUrls = Array.from(element.children).map((n) => {
        return getProductImage(n)
    })

    return imagesUrls.find((e) => e !== undefined)
}

// Recursively traverse the dom element of the product details to find the first <span> tag with specific css class.
function getProductName(element: Element): string {
    if (element.tagName === "SPAN" && element.classList.contains("a-color-base") && element.classList.contains("a-text-normal")) {
        return element.textContent
    }

    const names = Array.from(element.children).map((n) => {
        return getProductName(n)
    })

    return names.find((e) => e !== undefined)
}

// Recursively traverse the dom element of the product details to find the first <span> tag with "a-price" css class.
function getProductPrice(element: Element) {
    if (element.tagName === "SPAN" && element.classList.contains("a-price")) {
        return element.firstElementChild.textContent
    }

    const prices = Array.from(element.children).map((n) => {
        return getProductPrice(n)
    })

    return prices.find((e) => e !== undefined)
}