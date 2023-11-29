import React, { useEffect, useState } from 'react';
import { Box, Flex, HStack, Heading, MenuItemOption, Stack, Text, useColorModeValue} from '@chakra-ui/react';
import {getLessonTask} from '../../../api/api';
//import { Stepper, Step, StepIndicator, StepStatus, StepTitle, StepDescription, StepNumber, StepIcon, StepSeparator, useSteps} from '@chakra-ui/stepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { MobileStepper } from '@mui/material';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';
import { useLocation } from 'react-router-dom';


const Task = () => {

  
  const location = useLocation();
  const { chapterTitle } = location.state;
  
  const [steps, setSteps] = useState<any[]>();
  //const [type, setType] = useState();

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTopic = await getLessonTask();
        setSteps(responseTopic?.data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchData();
  }, []);
  

  console.log('steps', steps);
  //console.log('chapterTitle', chapterTitle);


  const theme = extendTheme();
  const filteredSteps = steps?.filter((step) => step.attributes?.chapter.data.attributes.title === chapterTitle);
  const [activeStep, setActiveStep] = React.useState(0);
  //const title = filteredSteps && filteredSteps[activeStep]?.attributes?.title;
  const type = filteredSteps && filteredSteps[activeStep]?.attributes?.type;
  //const image = filteredSteps && `http://localhost:1337${filteredSteps[activeStep]?.attributes?.image.data?.attributes?.url}`;
 
  const content = filteredSteps && filteredSteps[activeStep]?.attributes?.content;
  const hasCompletedAllSteps = activeStep === filteredSteps?.length;
  const bg = useColorModeValue("gray.200", "gray.700");
   
  const maxSteps: number = filteredSteps ? filteredSteps.length : 0;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Stack style={{
      height: "100%", 
      display: "block",
      backgroundColor: "rgba(253, 230, 179)",
      borderColor: "red", 
      borderWidth: "2.2px",
      borderRadius: "1rem",
      margin: "0.5rem",
      padding: "0.5rem"
    }}>
    <MobileStepper
      variant="progress"
      steps={maxSteps}
      position="static"
      activeStep={activeStep}
      sx={{  
        flexGrow: 1, 
        mx: "10%", 
        borderRadius: "1.5rem", 
        backgroundColor: "rgb(138, 97, 130)", 
      }}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps}>
          Next
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />

    {hasCompletedAllSteps ? (
      <>
      <Box sx={{ bg, my: 8, p: 8, rounded: "md" }}>
        <Heading fontSize="xl" textAlign={"center"}>
          Woohoo! All steps completed! 🎉
        </Heading>
      </Box>
      </>
      ) : (
      <>
        {type === "warmUp" &&
        (
        <Stack sx={{ height: 255, width: '100%', px: "10%" } } gap={3} >
          <Heading as={"h1"}>Challenge</Heading>
          <Text p={5}>{content}</Text>
        </Stack>
        )}
        {type === "task" &&
        (
        <Stack sx={{ height: 255,width: '100%', px: "10%" } } gap={3} >
          <Heading as={"h1"}>Challenge</Heading>
          <Text p={5}>{content}</Text>
        </Stack>
        )}
      </>
    )}
  </Stack>

  )
}

export default Task

