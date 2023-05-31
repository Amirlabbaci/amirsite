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
    Progress
} from "@chakra-ui/react";

// Hooks
import { useState } from "react";

// Icons
import { FaMicrophone } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

// Libraries
import axios from "axios";
import audioBufferToWav from 'audiobuffer-to-wav';

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

    const [ProgressStart, setProgressStart] = useState(false)
    const [ProgressInterval, setProgressInterval] = useState(null)
    const [ProgressNumber, setProgressNumber] = useState(0)

    const [IsRecheck, setIsRecheck] = useState(false)


    const toast = useToast()
    const navigate = useNavigate()

    const nextStep = () => {
        setStep(step + 1)
    }

    const recordAudio = async (interval) => {
        setProgressStart(true);
        setRecording(true);
        setProgressNumber(0);

        const constraints = {
            audio: {
                sampleRate: 48000,
                channelCount: 1,
            },
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const mediaStreamSource = audioContext.createMediaStreamSource(stream);
        const recorder = new Recorder(mediaStreamSource, { sampleRate: 48000 });

        recorder.record();

        const startTime = Date.now(); // Get the start time

        setTimeout(() => {
            recorder.stop();
            setRecording(false);

            recorder.exportWAV((audioBlob) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const arrayBuffer = reader.result;
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
                        const originalSampleRate = audioBuffer.sampleRate;
                        const targetSampleRate = 16000;

                        const channelData = audioBuffer.getChannelData(0); // Assuming mono audio

                        // Downsampling the audio buffer
                        const downsampledBuffer = downsampleBuffer(channelData, originalSampleRate, targetSampleRate);

                        // Creating a new AudioBuffer with the downsampled buffer and target sample rate
                        const newAudioBuffer = audioContext.createBuffer(1, downsampledBuffer.length, targetSampleRate);
                        const newChannelData = newAudioBuffer.getChannelData(0);
                        newChannelData.set(downsampledBuffer);

                        // Encoding the new AudioBuffer to WAV format
                        const wavBuffer = audioBufferToWav(newAudioBuffer);

                        // Creating a Blob from the WAV buffer
                        const wavBlob = new Blob([wavBuffer], { type: 'audio/wav' });

                        setRecordedAudio(wavBlob);
                        clearInterval(progressInterval);
                    });
                };
                reader.readAsArrayBuffer(audioBlob);
            });

            recorder.clear();
        }, 10000);

        // Calculate progress based on elapsed time
        const progressInterval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const progress = (elapsedTime / 10000) * 100; // Calculate progress percentage
            setProgressNumber(progress);
        }, 50);

    };

    const downsampleBuffer = (buffer, originalSampleRate, targetSampleRate) => {
        if (targetSampleRate === originalSampleRate) {
            return buffer;
        }

        if (targetSampleRate > originalSampleRate) {
            throw "Downsampling rate should be smaller than the original sample rate";
        }

        const sampleRateRatio = originalSampleRate / targetSampleRate;
        const newLength = Math.round(buffer.length / sampleRateRatio);
        const result = new Float32Array(newLength);
        let offsetResult = 0;
        let offsetBuffer = 0;

        while (offsetResult < result.length) {
            const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);

            // Use average value of skipped samples
            let accum = 0;
            let count = 0;
            for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
                accum += buffer[i];
                count++;
            }

            result[offsetResult] = accum / count;
            // Or you can simply get rid of the skipped samples:
            // result[offsetResult] = buffer[nextOffsetBuffer];

            offsetResult++;
            offsetBuffer = nextOffsetBuffer;
        }

        return result;
    }


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

                formData.append("file", RecordedAudio, "cough.wav");

                formData.append("is_recheck",IsRecheck);

                Symptoms.forEach((symptom) => {
                    if(SelectedSymptoms.includes(symptom[0])){
                        formData.append(symptom[0], true);
                    }else{
                        formData.append(symptom[0], false);
                    }
                });

                

                setChecking(true)
                axios.post("http://134.122.75.238:5000/predict", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Access-Control-Allow-Origin": "*",
                    },
                })
                    .then((res) => {
                        if (res.data.code == 2) {
                            throw new Error(res.data.result)
                        }
                        navigate('/result', { state: res.data });
                    })
                    .catch((err) => {
                        toast({
                            title:  err.message || "Please provide another Cough Test",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                        })
                    })
                    .finally(() => {
                        setChecking(false);
                        setIsRecheck(true);
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
                        <Progress
                            value={ProgressNumber}
                            borderRadius='50px'
                            w='100%'
                            h='20px'
                            color='green.500'
                            colorScheme='green'
                            mb='30px'
                            style={{
                                visibility: (ProgressStart) ? "visible" : "hidden"
                            }}
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