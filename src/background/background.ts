import {get, post} from "../utils/api";
import {date, toNumber} from "../utils/helpers";

chrome.runtime.onMessage.addListener((message: Message) => {
    if (message.type === "syncScrapedProducts") {
        message.data.forEach((scrapedProduct) => {
            // check if the product already exists with the same asin(unique value for each product).
            get<Product[]>(`asin=eq.${scrapedProduct.asin}`)
                .then((existingProducts) => {
                    if (!existingProducts.length) {
                        post<Product>({
                            "name": scrapedProduct.name,
                            "asin": scrapedProduct.asin,
                            "image_url": scrapedProduct.imageUrl,
                            "prices": [
                                {
                                    "on": new Date(),
                                    "price": toNumber(scrapedProduct.price)
                                }
                            ]
                        })
                        return
                    }

                    //scraping is done once per day for each product searched.
                    if (existingProducts[0].prices.some((p) => date(new Date(p.on)) === date(new Date()))) {
                        return
                    }

                    // update the price array of existing product with the price of the product for today.
                    existingProducts[0].prices.push({
                        "on": new Date(),
                        "price": toNumber(scrapedProduct.price)
                    })
                    post<Product>({
                        "id": existingProducts[0].id,
                        "name": scrapedProduct.name,
                        "asin": scrapedProduct.asin,
                        "image_url": scrapedProduct.imageUrl,
                        "prices": existingProducts[0].prices
                    })
                })
        })
    }
})


chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({"showOverlay": true})
        .then(() => console.log("✅ Successfully installed the plugin!"))
})