import React, {useEffect, useState} from "react";
import {get} from "../../utils/api";
import Product from "./Product";
import Loading from "./Loading";

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [queryParam, setQueryParam] = useState<string>("order=created_at.desc")
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        chrome.storage.local.get("search")
            .then((s: { [k: string]: Message }) => {
                if (s["search"] && s["search"].type === "productSearch" && s["search"].data) {
                    setQueryParam(`name=ilike.${encodeURIComponent(`%${s["search"].data}%`)}`)
                }
            })
        get<Product[]>(queryParam, {'Range': '0-13'})
            .then((products) => {
                setProducts(products)
                setLoading(false)
            })
    }, [queryParam])

    return <div>
        {loading
            ? <Loading/>
            : products.length
                ? products.map((p) => {
                    return <Product key={p.asin} product={p}/>
                })
                : <p>No products found!</p>
        }
    </div>
}

export default Products