interface ProductDetails {
    asin: string,
    name: string,
    imageUrl: string,
    price: string
}

interface Message {
    type: "syncScrapedProducts"
    data: ProductDetails[]
}