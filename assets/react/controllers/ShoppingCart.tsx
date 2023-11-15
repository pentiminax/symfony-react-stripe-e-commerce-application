import React from "react";
import Header from "./Header";
import useShoppingCart from "../hooks/useShoppingCart";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import ShoppingCartTable from "./ShoppingCartTable";


export default function ShoppingCart() {
    const { shoppingCart, removeFromShoppingCart, loading} = useShoppingCart();

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

    if (shoppingCart?.items.length === 0) {
        return (
            <Container>
                <Header shoppingCart={shoppingCart} />
                <Box marginTop={5}>
                    <Typography variant="h5">Votre panier est vide</Typography>
                </Box>
            </Container>
        )
    }

    const proceedToCheckout = () => {
        fetch('/stripe/checkout-sessions')
            .then(response => response.json())
            .then(json => window.location.href = json['url']);
    }

    return (
        <Container>
            <Header shoppingCart={shoppingCart} />
            <Box marginTop={5}>
                <Box marginBottom={3}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="h5">Votre panier</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" startIcon={<LockIcon />} onClick={proceedToCheckout}>
                                &nbsp;Procéder au paiement
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <ShoppingCartTable
                    removeFromShoppingCart={removeFromShoppingCart}
                    shoppingCart={shoppingCart}
                />
            </Box>
        </Container>
    )
}