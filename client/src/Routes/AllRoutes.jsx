import { Box, Container } from '@chakra-ui/react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../Components';
import { Home, Login, Posts, Signup } from '../Pages';

const AllRoutes = () => {
    return (
        <Box>
            <Navbar />
            <Container maxW="90%" py={4}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Container>
        </Box>
    )
}

export default AllRoutes
