import React from "react";
import Header from "./Header";
import useShoppingCart from "../hooks/useShoppingCart";
import {
    Box, Button,
    Container, Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import LockIcon from '@mui/icons-material/Lock';
import {formatPrice} from "../../utils";


export default function ShoppingCart() {
    const shoppingCartProps = useShoppingCart();

    const proceedToCheckout = () => {
        fetch('/stripe/checkout-sessions')
            .then(response => response.json())
            .then(json => window.location.href = json['url']);
    }

    return (
        <Container>
            <Header shoppingCart={shoppingCartProps.shoppingCart} />
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
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Produit</TableCell>
                                <TableCell>Quantité</TableCell>
                                <TableCell>Prix</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shoppingCartProps.shoppingCart?.items.map(item => (
                                <TableRow key={item.product.id}>
                                    <TableCell>
                                        <Box
                                            display="flex"
                                            flexDirection="row"
                                            alignItems="center"
                                        >
                                            <img
                                                style={{ marginRight: '10px' }} // Adjust spacing as needed
                                                width={100}
                                                height={100}
                                                src={`/images/products/${item.product.imageName}`}
                                                alt={item.product.name}
                                            />
                                            <span>{item.product.name}</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{formatPrice(item.product.price)}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => shoppingCartProps.removeFromShoppingCart(item.product)}>
                                            <ClearIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    )
}