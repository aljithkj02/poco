import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAction, useData } from '../hooks';
import Confirm from './Confirm';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuth, name } = useData();
    const { logout, dispatch } = useAction();
    const navigate = useNavigate();
    const toast = useToast()

    const logoutUser = () => {
        toast({
            title: 'User logout successfully!',
            status: 'success',
            position: 'top',
            isClosable: true,
        })
        handleOpen();
        dispatch(logout());
        navigate('/login')
    }

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }
    return (
        <Flex px={20} justifyContent="space-between" py={4} bg="gray.200" alignItems="center">
            {isOpen && <Confirm handlerNo={handleOpen} handlerYes={logoutUser}
                message="Do you want to logout?"
            />}
            <Box>
                <Text fontWeight="500" fontSize="23px"><Link to="/">Poco</Link></Text>
            </Box>
            <Flex gap={10}>
                <Link to="/" style={{ fontWeight: '500', fontSize: "20px" }}>Home</Link>
                <Link to="/posts" style={{ fontWeight: '500', fontSize: "20px" }}>Posts</Link>
                {
                    isAuth ? (
                        <Button size="sm" colorScheme="red"
                            onClick={handleOpen}
                        >Logout</Button>
                    ) : (
                        <Link to="/login" style={{ fontWeight: '500', fontSize: "20px" }}>Login</Link>
                    )
                }

            </Flex>
        </Flex>
    )
}

export default Navbar
