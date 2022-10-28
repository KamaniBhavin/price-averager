import React from "react";

const Product: React.FC<{ product: Product }> = ({product}) => {
    const avgPrice = product.prices.reduce((acc: number, current) => acc + current.price, 0) / product.prices.length
    return <div className="product">
        <img src={product.image_url} alt={product.name}/>
        <div className="product-details">
            <small>{`#${product.asin}`}</small>
            <p>{product.name}</p>
            <b>Avg. Price: {`$${avgPrice.toFixed(2)}`}</b>
        </div>
    </div>
}

export default Product