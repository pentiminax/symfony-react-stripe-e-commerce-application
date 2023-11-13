import {AppBar, Badge, IconButton, Toolbar, Typography} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import StoreIcon from '@mui/icons-material/Store';
import React from "react";
import {visit} from "@hotwired/turbo";
import {ShoppingCartItem} from "../hooks/useShoppingCart";

export default function Header({ shoppingCart }) {

    const showShoppingCart = () => {
        visit('/shopping-cart');
    }

    const calculateTotalQuantity = () => {
        return shoppingCart?.items?.map((item: ShoppingCartItem) => item.quantity).reduce((prev, curr) => prev + curr, 0);
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    onClick={() => visit('/')}
                    sx={{ mr: 2 }}
                >
                    <StoreIcon/>
                </IconButton>
                <IconButton onClick={showShoppingCart} color="inherit">
                    <Badge badgeContent={calculateTotalQuantity()} color="secondary">
                        <ShoppingBasketIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}