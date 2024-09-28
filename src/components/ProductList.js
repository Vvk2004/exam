import React, { useEffect, useState } from 'react';
import { Grid, Select, MenuItem, FormControl, InputLabel, Box, TextField, Typography } from '@mui/material';
import ProductItem from './ProductItem';

const ProductList = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories] = useState(['All Products', 'Beauty', 'Fragrances', 'Furniture', 'Groceries']);
    const [selectedCategory, setSelectedCategory] = useState('All Products');
    const [searchText, setSearchText] = useState('');
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const productResponse = await fetch('https://dummyjson.com/products');
            const productData = await productResponse.json();
            setProducts(productData.products);
            setFilteredProducts(productData.products);
        };

        fetchProducts();
    }, []);

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        filterProducts(category, searchText);
    };

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        setSearchText(searchValue);
        filterProducts(selectedCategory, searchValue);
    };

    const handleSortChange = (e) => {
        const option = e.target.value;
        setSortOption(option);
        sortProducts(filteredProducts, option);
    };

    const filterProducts = (category, searchValue) => {
        let updatedProducts = [...products];

        // Check category
        if (category && category !== 'All Products') {
            updatedProducts = updatedProducts.filter(product => {
                const productCategory = product.category; // Fetch product category
                return productCategory && productCategory.toLowerCase() === category.toLowerCase(); // Compare
            });
        }

        // Search functionality
        if (searchValue) {
            updatedProducts = updatedProducts.filter(product =>
                product.title.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        setFilteredProducts(updatedProducts);
        sortProducts(updatedProducts, sortOption); // Sort after filtering
    };

    const sortProducts = (productsToSort, option) => {
        let sortedProducts = [...productsToSort];

        if (option === 'price') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (option === 'rating') {
            sortedProducts.sort((a, b) => b.rating - a.rating); // Descending for rating
        }

        setFilteredProducts(sortedProducts);
    };

    const sharedSelectStyle = {
        minWidth: { xs: '100%', sm: 200 },
        mb: { xs: 2, sm: 0 },
        backgroundColor: '#2c2c2c',
        borderRadius: 1,
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#bb86fc',
            },
            '&:hover fieldset': {
                borderColor: '#bb86fc',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#bb86fc',
            },
        },
        '& .MuiInputLabel-root': {
            color: '#ffffff',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#bb86fc',
        },
        '& .MuiSelect-select': {
            backgroundColor: '#2c2c2c',
            color: '#ffffff',
        },
    };

    return (
        <>
            {/* Search Box */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { md: 0, sm: 2, xs: 0 }, justifyContent: 'space-between', my: 3, backgroundColor: '#1e1e1e', padding: 2, borderRadius: 1 }}>
                <TextField
                    label="Search Products"
                    variant="outlined"
                    value={searchText}
                    onChange={handleSearchChange}
                    sx={{
                        width: { xs: '100%', sm: '50%' },
                        mb: { xs: 2, sm: 0 },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#bb86fc',
                            },
                            '&:hover fieldset': {
                                borderColor: '#bb86fc',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#bb86fc',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#ffffff',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#bb86fc',
                        },
                        input: {
                            color: '#ffffff',
                        },
                    }}
                />

                {/* Category Filter */}
                <FormControl sx={sharedSelectStyle}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        label="Category"
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    backgroundColor: '#121212', // Ensuring the background color matches the dark theme
                                },
                            },
                        }}
                    >
                        {categories.map((category) => (
                            <MenuItem
                                key={category}
                                value={category}
                                sx={{
                                    backgroundColor: '#1c1c1c', // Darker background for the menu item
                                    color: "#ffffff", // White text color for better contrast
                                    ':hover': {
                                        backgroundColor: '#2a2a2a', // Lighter background on hover
                                    },
                                    ':focus': {
                                        backgroundColor: '#2a2a2a', // Consistent focus color
                                    },
                                    padding: '12px 16px', // Padding for better touch targets and aesthetics
                                    transition: 'background-color 0.2s ease', // Smooth transition for hover/focus effects
                                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.5)', // Subtle shadow for depth
                                }}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>

                </FormControl>

                {/* Sort Options */}
                <FormControl sx={sharedSelectStyle}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                        value={sortOption}
                        onChange={handleSortChange}
                        label="Sort By"
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="price">Price</MenuItem>
                        <MenuItem value="rating">Rating</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Product Grid */}
            <Grid container spacing={2}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <ProductItem product={product} addToCart={addToCart} />
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography variant="h6" color="white">No products found.</Typography>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default ProductList;
