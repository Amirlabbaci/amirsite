import {
    Box,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react";

// Icons 
import { FiArrowLeft } from 'react-icons/fi';

const Motivation = () => {
    return (
        <Box w='100%' h='100vh'>
            <Box position='relative' w='100%' p={0} bg='#f2805e' >
                <Box
                    position='absolute'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    top='0'
                    left='20px'
                    h='100%'
                    cursor='pointer'
                    onClick={() => window.history.back()}
                >
                    <FiArrowLeft size='20px' color='white' />
                </Box>

                <Text fontSize='20px' color='white' fontWeight='bold' textAlign='center' p={3}>
                    Covid 19 Motivation
                </Text>
            </Box>
            <Box w='900px' p={4} m='auto'>
                <Accordion border='none'  allowMultiple>
                    <AccordionItem border='none'>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left' fontWeight='bold'>
                                    What is Covid-19
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus. Most people who fall sick with COVID-19 will experience mild to moderate symptoms and recover without special treatment.

                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem border='none'>
                        <h2>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left' fontWeight='bold'>
                                    Covid-19 symptoms
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Most common symptoms: fever, dry cough, tiredness. Less common symptoms: aches and pains, sore throat, diarrhoea, conjunctivitis, headache, loss of taste or smell, a rash on skin, or discolouration of fingers or toes. Serious symptoms: difficulty breathing or shortness of breath, chest pain or pressure, loss of speech or movement. Seek immediate medical attention if you have serious symptoms. Always call before visiting your doctor or health facility. People with mild symptoms who are otherwise healthy should manage their symptoms at home. On average it takes 5–6 days from when someone is infected with the virus for symptoms to show, however it can take up to 14 days

                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem border='none' >
                        <h2>
                            <AccordionButton >
                                <Box as="span" flex='1' textAlign='left' fontWeight='bold'>
                                    Covid-19 Statistics
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Text fontSize="md" mb={2}>
                                Total Cases: 689,156,586
                            </Text>
                            <Text fontSize="md" mb={2}>
                                Total Deaths: 6,881,718
                            </Text>
                            <Text fontSize="md" mb={2}>
                                Total Recovered: 661,552,928
                            </Text>
                            <Text fontSize="md" mb={2}>
                                Active Cases: 20,721,940
                            </Text>
                            <Text fontSize="md" mb={2}>
                                Critical Cases: 38,214
                            </Text>
                            <Text fontSize="md" mb={2}>
                                Total Tests: 25,66,26,850
                            </Text>
                            <Text fontSize="md" mb={2}>
                                Total Vaccinations: 12,095,905,035
                            </Text>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>

            </Box>
        </Box>
    );
}

export default Motivation;