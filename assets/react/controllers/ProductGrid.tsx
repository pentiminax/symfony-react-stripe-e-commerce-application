import {Box, Button, Grid, Paper, Stack, Typography} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import {Product} from "./Home";
import {formatPrice} from "../../utils";

export default function ProductGrid({ addToShoppingCart, products, shoppingCart}) {
    const isProductInShoppingCart = (product: Product) => {
        return shoppingCart?.items.some(item => item.product.id === product.id);
    }

    return (
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
                                        {formatPrice(product.price)}
                                    </Typography>
                                </Box>

                                <Button
                                    variant="outlined"
                                    color="primary"
                                    endIcon={isProductInShoppingCart(product) ? <ShoppingBasketIcon /> : <AddIcon />}
                                    sx={{ mt: 1 }}
                                    onClick={() => addToShoppingCart(product)}
                                >
                                    {isProductInShoppingCart(product) ? 'Déjà dans le panier' : 'Ajouter au panier'}
                                </Button>

                            </Stack>
                        </Paper>
                    </Box>
                </Grid>
            ))}
        </Grid>
    )
}