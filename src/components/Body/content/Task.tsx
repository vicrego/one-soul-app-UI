import React, { useEffect, useState } from 'react';
import { Link as ChakraLink, Box, Flex, HStack, Heading, MenuItemOption, Stack, Text, useColorModeValue} from '@chakra-ui/react';

import { Link as ReactRouterLink, useLocation } from 'react-router-dom';


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
import { ButtonProps, styled } from '@mui/material';
import { purple, blue, teal } from '@mui/material/colors';


const Task = () => {

  const location = useLocation();
  const { chapterTitle, courseTitle } = location.state;
  
  const [steps, setSteps] = useState<any[]>();

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    borderRadius: '1.5rem',
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
    '&:hover': {
      backgroundColor: teal[700],
    },
  }));
  
  
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
  


  const theme = extendTheme();
  const filteredSteps = steps?.filter((step) => step.attributes?.chapter.data.attributes.title === chapterTitle);
  const [activeStep, setActiveStep] = React.useState(0);
  const type = filteredSteps && filteredSteps[activeStep]?.attributes?.type;
  
  const content = filteredSteps && filteredSteps[activeStep]?.attributes?.content.split("\\n");

  //const content = filteredSteps && filteredSteps[activeStep]?.attributes?.content;
  const hasCompletedAllSteps = activeStep === filteredSteps?.length;
  const bg = useColorModeValue("gray.200", "gray.700");
   
  const maxSteps: number = filteredSteps ? (filteredSteps.length + 1) : 0;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Stack
      className="topics"
      style={{
        display: "block",
        backgroundColor: "rgba(253, 230, 179)",
        borderRadius: "0.5rem",
        margin: "0.5rem 2rem",
        padding: "1rem",
        overflowY: "auto",
        height: "85vh", 
      }}>
    <MobileStepper
      variant="text"
      steps={maxSteps}
      position="static"
      activeStep={activeStep}
      sx={{  
        flexGrow: 1, 
        mx: "10%", 
        padding: "0.3%",
        borderRadius: "1.5rem", 
        backgroundColor: "rgb(138, 97, 130)", 
      }}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
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
          <ChakraLink as={ReactRouterLink} 
            type='button'
            to="/chapters"
            state={{courseTitle: courseTitle}}
          >
            <ColorButton variant="contained" size="large">
              Complete
            </ColorButton>
          </ChakraLink>    
        </Box>
      </>
      ) : (
      <Stack sx={{ width: '100%', px: "10%" } }>
        <Heading as={"h1"} mb={3}>Challenge</Heading>
        {type === "warmUp" && (
          <>
            {content?.map((post: any, id: any) =>
              <Text key={id}>{post}</Text>
            )}
          </>
        )}
        {type === "task" && (
          <>
            {content?.map((post: any, id: any) =>
              <Text key={id}>{post}</Text>
            )}
          </>
        )}
      </Stack>
    )}
  </Stack>

  )
}

export default Task

