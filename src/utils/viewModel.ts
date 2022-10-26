interface ScrapedProductDetails {
    asin: string,
    name: string,
    imageUrl: string,
    price: string
}

interface Message {
    type: "syncScrapedProducts"
    data: ScrapedProductDetails[]
}

interface Product {
    id?: number,
    asin: string,
    name: string,
    image_url: string,
    prices: PriceHistory[]
}

interface PriceHistory {
    on: Date,
    price: number
}