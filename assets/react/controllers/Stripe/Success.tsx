import React from "react";
import {Box, Button, Container, Typography} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {formatPrice, visit} from "../../../utils";

export default function Success({amountTotal}) {
    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60 }} />
                <Typography component="h1" variant="h4" gutterBottom>
                    Paiement réussi
                </Typography>
                <Typography variant="subtitle1">
                    Merci pour votre achat de {formatPrice(amountTotal)} !
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => visit('/')}
                    >
                        Retour à la boutique
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}