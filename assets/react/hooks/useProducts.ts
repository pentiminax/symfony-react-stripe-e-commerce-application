import React from "react";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageName: string;
}

export default function useProducts() {
    const [products, setProducts] = React.useState<Product[]>([]);

    React.useEffect(() => {
        fetch(`/api/products`)
            .then(response => response.json())
            .then(json => setProducts(json));
    }, []);

    return products;
}