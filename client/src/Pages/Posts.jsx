import { Box, Grid, GridItem, Image, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../config';
import { useAction } from '../hooks';

const Posts = () => {
    const [data, setData] = useState([]);
    const { dispatch, loadingOn, loadingOff, logout } = useAction();
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
        } catch (err) {
            dispatch(loadingOff());
            dispatch(logout());
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
        <Box my={5}>
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
