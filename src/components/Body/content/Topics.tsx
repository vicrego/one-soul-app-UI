import React, { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Box, MobileStepper, Stack, Typography, useMediaQuery } from '@mui/material';
import {
  Experimental_CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';
import { ButtonProps, styled } from '@mui/material';
import Layoult from '../../Layoult/Layoult';
import { TypeAnimation } from 'react-type-animation';
import Background from '../../../assets/images/topics/social-development-1.jpeg';


const Topics = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { courseId, chapterId, chapterOrder, props, challengeChapter } = location.state;
  console.log("props: ", props)
  
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    borderRadius: '1.5rem',
    backgroundColor: "purple"
  }));


  //const [propsTest, setPropsTest] = useState<any>();

  //useEffect(() => {
  //const data = localStorage.getItem("props");
  //const propsTest = data !== null ? JSON.parse(data) : null;
  //console.log("data",data)
  //setPropsTest(propsTest);

  //}, [])

  //console.log(propsTest)

  const theme = extendTheme();

  const filteredSteps = props?.props.topics?.filter((topic: any) => topic.chapter_id === chapterId);
  const [activeStep, setActiveStep] = React.useState(0); 
  

  const title = filteredSteps[activeStep] && filteredSteps[activeStep].topic_name; /*: "great"*/
  const type = filteredSteps[activeStep] && filteredSteps && filteredSteps[activeStep].topic_type;
  
  let topicImgUrl: string;
  let image = filteredSteps[activeStep] && filteredSteps[activeStep].topic_image || undefined;
  
  if(import.meta.env.VITE_ENV === "development"){
    topicImgUrl = `./images-icons/courses/${image}`;
  } else {
    topicImgUrl = `./images-icons/courses/${image}`;
  }

  const content = filteredSteps[activeStep] && filteredSteps[activeStep].content.split("\\n");

  const hasCompletedAllSteps = activeStep === filteredSteps?.length;
  
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
      navigate("/chapters", {state:{courseId, props}});
    }
  };

  const styles = {
    backgroundColor: "white",
    py: "1.3rem",
  }
  
  return (
    <Layoult props={props.props}>
      <Stack 
        className="topics"
        style={{
          display: "block",
          borderRadius: "0.5rem",
          //overflowY: "auto",
          height: "85vh",
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
            <Stack 
              sx={{  
                p: isSmallScreen ? 10 : 20, 
                rounded: "0.4rem", 
                background: `url(${Background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: isSmallScreen ? "30rem" : "50%",
                backgroundPositionX: "center",
                justifyContent: "space-between"
             }}>
              <Typography fontSize="xl" textAlign={"center"}>
                <TypeAnimation
                  sequence={[
                    'Congratulations! \n All steps were completed.', // Types 'One'
                    1000, // Waits 1s
                  ]}
                  wrapper="span"
                  cursor={false}
                  style={{ whiteSpace: 'pre-line', fontSize: isSmallScreen ? '1.2em' : '1.5em', display: 'block', color: 'white' }}
                />
              </Typography>
              <Link
                type='button'
                to="/tasks"
                state={{courseId: courseId, chapterId: chapterId, chapterOrder: chapterOrder, /*chapterName ,*/ props}}
              >
                <ColorButton variant="contained" size="large">
                  Challenge!
                </ColorButton>
              </Link>    
            </Stack>
          </>
        ) : (
          <>
            {type === "introduction" &&
            (
            <Stack sx={{width: '100%'} }  >
              <Typography variant='h3' fontFamily={"initial"} mb={3}>{title}</Typography>
              <Box>
                {content?.map((post: any, id: any) =>
                  <Typography fontFamily={"initial"} key={id} marginBottom={3.5} >
                    {post}
                  </Typography>
                )}
              </Box>
            </Stack>
            )}
            {type === "theory" &&
            (
              <Stack 
              sx={{ 
                width: '100%', 
                py: styles.py, 
                backgroundColor: styles.backgroundColor, 
                borderRadius: "0.7rem" 
              }}
              flexWrap="wrap"
            >
              <Typography 
                variant='h3' 
                fontFamily="initial" 
                sx={{ marginBottom: "1.5rem" }}
              >
                {title}
              </Typography>
            
              <Stack
                direction={{ xs: 'column', md: 'row' }} // Responsive layout
                justifyContent="center"
                alignItems="center"
                sx={{ px: "1.4rem", gap: 5 }}
                flexWrap="wrap"
              >
                <Box width={{ xs: "100%", md: image ? "50%" : "100%" }}>
                  {content?.map((post: any, id: any) => (
                    <Typography 
                      fontFamily="initial" 
                      textAlign="justify" 
                      key={id} 
                      marginBottom={3}
                    >
                      {post}
                    </Typography>
                  ))}
                </Box>
            
                {image && (
                  <Box
                    component="img"
                    src={`./images-icons/courses/${image}`}
                    sx={{
                      width: { xs: "100%", md: '300px', sm: '300px' },
                      borderRadius: "20%",
                      mx: "auto"
                    }}
                  />
                )}
              </Stack>
            </Stack>
            )}
            {type === "exercise" &&
            (
              <Stack sx={{ width: '100%', py: styles.py }} >
                <Typography variant='h3' fontFamily="initial" sx={{ color: "white" }}>
                  {title}
                </Typography>
            
                <Stack
                  direction={{ xs: 'column', md: 'row' }} // Responsive layout
                  alignItems="center"
                  justifyContent="center"
                  gap={5}
                  flexWrap="wrap"
                >
                  <Box
                    width={{ xs: '100%', md: '50%' }}
                    sx={{
                      borderWidth: 1.5,
                      borderStyle: "dotted",
                      backgroundColor: styles.backgroundColor,
                      borderRadius: '1rem',
                      borderColor: "red",
                      py: 3,
                      mt: 2
                    }}
                  >
                    <b>Exercise!</b>
                    {content?.map((post: any, id: any) => (
                      <Typography
                        fontFamily="initial"
                        textAlign="start"
                        key={id}
                        px={5}
                      >
                        {post}
                      </Typography>
                    ))}
                  </Box>
              
                  <Box
                    component="img"
                    src={topicImgUrl}
                    sx={{
                      width: { xs: '100%', md: '400px', sm: '400px' },
                      borderRadius: "20%",
                      mx: "auto",
                    }}
                  />
                </Stack>
              </Stack>
            )}
          </>
        )}
      </Stack>
    </Layoult>
  )
}

export default Topics






