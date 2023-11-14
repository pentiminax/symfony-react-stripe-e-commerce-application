import React from 'react';
import {Box, Paper, Typography, Button, Chip, Rating, Stack, Grid, Container} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
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
    const products = useProducts({ inShoppingCart: false })
    const shoppingCartProps = useShoppingCart();

    return (
        <Container>
            <Header shoppingCart={shoppingCartProps.shoppingCart} />
            <ProductGrid products={products} shoppingCartProps={shoppingCartProps} />
        </Container>
    )
}
