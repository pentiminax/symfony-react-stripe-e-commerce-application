import React from "react";
import {Product} from "../controllers/Home";

export default function useProducts() {
    const [products, setProducts] = React.useState<Product[]>([]);

    React.useEffect(() => {
        fetch(`/api/products`)
            .then(response => response.json())
            .then(json => setProducts(json));
    }, []);

    return products;
}