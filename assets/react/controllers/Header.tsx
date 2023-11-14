import {AppBar, Badge, Grid, IconButton, Toolbar} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import StoreIcon from '@mui/icons-material/Store';
import React from "react";
import {visit} from "../../utils";
import {ShoppingCartItem} from "../hooks/useShoppingCart";

export default function Header({ shoppingCart }) {

    const showHome = () => {
        visit('/');
    }

    const showShoppingCart = () => {
        visit('/shopping-cart');
    }

    const calculateTotalQuantity = () => {
        return shoppingCart?.items?.map((item: ShoppingCartItem) => item.quantity).reduce((prev, curr) => prev + curr, 0);
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center" style={{ width: '100%' }}>
                    <Grid item>
                        <IconButton edge="start" color="inherit" onClick={showHome}>
                            <StoreIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton color="inherit" onClick={showShoppingCart}>
                            <Badge badgeContent={calculateTotalQuantity()} color="secondary">
                                <ShoppingBasketIcon />
                            </Badge>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}