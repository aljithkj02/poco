import { Box, Container } from '@chakra-ui/react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../Components';

const AllRoutes = () => {
    return (
        <Box>
            <Navbar />
            <Container maxW="90%" py={4}>
                <Routes>
                    <Route path="/" element={<h1>HOME</h1>} />
                    <Route path="/posts" element={<h1>Posts</h1>} />
                    <Route path="/login" element={<h1>Login</h1>} />
                    <Route path="/signup" element={<h1>Signup</h1>} />
                </Routes>
            </Container>
        </Box>
    )
}

export default AllRoutes
