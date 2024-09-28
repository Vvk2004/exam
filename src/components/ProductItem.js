import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions, Rating } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const ProductItem = ({ product, addToCart }) => {
    const { id, images, title, price, rating, category } = product;

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: '#2c2c2c',
                border: '1px solid #bb86fc',
                borderRadius: 1,
                '&:hover': {
                    boxShadow: 3,
                },
            }}
        >
            <Link to={`/product/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                    component="img"
                    image={images[0]}
                    alt={title}
                    sx={{
                        height: '300px',
                        width: '100%',
                        objectFit: 'contain',
                        p: 1,
                        borderBottom: '1px solid #bb86fc',
                    }}
                />
            </Link>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap sx={{ color: '#ffffff' }}>
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#ffffff' }}>Category: {category}</Typography>
                <Typography variant="body2" sx={{ color: '#ffffff' }}>Price: ${price.toFixed(2)}</Typography>
                <Rating name="read-only" value={rating} precision={0.5} readOnly />
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    onClick={() => addToCart(product)}
                    sx={{ backgroundColor: '#bb86fc', color: '#ffffff', '&:hover': { backgroundColor: '#9e7eeb' } }}
                >
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductItem;
