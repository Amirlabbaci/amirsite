import { Box, Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CovidAdvice = () => {
    const navigate = useNavigate();
    return (
        <Box>
            <Box position='relative' w='100%' p={0} bg='#f13e54' >
                <Box
                    position='absolute'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    top='0'
                    left='20px'
                    h='100%'
                    cursor='pointer'
                    onClick={() => navigate('/')}
                >
                    <FiArrowLeft size='20px' color='white' />
                </Box>
                <Text fontSize='20px' color='white' fontWeight='bold' textAlign='center' p={3}>
                    COVID-19 Advice
                </Text>
            </Box>
            <Box w='700px' p={5} m='auto'>
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                    Advice for COVID-19 Patients:
                </Text>
                <Text fontSize="md" mb={2}>
                    1. Isolate yourself: Stay in a separate room away from others, and use
                    a separate bathroom if possible.
                </Text>
                <Text fontSize="md" mb={2}>
                    2. Wear a mask: When you are around other people or animals, wear a mask
                    to prevent the spread of the virus.
                </Text>
                <Text fontSize="md" mb={2}>
                    3. Wash your hands frequently: Use soap and water for at least 20
                    seconds, or use hand sanitizer with at least 60% alcohol.
                </Text>
                <Text fontSize="md" mb={2}>
                    4. Monitor your symptoms: Keep track of any changes in your symptoms and
                    seek medical help if necessary.
                </Text>
                <Text fontSize="md" mb={2}>
                    5. Stay hydrated: Drink plenty of fluids, such as water, herbal tea, and
                    soup, to stay hydrated.
                </Text>
                <Text fontSize="md" mb={2}>
                    6. Rest and take care of yourself: Get enough sleep, eat nutritious
                    meals, and engage in activities that help you relax.
                </Text>
                <Text fontSize="md" mb={2}>
                    7. Follow medical advice: Cooperate with healthcare professionals, take
                    prescribed medications, and attend follow-up appointments.
                </Text>
                <Text fontSize="md" mb={2}>
                    8. Inform close contacts: Notify people you have been in close contact
                    with, so they can take necessary precautions.
                </Text>
                <Text fontSize="md" mb={2}>
                    9. Stay informed: Stay updated with reliable sources for the latest
                    information and guidelines on COVID-19.
                </Text>
            </Box>
        </Box>
    );
}

export default CovidAdvice;