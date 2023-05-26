import { Box, Button, Img, Text } from "@chakra-ui/react";

// Icons 
import { MdCoronavirus } from 'react-icons/md';
import { Link } from "react-router-dom";

// Images
import covid from '../assets/covid.png';

const Main = () => {
    return (
        <Box>
            <Box display='flex' flexDirection='column' justifyContent='space-around' alignItems='center' w='100%' h='100vh'>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    {/* <MdCoronavirus size='100px' />
                    <Text fontSize='40px' color='gray.700' fontWeight='bold'>
                        COVID 19
                    </Text> */}
                    <Img src={covid} w='200px' />
                </Box>

                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Link to='/motivation'>
                        <Button w='220px' colorScheme='orange' bg="#f2805e" size='lg' borderRadius='50px' mb='20px' p={8}>
                            Covid 19 Motivation
                        </Button>
                    </Link>
                    <Link to='/check'>
                        <Button w='220px' colorScheme='orange' bg="#f2805e" size='lg' borderRadius='50px' p={8}>
                            Covid 19 Check
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}

export default Main;