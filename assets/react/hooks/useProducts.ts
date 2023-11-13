import React from "react";
import {Product} from "../controllers/Home";

export default function useProducts({ inShoppingCart = false }: {inShoppingCart?: boolean}) {
    const [products, setProducts] = React.useState<Product[]>([]);

    const buildQueryString = () => {
        return inShoppingCart ? "inShoppingCart=true" : "";
    }

    React.useEffect(() => {
        fetch(`/api/products?${buildQueryString()}`)
            .then(response => response.json())
            .then(json => setProducts(json));
    }, []);

    return products;
}