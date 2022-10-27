interface ScrapedProductDetails {
    asin: string,
    name: string,
    imageUrl: string,
    price: string
}

interface SyncScrapedProductMessage {
    type: "syncScrapedProducts"
    data: ScrapedProductDetails[]
}

interface ProductSearchMessage {
    type: "productSearch"
    data: string
}

type Message = SyncScrapedProductMessage | ProductSearchMessage

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