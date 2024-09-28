import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack'; // Import useSnackbar from notistack

const CheckoutForm = ({ setCart }) => {
    const initialFormData = {
        name: '',
        email: '',
        address: '',
        contact: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const { enqueueSnackbar } = useSnackbar(); // Initialize snackbar

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle the form submission, e.g., sending data to an API
        
        // Clear the cart after successful submission
        setCart([]); // This will empty the cart

        // Reset form data to initial state
        setFormData(initialFormData);

        // Show a success notification
        enqueueSnackbar('Checkout successful! Thank you for your purchase!', { variant: 'success' });
    };

    return (
        <Box sx={{ padding: 2, backgroundColor: '#1e1e1e', borderRadius: 1, boxShadow: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#ffffff' }}>
                Checkout
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                    sx={{ input: { color: '#ffffff' }, '& .MuiInputLabel-root': { color: '#ffffff' }, '& .MuiInputLabel-root.Mui-focused': { color: '#bb86fc' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#bb86fc' }, '&:hover fieldset': { borderColor: '#bb86fc' }, '&.Mui-focused fieldset': { borderColor: '#bb86fc' } } }}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                    sx={{ input: { color: '#ffffff' }, '& .MuiInputLabel-root': { color: '#ffffff' }, '& .MuiInputLabel-root.Mui-focused': { color: '#bb86fc' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#bb86fc' }, '&:hover fieldset': { borderColor: '#bb86fc' }, '&.Mui-focused fieldset': { borderColor: '#bb86fc' } } }}
                />
                <TextField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                    sx={{ input: { color: '#ffffff' }, '& .MuiInputLabel-root': { color: '#ffffff' }, '& .MuiInputLabel-root.Mui-focused': { color: '#bb86fc' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#bb86fc' }, '&:hover fieldset': { borderColor: '#bb86fc' }, '&.Mui-focused fieldset': { borderColor: '#bb86fc' } } }}
                />
                <TextField
                    label="Contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                    sx={{ input: { color: '#ffffff' }, '& .MuiInputLabel-root': { color: '#ffffff' }, '& .MuiInputLabel-root.Mui-focused': { color: '#bb86fc' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#bb86fc' }, '&:hover fieldset': { borderColor: '#bb86fc' }, '&.Mui-focused fieldset': { borderColor: '#bb86fc' } } }}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2, backgroundColor: '#bb86fc', '&:hover': { backgroundColor: '#9c66e0' } }}>
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default CheckoutForm;
