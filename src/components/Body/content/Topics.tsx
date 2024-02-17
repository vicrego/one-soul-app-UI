import React, { useEffect, useState } from 'react';
import { Link as ChakraLink, Box, Flex, HStack, Heading, MenuItemOption, Stack, Text, useColorModeValue} from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import {getTopic} from '../../../api/api';
//import { Stepper, Step, StepIndicator, StepStatus, StepTitle, StepDescription, StepNumber, StepIcon, StepSeparator, useSteps} from '@chakra-ui/stepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { MobileStepper, useMediaQuery } from '@mui/material';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';
import { ButtonProps, styled } from '@mui/material';
import { purple, blue, teal } from '@mui/material/colors';
import Layoult from '../../Layoult/Layoult';


const Topics = () => {

  const location = useLocation();
  const { courseTitle, chapterTitle, props } = location.state;
  
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    borderRadius: '1.5rem',
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
    '&:hover': {
      backgroundColor: teal[700],
    },
  }));

  const theme = extendTheme();
  
  const filteredSteps = props.chapters?.filter((chapter) => chapter.attributes?.title === chapterTitle)[0].attributes.topics;
  
  const [activeStep, setActiveStep] = React.useState(0);
  
  
  const title = filteredSteps.data[activeStep] && filteredSteps?.data[activeStep].attributes?.title /*: "great"*/;
  const type = filteredSteps.data[activeStep] && filteredSteps.data && filteredSteps?.data[activeStep].attributes?.type;
  
  
  //console.log("image", props.topics.map((data)=> data.attributes.image).map((data) => data.data?.id));
  
  
  
  //let image = filteredSteps && `http://localhost:1337${filteredSteps?.data[activeStep].attributes?.image.data?.attributes?.url}`;
  //let image = filteredSteps && `http://localhost:1337${filteredSteps[activeStep]?.attributes?.image.data?.attributes?.url}`;
  let image = props.topics[activeStep].attributes;

  //[activeStep].data.attributes.image.map((data) => data.data?.id
  //console.log("here", image)
  
  if(image === "http://localhost:1337undefined"){
    image = undefined;
  };

  console.log("filteredSteps Topics", filteredSteps.data)
  
  const content = filteredSteps.data[activeStep] && filteredSteps?.data[activeStep].attributes?.content.split("\\n");

  const hasCompletedAllSteps = activeStep === filteredSteps?.data.length;
  
  const bg = useColorModeValue("gray.200", "gray.700");
  const isSmallScreen = useMediaQuery('(max-width: 1090px)');

  const maxSteps: number = filteredSteps.data ? (filteredSteps?.data.length + 1) : 0;

  

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  return (
    <Layoult props={props}>
      <Stack 
        className="topics"
        style={{
          display: "block",
          backgroundColor: "rgba(253, 230, 179)",
          borderRadius: "0.5rem",
          margin: "0.5rem 4rem",
          padding: "1rem",
          overflowY: "auto",
          height: "85vh"
        }}
      >
        <MobileStepper
          variant="progress"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{ 
            mx: "10%", 
            borderRadius: "1.5rem", 
            flexGrow: 1,
            padding: "0.3%",
            backgroundColor: "rgb(97 117 138)", 
          }}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1} sx={{color: "rgb(239, 247, 255)"}}>
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0} sx={{color: "rgb(239, 247, 255)"}}>
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
                to="/task"
                state={{courseTitle: courseTitle, chapterTitle: chapterTitle, props}}
              >
                <ColorButton variant="contained" size="large">
                  Challenge!
                </ColorButton>
              </ChakraLink>    
            </Box>
          </>
        ) : (
          <>
            {type === "introduction" &&
            (
            <Stack sx={{width: '100%', px: "1rem" } }  >
              <Heading as={"h1"} mb={3}>{title}</Heading>
              <Box>
                {content?.map((post: any, id: any) =>
                  <Text key={id} marginBottom={3.5} >
                    {post}
                  </Text>
                )}
              </Box>
            </Stack>
            )}
            {type === "theory" &&
            (
            <Stack sx={{ width: '100%', px: "1rem" } }  >
              <Heading as={"h1"} gap={3}>{title}</Heading>
              <Flex 
                justifyContent={"center"} 
                sx={{width: '100%', px: "1rem" }} 
                flexWrap={"wrap"} 
                gap={5} 
              >
                <Box width={isSmallScreen || image == undefined ? "100%" : "50%"}>
                  {content?.map((post: any, id: any) =>
                    <Text key={id} marginBottom={3.5}>
                      {post}
                    </Text>
                  )}
                </Box>
                {image !== undefined &&
                  <img 
                    margin-left={'auto'}
                    margin-right={'auto'}
                    width={'400rem'}
                    src={image}
                    style={{borderRadius: "20%"}}
                  />
                }
              </Flex>
            </Stack>
            )}
            {type === "exercise" &&
            (
            <Stack sx={{ width: '100%', px: "1rem" }}  >
              <Heading as={"h1"}>{title}</Heading>
              <Flex 
                style={{alignItems:"flex-start"}} 
                justifyContent={"center"} 
                gap={5} 
                flexWrap={"wrap"}>
                <Box 
                  width={isSmallScreen ? "100%" : "50%"}
                  style={{
                    borderWidth: 1.5, 
                    borderStyle: "dotted", 
                    backgroundColor: 'beige', 
                    borderRadius: '1rem', 
                    borderColor: "red",
                    marginTop: "3rem"
                  }} 
                  p={6}
                >
                  <b>Exercise!</b>
                  {content?.map((post: any, id: any) =>
                    <Text textAlign={'start'} key={id}>{post}</Text>
                  )}
                </Box>
                <img 
                  margin-left={'auto'}
                  margin-right={'auto'}
                  width={'400rem'}
                  src={image}
                  style={{borderRadius: "20%"}}
                />
              </Flex>
            </Stack>
            )}
          </>
        )}
      </Stack>
    </Layoult>
  )
}

export default Topics






