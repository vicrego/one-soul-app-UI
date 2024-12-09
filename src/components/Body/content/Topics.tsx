import React, { useEffect, useState } from 'react';
import { Link as ChakraLink, Box, Flex, HStack, Heading, MenuItemOption, Stack, Text, useColorModeValue} from '@chakra-ui/react';
import { useNavigate, Link as ReactRouterLink, redirect, useLocation } from 'react-router-dom';
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
import { teal } from '@mui/material/colors';
import Layoult from '../../Layoult/Layoult';
import { TypeAnimation } from 'react-type-animation';
import Background from '../../../assets/images/topics/social-development-1.jpeg';


const Topics = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { courseName, chapterName, props, challengeChapter } = location.state;

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    borderRadius: '1.5rem',
    //color: theme.palette.getContrastText(teal[500]),
    backgroundColor: "purple"
    /*backgroundColor: teal[500],
    '&:hover': {
      backgroundColor: teal[700],
    },*/
  }));

  const theme = extendTheme();
  
  const filteredSteps = props.props.topics?.filter((topic: any) => topic.chapter_name === chapterName);
  console.log("filteredSteps", filteredSteps)
  const [activeStep, setActiveStep] = React.useState(0); 
  


  const title = filteredSteps[activeStep] && filteredSteps[activeStep].topic_name; /*: "great"*/
  console.log("title",title)
  const type = filteredSteps[activeStep] && filteredSteps && filteredSteps[activeStep].topic_type;
  console.log("type",type)
  
  let image = /*filteredSteps.data[activeStep]?.attributes?.image.data?.attributes?.url ||*/ undefined; // undefined, as we still need to database our images
  
  if(image === "http://localhost:1337undefined"){
    image = undefined;
  };

  const content = filteredSteps[activeStep] && filteredSteps[activeStep].content.split("\\n");
  console.log("content",content)
  

  const hasCompletedAllSteps = activeStep === filteredSteps?.length;
  
  const bg = useColorModeValue("gray.200", "gray.700");
  const isSmallScreen = useMediaQuery('(max-width: 1090px)');

  const maxSteps: number = filteredSteps ? (filteredSteps?.length + 1) : 0;

  useEffect(() => {
    if(challengeChapter){
      setActiveStep(maxSteps - 2);
    }
  }, [])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if(activeStep === 0){
      navigate("/chapters", {state:{courseName, props}});
    }
  };
  




  return (
    <Layoult props={props}>
      <Stack 
        className="topics"
        style={{
          display: "block",
          //backgroundColor: "rgba(253, 230, 179)",
          borderRadius: "0.5rem",
          //margin: "0.5rem 0.5rem",
          //padding: "0.5rem",
          overflowY: "auto",
          height: "85vh",
          //height: "50vh",
          //background: `url(${Background})`,
          //backgroundRepeat: "no-repeat",
          //backgroundSize: "cover"
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
            <Button size="small" onClick={handleBack} sx={{color: "rgb(239, 247, 255)"}}>
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
            <Box 
              sx={{  
                p: isSmallScreen ? 10 : 20, 
                rounded: "md", 
                //borderRadius: "1rem",
                background: `url(${Background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: isSmallScreen ? "100%" : "50%",
                //alignContent: "center",
                //height: isSmallScreen ? "" : "35vh",
                //backgroundSize: "50rem",
                backgroundPositionX: "center"
                
             }}>
              <Heading fontSize="xl" textAlign={"center"}>
                <TypeAnimation
                
                  sequence={[
                    'Congratulations! \n All steps were completed.', // Types 'One'
                    1000, // Waits 1s
                    () => {
                      console.log('Sequence completed');
                    },
                  ]}
                  wrapper="span"
                  cursor={false}
                  //repeat={Infinity}
                  //speed={75}
                  style={{ whiteSpace: 'pre-line', fontSize: isSmallScreen ? '1.2em' : '1.5em', display: 'block', color: 'white' }}
                />
              </Heading>
              <ChakraLink as={ReactRouterLink} 
                type='button'
                to="/tasks"
                state={{courseName: courseName, chapterName: chapterName, props}}
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
            <Stack sx={{ width: '100%', px: "1rem", bg:"rgba(253, 230, 179)", borderRadius: "1rem" } }  >
              <Heading as={"h1"} gap={3}>{title}</Heading>
              <Flex 
                justifyContent={"center"} 
                sx={{ px: "1rem" }} 
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
                    src={"http://localhost:1337" + image}
                    style={{borderRadius: "20%"}}
                  />
                }
              </Flex>
            </Stack>
            )}
            {type === "exercise" &&
            (
            <Stack sx={{ width: '100%', px: "1rem" }}  >
              <Heading as={"h1"} sx={{color: "white"}}>{title}</Heading>
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
                  src={"http://localhost:1337" + image}
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






