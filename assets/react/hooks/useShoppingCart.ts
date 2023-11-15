import React from "react";
import {Product} from "./useProducts";

export interface ShoppingCart {
    items: ShoppingCartItem[];
}

export interface ShoppingCartItem {
    product: Product;
    quantity: number;
}

export default function useShoppingCart() {
    const [shoppingCart, setShoppingCart] = React.useState<ShoppingCart | null>();
    const [loading, setLoading] = React.useState(false);

    const addToShoppingCart = (product: Product) => {
        fetch(`/session/shopping-cart/${product.id}`, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(json => setShoppingCart(json));
    }

    const removeFromShoppingCart = (product: Product) => {
        fetch(`/session/shopping-cart/${product.id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(json => setShoppingCart(json));
    }

    React.useEffect(() => {
        setLoading(true);
        fetch('/session/shopping-cart')
            .then(response => response.json())
            .then(json => {
                setShoppingCart(json);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return {
        shoppingCart,
        addToShoppingCart,
        removeFromShoppingCart,
        loading
    };
}