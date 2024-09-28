import React, { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutFrom';
import ProductDetail from './components/ProductDetail'; // Import ProductDetail

const App = () => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCart((prevCart) =>
            prevCart.reduce((acc, item) => {
                if (item.id === id) {
                    if (item.quantity > 1) {
                        acc.push({ ...item, quantity: item.quantity - 1 });
                    }
                } else {
                    acc.push(item);
                }
                return acc;
            }, [])
        );
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();
            setProducts(data.products);
        };

        fetchProducts();
    }, []);

    return (
        <SnackbarProvider maxSnack={3}>
            <Router>
                <AppBar position="static" sx={{ backgroundColor: '#121212' }}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" sx={{ flexGrow: 1, color: '#ffffff', display: { sm: 'block', xs: 'none' } }}>
                            E-Commerce
                        </Typography>
                        <Button color="inherit" component={Link} to="/" sx={{ '&:hover': { backgroundColor: '#333' } }}>
                            Products
                        </Button>
                        <Button color="inherit" component={Link} to="/cart" sx={{ '&:hover': { backgroundColor: '#333' } }}>
                            Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
                        </Button>
                        <Button color="inherit" component={Link} to="/checkout" sx={{ '&:hover': { backgroundColor: '#333' } }}>
                            Checkout
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container sx={{ backgroundColor: '#1e1e1e', color: '#ffffff', minHeight: '100vh', padding: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Routes>
                                <Route path="/" element={<ProductList products={products} addToCart={addToCart} />} />
                                <Route path="/cart" element={<Cart cartItems={cart} removeFromCart={removeFromCart} />} />
                                <Route path="/checkout" element={<CheckoutForm setCart={setCart} />} />
                                <Route path="/product/:id" element={<ProductDetail products={products} />} /> {/* Product Detail Route */}
                            </Routes>
                        </Grid>
                    </Grid>
                </Container>
            </Router>
        </SnackbarProvider>
    );
};

export default App;
