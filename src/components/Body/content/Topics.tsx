import React, { useEffect, useState } from 'react';
import { Box, Flex, HStack, Heading, MenuItemOption, Stack, Text, useColorModeValue} from '@chakra-ui/react';
import {getTopic} from '../../../api/api';

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


const Topics = () => {

  const location = useLocation();
  const { chapterTitle } = location.state;
  
  const [steps, setSteps] = useState<any[]>();
  //const [type, setType] = useState();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTopic = await getTopic();
        setSteps(responseTopic?.data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchData();
  }, []);


  const theme = extendTheme();
  //console.log('chapterTitle',chapterTitle)    chapter.attributes.course.data.attributes.title 
  const filteredSteps = steps?.filter((step) => step.attributes?.chapter.data.attributes.title === chapterTitle);
  console.log('filteredSteps',filteredSteps);
  const [activeStep, setActiveStep] = React.useState(0);
  const title = filteredSteps && filteredSteps[activeStep]?.attributes?.title;
  const type = filteredSteps && filteredSteps[activeStep]?.attributes?.type;
  

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
    
    <Stack style={{height: "100%"}} >
      <MobileStepper
        variant="progress"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ mx: "10%", flexGrow: 1 }}
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
          {type === "introduction" &&
          (
          <Stack sx={{ height: 255, width: '100%', px: "10%" } } gap={3} >
            <Heading as={"h1"}>{title}</Heading>
            <Text p={5}>{content}</Text>
          </Stack>
          )}
          {type === "theory" &&
          (
          <Stack sx={{ height: 255,width: '100%', px: "10%" } } gap={3} >
            <Heading as={"h1"}>{title}</Heading>
            <Text p={5}>{content}</Text>
          </Stack>
          )}
          {type === "exercise" &&
          (
          <Stack sx={{ height: 255,width: '100%', px: "15%" } } gap={3}  >
            <Heading as={"h1"}>{title}</Heading>
            <Box style={{borderWidth: 5, borderStyle: "dotted", backgroundColor: 'beige', borderRadius: '2rem', borderColor: "red"}} p={5}>
              <b>Exercise!</b>
              <Text textAlign={'start'}>
                 {content}
              </Text>
            </Box>
          </Stack>
          )}
          {type === "task" &&
          (
          <Stack sx={{ height: 255,width: '100%', px: "10%" } } gap={3} >
            <Heading as={"h1"}>{title}</Heading>
            <Text p={5}>{content}</Text>
          </Stack>
          )}
        </>
      )}
    </Stack>
  )
}

export default Topics






