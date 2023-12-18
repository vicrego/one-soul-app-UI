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


const Topics = () => {

  const location = useLocation();
  const { chapterTitle } = location.state;
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
        const responseTopic = await getTopic();
        setSteps(responseTopic?.data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchData();
  }, []);


  const theme = extendTheme();
  
  const filteredSteps = steps?.filter((step) => step.attributes?.chapter.data.attributes.title === chapterTitle);
  console.log('filteredSteps',filteredSteps);
  const [activeStep, setActiveStep] = React.useState(0);
  const title = filteredSteps && filteredSteps[activeStep]?.attributes?.title;
  const type = filteredSteps && filteredSteps[activeStep]?.attributes?.type;
  const image = filteredSteps && `http://localhost:1337${filteredSteps[activeStep]?.attributes?.image.data?.attributes?.url}`;
 
  const content = filteredSteps && filteredSteps[activeStep]?.attributes?.content.split("\\n");

  const hasCompletedAllSteps = activeStep === filteredSteps?.length;
  const bg = useColorModeValue("gray.200", "gray.700");
  const isSmallScreen = useMediaQuery('(max-width: 1090px)');

   
  const maxSteps: number = filteredSteps ? filteredSteps.length : 0;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  return (
    
    <Stack 
      style={{
      display: "block",
      backgroundColor: "rgba(253, 230, 179)",
      borderColor: "red", 
      borderWidth: "2.2px",
      borderRadius: "1rem",
      margin: "0.5rem 4rem",
      padding: "1rem",
      overflow: "auto"
    }}>
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
            <ChakraLink as={ReactRouterLink} 
              type='button'
              to="/task"
              state={{chapterTitle: chapterTitle}}
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
          <Stack sx={{width: '100%', px: "1rem" } } gap={3} >
            <Heading as={"h1"}>{title}</Heading>
            <Box>
              {content?.map((post: any) =>
                <Text key={post.id} marginBottom={3.5} >
                  {post}
                </Text>
              )}
            </Box>
          </Stack>
          )}
          {type === "theory" &&
          (
          <Stack sx={{ width: '100%', px: "1rem" } } gap={3}  >
            <Heading as={"h1"}>{title}</Heading>
            <Flex 
              justifyContent={"center"} 
              sx={{width: '100%', px: "1rem" }} 
              flexWrap={"wrap"} 
              gap={5} 
            >
              <Box width={isSmallScreen ? "100%" : "50%"}>
                {content?.map((post: any) =>
                  <Text key={post.id} marginBottom={3.5}>
                    {post}
                  </Text>
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
                  borderWidth: 5, 
                  borderStyle: "dotted", 
                  backgroundColor: 'beige', 
                  borderRadius: '1rem', 
                  borderColor: "red",
                  marginTop: "3rem"
                }} 
                p={6}
              >
                <b>Exercise!</b>
                {content?.map((post: any) =>
                  <Text textAlign={'start'} key={post.id}>{post}</Text>
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
  )
}

export default Topics






