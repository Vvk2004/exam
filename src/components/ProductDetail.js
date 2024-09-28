import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Grid, Rating } from '@mui/material';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await response.json();
            setProduct(data);
        };

        fetchProductDetail();
    }, [id]);

    if (!product) return <Typography variant="h6">Loading...</Typography>;

    return (
        <Box sx={{ padding: 2, color: '#ffffff', backgroundColor: '#121212', borderRadius: 2, boxShadow: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Box
                        component={'img'}
                        src={product.images[0]}
                        alt={product.title}
                        sx={{
                            width: '100%',
                            height: { sm: '500px', xs: '200px' },
                            borderRadius: 2,
                            boxShadow: 2,
                            objectFit: 'contain', // Keep aspect ratio
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <Box sx={{ padding: 2, borderRadius: 2, boxShadow: 1 }}>
                            <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 500 }}>{product.title}</Typography>
                            <Typography sx={{ marginBottom: 2, }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam aliquam sunt quaerat amet quam accusamus maiores cumque reprehenderit dolore hic?</Typography>
                            <Typography variant="h5" sx={{ fontWeight: 500, fontSize: '24px', mt: 1 }}>Price: ${product.price}</Typography>
                            <Typography variant="h6" sx={{ fontSize: '16px', mt: 1 }}>Category: {product.category}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Rating
                                    name="product-rating"
                                    value={product.rating}
                                    readOnly
                                    precision={0.5} // Adjust precision if needed
                                    sx={{ color: '#ffb400' }} // Custom color for stars
                                />
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ marginTop: 2, backgroundColor: '#bb86fc', '&:hover': { backgroundColor: '#9c57e8' } }}
                            >
                                Add to Cart
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductDetail;
