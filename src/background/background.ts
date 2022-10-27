import {post, get} from "../utils/api";
import {date, toNumber} from "../utils/helpers";

chrome.runtime.onMessage.addListener((message: Message) => {
    if (message.type === "syncScrapedProducts") {
        message.data.forEach((scrapedProduct) => {
            get<Product[]>(`asin=eq.${scrapedProduct.asin}`)
                .then((existingProduct) => {
                    if (!existingProduct.length || existingProduct[0].id === null) {
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

                    if (existingProduct[0].prices.some((p) => date(new Date(p.on)) === date(new Date()))) {
                        return
                    }

                    existingProduct[0].prices.push({
                        "on": new Date(),
                        "price": toNumber(scrapedProduct.price)
                    })
                    post<Product>({
                        "id": existingProduct[0].id,
                        "name": scrapedProduct.name,
                        "asin": scrapedProduct.asin,
                        "image_url": scrapedProduct.imageUrl,
                        "prices": existingProduct[0].prices
                    })
                })
        })
    }
})