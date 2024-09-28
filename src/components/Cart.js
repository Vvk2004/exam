import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating'; // Import Rating component

const Cart = ({ cartItems, removeFromCart }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Box sx={{ padding: 2, color: '#ffffff' }}>
            <Box sx={{ display: { sm: 'flex' }, justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#fff', display: 'flex', justifyContent: 'center' }}>
                    Shopping Cart
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/checkout"
                        sx={{
                            backgroundColor: '#bb86fc',
                            width: { sm: 'unset', xs: '50%' },
                        }}
                    >
                        Checkout
                    </Button>
                    <Typography variant="h5" sx={{ fontSize: '16px', width: { sm: 'unset', xs: '50%' }, backgroundColor: '#bb86fc', p: 1, display: 'flex', justifyContent: 'center', borderRadius: '5px' }}>
                        Total: ${totalPrice.toFixed(2)}
                    </Typography>
                </Box>
            </Box>
            {cartItems.length === 0 ? (
                <Typography variant="h6">Your cart is empty.</Typography>
            ) : (
                <>
                    <Grid container spacing={2}>
                        {cartItems.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.id}>
                                <Box
                                    sx={{
                                        backgroundColor: '#2c2c2c', // Dark background for items
                                        border: '1px solid #bb86fc', // Border color to match your theme
                                        borderRadius: 1, // Rounded corners
                                        padding: 1, // Adjusted padding for a smaller box
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        '&:hover': {
                                            boxShadow: 3, // Add shadow effect on hover
                                        },
                                    }}
                                >
                                    <Typography component={'img'} src={item.images[0]} alt={item.title} sx={{ width: '100%', objectFit: 'contain', height: { sm: '300px', xs: '200px' }, marginBottom: 0 }} />
                                    <Typography variant="h6" sx={{ color: '#ffffff', fontSize: '1rem' }}>{item.title}</Typography>
                                    <Typography variant="body1" sx={{ color: '#ffffff', fontSize: '0.9rem' }}>Price: ${item.price}</Typography>
                                    <Typography variant="body1" sx={{ color: '#ffffff', fontSize: '0.9rem' }}>Quantity: {item.quantity}</Typography>
                                    {/* Display rating */}
                                    <Rating name={`rating-${item.id}`} value={item.rating} precision={0.5} readOnly />
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => removeFromCart(item.id)}
                                        sx={{
                                            marginTop: 1,
                                            backgroundColor: '#f50057',
                                            '&:hover': { backgroundColor: '#ab003c' }, // Custom secondary button colors
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </Box>
    );
};

export default Cart;
