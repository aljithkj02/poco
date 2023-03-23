import { Box, Button, Input, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from '../Components';
import config from '../config';
import { useAction, useData } from '../hooks';

const Login = () => {
    const [details, setDetails] = useState({
        email: '',
        password: ''
    })
    const { login, dispatch, loadingOn, loadingOff } = useAction();
    const { loading } = useData();
    const navigate = useNavigate();
    const toast = useToast()

    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }

    const loginUser = async (e) => {
        e.preventDefault()
        try {
            dispatch(loadingOn());
            let res = await axios.post(`${config.API_URL}api/user/login`, { ...details });
            if (res?.data?.status) {
                const token = res?.data?.token;
                dispatch(login(token));
                toast({
                    title: res?.data?.message,
                    status: 'success',
                    position: 'top',
                    isClosable: true,
                })
                navigate('/');
            }
        } catch (err) {
            dispatch(loadingOff());
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
            {loading && <Loader />}
            <Box w={["95%", "90%", "70%", "50%"]} boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" p="70px 50px"
                borderRadius="lg" display="flex" flexDir="column" gap="20px"
            >
                <Text fontSize="3xl" textAlign="center">Login</Text>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                    onSubmit={loginUser}
                >
                    <Input type="email" name="email" placeholder="Email" variant="flushed" onChange={handleChange}
                        required="required"
                    />
                    <Input type="password" name="password" placeholder="Password" variant="flushed" onChange={handleChange}
                        required="required"
                    />
                    <Button mt={6} type="submit" colorScheme='messenger'
                        p={5} fontSize="16px"
                    >Login</Button>
                    <Text color="gray" fontSize="sm" textAlign="center"
                    >Don't have an account?
                        <Link to="/signup" style={{ marginLeft: '5px', color: 'blue', fontWeight: '500' }}
                        >Signup</Link>
                    </Text>
                </form>
            </Box>
        </Box>
    )
}

export default Login