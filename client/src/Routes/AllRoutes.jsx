import { Box, Container } from '@chakra-ui/react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../Components';
import { Home, Login, Posts, Signup } from '../Pages';
import PrivateRouter from './PrivateRouter';

const AllRoutes = () => {
    return (
        <Box>
            <Navbar />
            <Container maxW="90%" py={4}>
                <Routes>
                    <Route path="/" element={<PrivateRouter><Home /></PrivateRouter>} />
                    <Route path="/posts" element={<PrivateRouter><Posts /></PrivateRouter>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Container>
        </Box >
    )
}

export default AllRoutes
