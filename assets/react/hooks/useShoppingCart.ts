import React from "react";
import {Product} from "../controllers/Home";

export interface ShoppingCart {
    items: ShoppingCartItem[];
}

export interface ShoppingCartItem {
    product: Product;
    quantity: number;
}

export default function useShoppingCart() {
    const [shoppingCart, setShoppingCart] = React.useState<ShoppingCart | null>();

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
        fetch('/session/shopping-cart')
            .then(response => response.json())
            .then(json => {
                setShoppingCart(json);
            });
    }, []);

    const shoppingCartProps = {
        shoppingCart,
        addToShoppingCart,
        removeFromShoppingCart
    }

    return shoppingCartProps;
}