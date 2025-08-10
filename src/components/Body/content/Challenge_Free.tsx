import React, { useEffect, useState } from 'react';
import { Link as ReactRouterLink, useNavigate, useLocation, Link } from 'react-router-dom';
import Layoult from '../../Layoult/Layoult';
import Button from '@mui/material/Button';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { teal } from '@mui/material/colors';
import { ButtonProps, styled, MobileStepper, Box, Stack, Typography } from '@mui/material';


const Challenge_Free = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { courseId, challengeDifficulty, props } = location.state;

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    borderRadius: '1.5rem',
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
    '&:hover': {
      backgroundColor: teal[700],
    },
  }));
  const theme = extendTheme();

  const filteredSteps = props.props.challengesFree?.filter((challenge: any) => challenge.difficulty_level === challengeDifficulty);
  const [activeStep, setActiveStep] = React.useState(0);
  
  const title = filteredSteps?.[activeStep] && filteredSteps?.[activeStep].challenge_name; /*: "great"*/;
  const content = filteredSteps?.[activeStep] && filteredSteps?.[activeStep].challenge_content?.split("\\n");
  
  const hasCompletedAllSteps = activeStep === filteredSteps?.length;
  
  const maxSteps: number = filteredSteps ? (filteredSteps.length + 1) : 0;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if(activeStep === 0){
      navigate("/chapters", {state:{courseId, props, challenge_Free: true}});
    }
  };
  
  return (
    <Layoult props={props.props}>   
      <Stack
        className="challenges"
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
          <Box sx={{ my: 8, p: 8, rounded: "md" }}>
            <Typography fontFamily={"initial"} variant='h4' textAlign={"center"}>
              Woohoo! 
            </Typography>
            <Link 
              type='button'
              to="/chapters"
              state={{courseId: courseId, props, challenge_Free: true}}
            >
              <ColorButton variant="contained" size="large">
                Complete
              </ColorButton>
            </Link>    
          </Box>
        </>
        ) : (
          <Stack /*sx={{ width: '100%' } }*/>
            <Typography fontFamily={"initial"} variant='h3' mb={3}>{title}</Typography>
              <>
                {content?.map((post: any, id: any) =>
                  <Typography fontFamily={"initial"} key={id}>{post}</Typography>
                )}
              </>
          </Stack>
        )}
      </Stack>
    </Layoult>
  )
}

export default Challenge_Free