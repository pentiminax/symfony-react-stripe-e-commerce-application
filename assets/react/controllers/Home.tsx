import React from 'react';
import {Box, Paper, Typography, Button, Chip, Rating, Stack, Grid, Container} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Header from "./Header";
import useShoppingCart from "../hooks/useShoppingCart";
import useProducts from "../hooks/useProducts";

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

    const isProductInShoppingCart = (product: Product) => {
        return shoppingCartProps.shoppingCart?.items.some(item => item.product.id === product.id);
    }

    return (
        <Container>
            <Header shoppingCart={shoppingCartProps.shoppingCart} />
            <Grid container marginTop={5}>
                {products?.map((product) => (
                    <Grid item key={product.id} xs={4}>
                        <Box sx={{ width: 300, m: 2 }}>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Stack direction="column" spacing={2}>

                                    <Box component="img"
                                         sx={{ width: '100%', height: 'auto' }}
                                         src={`/images/products/${product.imageName}`}
                                         alt={product.name}
                                    />

                                    <Typography variant="h6" gutterBottom>
                                        {product.name}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography variant="h6" color="secondary">
                                            {product.price} €
                                        </Typography>
                                    </Box>

                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        endIcon={isProductInShoppingCart(product) ? <ShoppingBasketIcon /> : <AddIcon />}
                                        sx={{ mt: 1 }}
                                        onClick={() => shoppingCartProps.addToShoppingCart(product)}
                                    >
                                        {isProductInShoppingCart(product) ? 'Déjà dans le panier' : 'Ajouter au panier'}
                                    </Button>

                                </Stack>
                            </Paper>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
