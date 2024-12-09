import React, { useEffect, useState } from 'react';
import { Link as ChakraLink, Box, Flex, HStack, Heading, MenuItemOption, Stack, Text, useColorModeValue} from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate, useLocation } from 'react-router-dom';
//import {getLessonTask} from '../../../api/api';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { ButtonProps, styled, MobileStepper } from '@mui/material';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';
import { purple, blue, teal } from '@mui/material/colors';
import Layoult from '../../Layoult/Layoult';


const Challenge_Chapter = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { courseName, chapterName, props } = location.state;
  console.log("props",props)
  console.log("chapterTitle",chapterName)
  const [steps, setSteps] = useState<any[]>();

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    borderRadius: '1.5rem',
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
    '&:hover': {
      backgroundColor: teal[700],
    },
  }));

  /*
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
  */


  const theme = extendTheme();
  const filteredSteps = props.props?.challengesChapter.filter((challenge: any) => challenge.chapter_name === chapterName);
  const [activeStep, setActiveStep] = React.useState(0);
  const type = filteredSteps && filteredSteps[activeStep]?.challenge_type;
  const order = filteredSteps && filteredSteps[activeStep]?.challenge_order;
  
  const content = filteredSteps && filteredSteps[activeStep]?.challenge_content.split("\\n");

  //const content = filteredSteps && filteredSteps[activeStep]?.attributes?.content;
  const hasCompletedAllSteps = activeStep === filteredSteps?.length;
  const bg = useColorModeValue("gray.200", "gray.700");
   
  const maxSteps: number = filteredSteps ? (filteredSteps.length + 1) : 0;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if(activeStep === 0){
      navigate("/topics", {state:{chapterName, props, courseName, challengeChapter: true}});
    }
  };

  
  return (
    <Layoult props={props}>
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
          <Button size="small" onClick={handleBack} >
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
              Woohoo! 
            </Heading>
            <ChakraLink as={ReactRouterLink} 
              type='button'
              to="/chapters"
              state={{courseTitle: courseName, props}}
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
  </Layoult>
  )
}

export default Challenge_Chapter

