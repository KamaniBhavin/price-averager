console.log("Hello")

const search = document.getElementById("twotabsearchtextbox");
if (search && search.attributes.getNamedItem("value").value) {
    chrome.storage.local.set({
        search: <Message>{
            type: "productSearch", data: search.attributes.getNamedItem("value").value
        }
    })
}

const products = document.querySelector("#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row");


if (products !== null && products.children !== null) {
    const scrapedProducts = Array.from(products.children)
        .filter((p) => {
            return p.hasAttribute('data-asin') && p.attributes.getNamedItem('data-asin').value !== ""
        })
        .map((p) => {
            return <ScrapedProductDetails>{
                asin: p.attributes.getNamedItem('data-asin').value,
                imageUrl: getProductImage(p),
                name: getProductName(p),
                price: getProductPrice(p)
            }
        })
        .filter((p) => p.price !== undefined)

    chrome.runtime.sendMessage(<Message>{type: "syncScrapedProducts", data: scrapedProducts});
}

function getProductImage(element: Element): string {
    if (element.tagName === "IMG" && element.attributes.getNamedItem("alt").value !== "") {
        return element.attributes.getNamedItem("src").value
    }

    const imagesUrls = Array.from(element.children).map((n) => {
        return getProductImage(n)
    })

    return imagesUrls.find((e) => e !== undefined)
}

function getProductName(element: Element): string {
    if (element.tagName === "SPAN" && element.classList.contains("a-color-base") && element.classList.contains("a-text-normal")) {
        return element.textContent
    }

    const names = Array.from(element.children).map((n) => {
        return getProductName(n)
    })

    return names.find((e) => e !== undefined)
}

function getProductPrice(element: Element) {
    if (element.tagName === "SPAN" && element.classList.contains("a-price")) {
        return element.firstElementChild.textContent
    }

    const prices = Array.from(element.children).map((n) => {
        return getProductPrice(n)
    })

    return prices.find((e) => e !== undefined)
}