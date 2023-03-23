import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';


const Confirm = ({ handlerNo, handlerYes, message }) => {
    const handleNo = () => {
        handlerNo();
    }

    const handleYes = () => {
        handlerYes();
    }
    return (
        <Box position="fixed" top="0px" left="0px" w="full" h="full" zIndex={4}
            bgColor="rgba(0, 0, 0, 0.5)" display="flex" justifyContent="center"
            alignItems="center"
        >
            <Box w="350px" h="200px" bgColor="white" borderRadius="lg" p="20px"
                display="flex" alignItems="center" justifyContent="center"
                flexDir="column" gap="30px"
            >
                <Text fontSize="xl" textAlign="center"
                    fontWeight="500"
                >{message}</Text>
                <Box display="flex" alignItems="center" justifyContent="space-between"
                    gap="30px"
                >
                    <Button w="100px" colorScheme="red" onClick={handleNo}>No</Button>
                    <Button w="100px" colorScheme="green" onClick={handleYes}>Yes</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Confirm