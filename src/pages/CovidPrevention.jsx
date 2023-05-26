import { Box, Text } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CovidPrevention = () => {
    const navigate = useNavigate();
    return (
        <Box>
            <Box position='relative' w='100%' p={0} bg='#50c053' >
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
                    COVID-19 Prevention
                </Text>
            </Box>
            <Box w='700px' p={4}  m='auto'>
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                    Advice for Staying Healthy:
                </Text>
                <Text fontSize="md" mb={2}>
                    1. Wash your hands frequently: Use soap and water for at least 20
                    seconds, or use hand sanitizer with at least 60% alcohol.
                </Text>
                <Text fontSize="md" mb={2}>
                    2. Wear a mask: When you are in crowded places or around people who may
                    be sick, wear a mask to protect yourself and others.
                </Text>
                <Text fontSize="md" mb={2}>
                    3. Practice social distancing: Maintain at least 6 feet of distance
                    from others and avoid close contact, especially in crowded areas.
                </Text>
                <Text fontSize="md" mb={2}>
                    4. Avoid large gatherings: Minimize your exposure to large gatherings or
                    events where maintaining physical distance is challenging.
                </Text>
                <Text fontSize="md" mb={2}>
                    5. Stay home if you're feeling unwell: If you have symptoms like fever,
                    cough, or difficulty breathing, stay home and seek medical advice.
                </Text>
                <Text fontSize="md" mb={2}>
                    6. Clean and disinfect frequently touched surfaces: Regularly clean and
                    disinfect objects and surfaces you frequently touch.
                </Text>
                <Text fontSize="md" mb={2}>
                    7. Follow health guidelines: Stay informed about the latest guidelines
                    from health authorities and follow them diligently.
                </Text>
                <Text fontSize="md" mb={2}>
                    8. Take care of your mental health: Engage in activities that help you
                    relax, connect with loved ones, and seek support if needed.
                </Text>
            </Box>
        </Box>
    );
}

export default CovidPrevention;