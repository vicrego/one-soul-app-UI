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
import axios from 'axios';


const Challenge_Chapter = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { courseId, chapterId, chapterOrder, chapterName, props } = location.state;
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    borderRadius: '1.5rem',
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
    '&:hover': {
      backgroundColor: teal[700],
    },
  }));

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
      navigate("/topics", {state:{chapterId, props, courseId, challengeChapter: true}});
    }
  };

  //const [chapterProgress, setChapterProgress] = useState(0);

  /*
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5050/auth/getUserProgress",
      params: { course_id: courseId }  // Send course_id to identify the user's progress
    })
    .then((res) => {
      console.log("res data challenge",res)
      setChapterProgress(res.data.chapter_progress);  // Update state with fetched data
    })
    .catch(err => {
      console.error("Error fetching progress:", err);
    });
  }, [courseId])
  */

  

  // Fetch user's current progress on mount


  /*

    1 - We get chapterProgress from database
    2 - If chapter Order (chapter user opened) is less than chapterProgress, there's no update on the 
    database. If chapter Order is higher than chapterProgress, we add 1 to chapterPRrogress.

  */
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      //url: "http://localhost:5050/auth/getUserProgress",
      url: "https://one-soul-server.onrender.com/auth/getUserProgress",
      params: { course_id: courseId }
    })
    .then((res) => {
      const currentProgress = res.data.chapter_progress;
      if ((currentProgress < chapterOrder)) {
        userProgress(currentProgress);
      } else {
        console.log("currentProgress > chapterOrder")
      }
    })
    .catch((err) => {
      console.log("err", err)
    });
  }, [courseId]); 

  
  function userProgress(currentProgress: number) {
    const updatedProgress = currentProgress + 1;  
    axios({
      method: "PUT",
      data: {
        courseId: courseId,
        chapterProgress: updatedProgress,
      },
      withCredentials: true,
      //url: "http://localhost:5050/auth/userProgressCounter", //DEVELOPMENT
      url: "https://one-soul-server.onrender.com/auth/userProgressCounter" //PRODUCTION
    })
    .then((res) => {
      console.log("")
    })
    .catch((err) => {
      console.log("Error updating progress:", err);
    });
  }


  /*
  useEffect(() => {
    let chapterProgress = 0;
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5050/auth/getUserProgress",
      params: { course_id: courseId }  // Send course_id to identify the user's progress
    })
    .then((res) => {
      chapterProgress = res.data.chapter_progress;  // Update state with fetched data
    })
    .catch(err => {
      console.error("Error fetching progress:", err);
    });
    console.log("chapterProgress", chapterProgress);
    console.log("chapterId", chapterId);
    
    if(chapterProgress < chapterId){
      
      userProgress(chapterProgress);
    } else {
      console.log("chapterProgress is > chapterId")}

  }, [])

  function userProgress(chapterProgress: number) {
    console.log("chapterId", chapterId);
    chapterProgress = chapterProgress ++;
    console.log("chapter_progress", chapterProgress);
    
      axios({
        method: "PUT",
        data: {
          courseId: courseId,
          chapterProgress: chapterProgress,
        },
        withCredentials: true,
        url: "http://localhost:5050/auth/userProgressCounter",
      }).then((res) => {
        const {chapter_progress, course_id} = res.data; 
      }).catch(err => {
        console.log("err cat", err)   
      });
  }
  */
  
  return (
    <Layoult props={props.props}>
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
              state={{courseId: courseId, props: props}}
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

