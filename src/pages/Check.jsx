import {
    Box,
    Button,
    Checkbox,
    Icon,
    Img,
    Input,
    Table,
    Tbody,
    Td,
    Text,
    Tr,
    useToast,
} from "@chakra-ui/react";

// Hooks
import { useState } from "react";

// Icons
import { FaMicrophone } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

// Libraries
import axios from "axios";
import "../lib/recorder.js";

// Images
import cough from '../assets/cough.png'


const Check = () => {
    const [step, setStep] = useState(1)

    const [SelectedSymptoms, setSelectedSymptoms] = useState([])
    const Symptoms = [
        ["fever_or_chills", "Fever or Chills"],
        ["shortness_of_breath", "Shortness of Breath"],
        ["fatigue", "Fatigue"],
        ["muscle_or_body_aches", "Muscle or Body Aches"],
        ["headache", "Headache"],
        ["loss_of_taste_or_smell", "Loss of Taste or Smell"],
        ["sore_throat", "Sore Throat"],
        ["congestion_or_runny_nose", "Congestion or Runny Nose"],
        ["nausea_or_vomiting", "Nausea or Vomiting"],
    ]

    const [RecordedAudio, setRecordedAudio] = useState(null)
    const [Recording, setRecording] = useState(false)

    const [Checking, setChecking] = useState(false)


    const toast = useToast()
    const navigate = useNavigate()

    const nextStep = () => {
        if (SelectedSymptoms.length === 0) {
            toast({
                title: "Please select at least one symptom",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        } else {
            setStep(step + 1)
        }
    }

    const recordAudio = async () => {
        setRecording(true);

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const mediaStreamSource = audioContext.createMediaStreamSource(stream);
        const recorder = new Recorder(mediaStreamSource);

        recorder.record();

        setTimeout(() => {
            recorder.stop();
            setRecording(false);

            recorder.exportWAV((audioBlob) => {
                setRecordedAudio(audioBlob);
            });

            recorder.clear();
        }, 5000);
    };


    const checkCovidResult = async () => {
        if (RecordedAudio === null) {
            toast({
                title: "Please record your cough",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        } else {
            try {
                const formData = new FormData();
                formData.append("file", RecordedAudio);
                SelectedSymptoms.forEach((symptom) => {
                    formData.append(symptom, true);
                });

                setChecking(true)
                axios.post("http://127.0.0.1:5000/predict", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Access-Control-Allow-Origin": "*",
                    },
                })
                    .then((res) => {
                        if (res.data.code == 3) throw new Error("Please provide another Cough Test")
                        navigate('/result', { state: res.data })
                    })
                    .catch((err) => {
                        toast({
                            title: "Please provide another Cough Test",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        })
                    })
                    .finally(() => {
                        setChecking(false)
                    })

            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' w='100%' h='100vh'>
            {step === 1 && (
                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    w='500px'
                    border='2px'
                    borderColor='gray.300'
                    borderRadius='10px'
                    bg='white'
                    boxShadow='lg'
                >
                    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' w='100%' h='100px'>
                        <Text fontSize='20px' fontWeight='bold'>
                            Step 1:
                        </Text>
                        <Text fontSize='20px' fontWeight='bold'>
                            Check Your Symptoms
                        </Text>
                    </Box>
                    <Box w='100%' overflow='auto' maxHeight='500px' bg='white' borderY='2px' borderColor='gray.100'>
                        <Table variant="simple" colorScheme="blackAlpha">
                            <Tbody>
                                {Symptoms.map((symptom, index) => (
                                    <Tr key={index}>
                                        <Td>
                                            <Text fontSize='18px' fontWeight='bold'>
                                                {symptom[1]}
                                            </Text>
                                        </Td>
                                        <Td textAlign='center'>
                                            <input
                                                type="checkbox"
                                                style={{
                                                    width: '30px',
                                                    height: '30px',
                                                    cursor: 'pointer',
                                                    // Add the following styles to change the selected color
                                                    accentColor: "#ff3b00",
                                                }}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedSymptoms([...SelectedSymptoms, symptom[0]])
                                                    } else {
                                                        setSelectedSymptoms(SelectedSymptoms.filter((selectedSymptom) => selectedSymptom !== symptom[0]))
                                                    }
                                                }} />

                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                    <Box display='flex' justifyContent='flex-end' w='100%' p='20px'>
                        <Button
                            w='110px'
                            colorScheme='orange'
                            bg="#f2805e"
                            borderRadius='50px'
                            onClick={() => nextStep()}
                        >
                            Next
                        </Button>
                    </Box>
                </Box>
            )}
            {step === 2 && (
                <Box
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    w='500px'
                    border='1px'
                    borderColor='gray.300'
                    borderRadius='10px'
                    bg='white'
                    boxShadow='lg'
                    p='20px'
                >
                    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' w='100%'>
                        <Text fontSize='20px' fontWeight='bold'>
                            Step 2:
                        </Text>
                        <Text fontSize='20px' fontWeight='bold'>
                            Record Your Cough
                        </Text>
                        <Img src={cough} w='150px' h='150px' mt={3} mb={10} />
                    </Box>
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='center'
                        w='100%'
                        p='20px'
                    >
                        <Icon
                            as={FaMicrophone}
                            w={10}
                            h={10}
                            className={Recording ? 'recording' : ''}
                            color={Recording ? 'green.500' : 'gray.500'}
                            mb='20px'
                        />
                        <Button
                            w='180px'
                            colorScheme='orange'
                            bg="#f2805e"
                            size='lg'
                            borderRadius='50px'
                            p={3}
                            mb={10}
                            onClick={() => recordAudio()}
                            isDisabled={Recording}
                            fontWeight='bold'
                        >
                            {Recording ? 'Caughing...' : 'Record'}

                        </Button>
                        <Button
                            w='180px'
                            bg={RecordedAudio ? 'green.400' : 'gray.500'}
                            color='white'
                            colorScheme={RecordedAudio ? 'green' : 'gray'}
                            size='lg'
                            borderRadius='50px'
                            mb='20px'
                            p={3}
                            fontWeight='bold'
                            onClick={() => checkCovidResult()}
                            isLoading={Checking}
                            loadingText="Checking"
                        >
                            Check
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default Check;