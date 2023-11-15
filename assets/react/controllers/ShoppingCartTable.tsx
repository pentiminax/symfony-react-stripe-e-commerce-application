import {Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {formatPrice} from "../../utils";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";

export default function ShoppingCartTable({ shoppingCart, removeFromShoppingCart }) {
    return (
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
                    {shoppingCart?.items.map(item => (
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
                                <IconButton onClick={() => removeFromShoppingCart(item.product)}>
                                    <ClearIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}