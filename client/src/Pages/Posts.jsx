import { Box, Grid, GridItem, Image, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../Components/Loader';
import config from '../config';
import { useAction, useData } from '../hooks';
import { login } from '../redux/auth/action';
import { sendRefreshToken } from '../utils';

const Posts = () => {
    const [data, setData] = useState([]);
    const { dispatch, loadingOn, loadingOff, logout } = useAction();
    const { loading } = useData();
    const toast = useToast()

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            dispatch(loadingOn());
            const token = localStorage.getItem('token') || 'token';
            let res = await axios.get(`${config.API_URL}api/posts`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            if (res?.data?.status) {
                setData(res.data.posts);
                console.log(res.data.posts);
            }
            dispatch(loadingOff());
        } catch (err) {
            if (err?.response?.data?.message === 'jwt expired') {
                let res = await sendRefreshToken();
                if (res.status) {
                    const refreshToken = localStorage.getItem('refreshToken');
                    console.log(res.token);
                    dispatch(login(res.token, refreshToken));
                    fetchPosts();
                } else {
                    console.log('logout')
                    dispatch(loadingOff());
                    dispatch(logout());
                }
            } else {
                toast({
                    title: err?.response?.data?.message,
                    status: 'error',
                    position: 'top',
                    isClosable: true,
                })
                dispatch(loadingOff());
                dispatch(logout());
            }
        }
    }
    return (
        <Box my={5}>
            {loading && <Loader />}
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                {data?.map((post) => {
                    return (
                        <GridItem key={post._id} boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" p={4}
                            borderRadius={10}
                        >
                            <Box h='200px' bg='blue.500'>
                                <Image h="100%" src={post.img} />
                            </Box>
                            <Text mt={3}>{post.title}</Text>
                        </GridItem>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default Posts
