import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import {get} from "../utils/api";
import Product from "../popup/components/Product";
import "./contentScript.css";

const ProductOverlay: React.FC = () => {
    const [product, setProduct] = useState<Product>()
    const url = document.location.href
    const dp = "/dp/"
    // Grab the `asin` of the product from the current URL to show overlay of the average price of the product.
    const asin = url.substring(url.search(dp) + dp.length).split("/")[0]

    useEffect(() => {
        chrome.storage.sync.get("showOverlay")
            .then((data) => {
                if (!data || !data["showOverlay"]) {
                    return
                }
                get(`asin=eq.${asin}`)
                    .then((p) => {
                        setProduct(p[0])
                    })
                    .catch((error) => console.error(error))
            })
    }, [asin])

    return <>
        {
            product && <div className="overlay">
                <Product product={product}/>
            </div>
        }
    </>
}

const body = document.querySelector('body')
const overlay = document.createElement('div')

overlay.id = 'overlay-root'

if (body) {
    body.prepend(overlay)
}

const container = document.getElementById('overlay-root');
const root = createRoot(container);

root.render(<ProductOverlay/>)