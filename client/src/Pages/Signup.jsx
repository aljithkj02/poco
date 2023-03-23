import { Box, Button, Input, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import config from '../config';

const Signup = () => {
    const [details, setDetails] = useState({
        name: '',
        email: '',
        password: ''
    })
    const toast = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }

    const signupUser = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(`${config.API_URL}api/user/signup`, { ...details });
            console.log(res?.data?.message);
            if (res?.data?.status) {
                const token = res?.data?.token;
                console.log(token);
                localStorage.setItem('token', token);
                toast({
                    title: res.data.message,
                    status: 'success',
                    position: 'top',
                    isClosable: true,
                })
                navigate('/');
            }
        } catch (err) {
            toast({
                title: err?.response?.data?.message,
                status: 'error',
                position: 'top',
                isClosable: true,
            })
            console.log(err?.response?.data?.message);
        }
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" h="80vh">
            <Box w={["95%", "90%", "70%", "50%"]} boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" p="70px 50px" borderRadius="lg"
                display="flex" flexDir="column" gap="20px"
            >
                <Text fontSize="3xl" textAlign="center">Signup</Text>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                    onSubmit={signupUser}
                >
                    <Input type="name" name="name" placeholder="Name" variant="flushed" onChange={handleChange}
                        required="required"
                    />
                    <Input type="email" name="email" placeholder="Email" variant="flushed" onChange={handleChange}
                        required="required"
                    />
                    <Input type="password" name="password" placeholder="Password" variant="flushed" onChange={handleChange}
                        required="required"
                    />
                    <Button mt={6} type="submit" colorScheme='messenger'
                        p={5} fontSize="16px"
                    >Signup</Button>
                    <Text color="gray" fontSize="sm" textAlign="center"
                    >Already have an account?
                        <Link to="/login" style={{ marginLeft: '5px', color: 'blue', fontWeight: '500' }}
                        >Login</Link>
                    </Text>
                </form>
            </Box>
        </Box>
    )
}

export default Signup