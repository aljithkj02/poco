import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <Flex px={20} justifyContent="space-between" py={4} bg="gray.200" alignItems="center">
            <Box>
                <Text fontWeight="500" fontSize="23px"><Link to="/">Poco</Link></Text>
            </Box>
            <Flex gap={10}>
                <Link to="/" style={{ fontWeight: '500', fontSize: "20px" }}>Home</Link>
                <Link to="/posts" style={{ fontWeight: '500', fontSize: "20px" }}>Posts</Link>
                <Link to="/login" style={{ fontWeight: '500', fontSize: "20px" }}>Login</Link>
            </Flex>
        </Flex>
    )
}

export default Navbar
