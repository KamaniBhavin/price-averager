import {post, get} from "../utils/api";

chrome.runtime.onMessage.addListener((message: Message) => {
    if (message.type === "syncScrapedProducts") {
        message.data.forEach((product) => {
            get<Product[]>(`asin=eq.${product.asin}`)
                .then((existingProduct) => {
                    if (existingProduct.length && existingProduct[0].id !== null) {
                        existingProduct[0].prices.push({
                            "on": new Date(),
                            "price": Number(product.price.replace(/[^0-9.-]+/g, ""))
                        })
                        post<Product>({
                            "id": existingProduct[0].id,
                            "name": product.name,
                            "asin": product.asin,
                            "image_url": product.imageUrl,
                            "prices": existingProduct[0].prices
                        })
                    } else {
                        post<Product>({
                            "name": product.name,
                            "asin": product.asin,
                            "image_url": product.imageUrl,
                            "prices": [
                                {
                                    "on": new Date(),
                                    "price": Number(product.price.replace(/[^0-9.-]+/g, ""))
                                }
                            ]
                        })
                    }
                })
        })
    }
})