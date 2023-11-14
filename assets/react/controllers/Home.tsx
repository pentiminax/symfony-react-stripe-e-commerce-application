import React from 'react';
import {Box, Container, Typography} from '@mui/material';
import Header from "./Header";
import useShoppingCart from "../hooks/useShoppingCart";
import useProducts from "../hooks/useProducts";
import ProductGrid from "./ProductGrid";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageName: string;
}

export default function Home() {
    const products = useProducts();
    const { addToShoppingCart, shoppingCart, loading } = useShoppingCart();

    if (loading) {
        return (
            <Container>
                <Header shoppingCart={shoppingCart} />
                <Box marginTop={5}>
                    <Typography variant="h5">Chargement...</Typography>
                </Box>
            </Container>
        )
    }

    return (
        <Container>
            <Header shoppingCart={shoppingCart} />
            <ProductGrid
                addToShoppingCart={addToShoppingCart}
                products={products}
                shoppingCart={shoppingCart}
            />
        </Container>
    )
}
