import { Box, Button, Img, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

// Images
import safe from '../assets/safe.png';
import danger from '../assets/danger.png';

const Result = () => {
    const location = useLocation();
    const res = location.state;
    const navigate = useNavigate();

    return (
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' w='100%' h='100vh'>
            {res.code == 1 ? (
                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    borderWidth='4px'
                    borderColor="#50c053"
                    borderRadius='10px'
                    p={5}
                >
                    <Text color="#50c053" fontSize='25px' fontWeight='bold' mb='20px'>
                        You are Safe
                    </Text>
                    <Img src={safe} w='150px' />
                    <Text mt='20px' maxW='300px' textAlign='center'>
                        {res.result}
                    </Text>
                    <Button
                        mt='20px'
                        colorScheme='green'
                        bg="#50c053"
                        size='md'
                        borderRadius='50px'
                        p={6}
                        onClick={() => navigate('/covid-prevention')}
                    >
                        What do I do next?
                    </Button>
                </Box>
            ) : (
                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    borderWidth='4px'
                    borderColor="#f13e54"
                    borderRadius='10px'
                    p={5}
                >
                    <Text color="#f13e54" fontSize='25px' fontWeight='bold' mb='20px'>
                        You are Infected
                    </Text>
                    <Img src={danger} w='150px' />
                    <Text mt='20px' maxW='300px' textAlign='center'>
                        {res.result}
                    </Text>
                    <Button
                        mt='20px'
                        colorScheme='red'
                        bg="#f13e54"
                        size='md'
                        borderRadius='50px'
                        p={6}
                        onClick={() => navigate('/covid-advice')}
                    >
                        What do I do next?
                    </Button>
                </Box>
            )}

        </Box>
    );
}

export default Result;