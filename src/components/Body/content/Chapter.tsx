import { useEffect, useState } from 'react';
import { Link as ChakraLink, Box, Heading, VStack, Center, filter, Text} from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ButtonProps, styled, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { purple, red, teal } from '@mui/material/colors';
import Layoult from '../../Layoult/Layoult';
import { color } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../../../provider/authProvider';

const Chapter = () => {

  //HERE ONLY CHAPTER IS BEING PASSED. I THINK I SHOULD PASS THE ENTIRE PROPS. THEREFORE
  //I NEED TO SORT OUT A WAY TO CREATE AN ARRAY WITH ALL CATEGORIES INTO ONE, AND PASS AS THE FULL PROP

  const location = useLocation();
  
  const { courseId, props, challenge_Free } = location.state;
  
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    borderRadius: '1rem',
    backgroundColor: purple[900],
    '&:hover': {
      backgroundColor: "purple",
    },
  }));

  const [onLoaded, setLoaded] = useState<boolean>(true); //THIS SHOULD BE FALSE ONCE WE HAVE THE IMAGE ICON FOR BUTTONS
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [chapterProgress, setChapterProgress] = useState<number>(0); 
  const [status, setStatus] = useState<any>("");

  const handleTabChange = (e: any, tabIndex: any) => {
    setCurrentTabIndex(tabIndex);
  };
    
  const StyledTab = styled(Tab)({
    "&.Mui-selected": {
      color: "#C0C0C0",
    }
  });

  const isSmallHeight = useMediaQuery('(max-height: 592px)');
  const isMediumHeight = useMediaQuery('(max-height: 789px)');

  useEffect(() => {
    if(challenge_Free){
      setCurrentTabIndex(1);
    }
    //const data = localStorage.getItem("props");
  }, [props])

  useEffect(() => {
    progress();
  }, []);

  function progress() {
    
    axios({
      method: "GET",
      
      withCredentials: true,
      url: "http://localhost:5050/auth/getUserProgress",
    }).then((res) => {
      const chapterProgress = res.data.chapter_progress + 1;
      setChapterProgress(chapterProgress);
    }).catch(err => {
      if (err.response === undefined) {
        setStatus({
          sent: false,
          msg: `Error! Something unusual has happened. Please try again later.`
        });
      }
      if (err.response.status === 400) {
        setStatus({
          sent: false,
          msg: `Username or Password is wrong. Please try again.`
        });
      } 
      if (err.response.status === 404) {
        setStatus({
          sent: false,
          msg: `Error! Request failed with status code ${err.response.status}. Please try again later.`
        });
      } 
    });
  }
  

  return ( 
    <Layoult props={props.props}>   
      <Box 
        p={5} 
        gap={2}
        height={isSmallHeight ? "60vh" : "100vh"}
        maxHeight={isMediumHeight ? "75vh" : "80vh" }
      >
        <Tabs indicatorColor="secondary" value={currentTabIndex} onChange={handleTabChange}  centered>
          <StyledTab sx={{color: "white", fontFamily: "mono"}} label="Chapters" />
          <StyledTab sx={{color: "white", fontFamily: "mono"}} label="Challenge" />
        </Tabs>

        {/* TAB 1 Contents */}
        {currentTabIndex === 0 && (
          <VStack p={5}> 
            {props?.props.chapters?.filter((chapter: any) => chapter.course_id === courseId).map((filterChapter: any) => (
            <>
              <ChakraLink as={ReactRouterLink} 
                type='button'
                to="/topics"
                state={{courseId: courseId, chapterId: filterChapter.chapter_id, chapterOrder: filterChapter.chapter_order, props}}
                key={filterChapter.id} 
                pointerEvents={filterChapter.chapter_order > chapterProgress ? "none" : "auto"}
                //_disabled={ filterChapter.chapter_order > chapterProgress } 
              >
              <ColorButton variant="contained" 
                endIcon={
                  <img
                    rel="stylesheet"
                    //src={`http://localhost:1337${filterChapter.attributes?.image.data?.attributes?.url}`}
                    //type="css/style.css"
                    width={50}
                    
                    onLoad={() => setLoaded(true)}
                />}
                disabled={ filterChapter.chapter_order > chapterProgress }
              > 

                {onLoaded ? (
                  <>
                    <Typography  sx={{color: "white", fontFamily: "mono"}}>{filterChapter?.chapter_name}</Typography>
                  </>
                ) : (
                  <>
                    <CircularProgress />
                  </>
                  )
                }
                </ColorButton>
              </ChakraLink>
            </>
            ))} 
          </VStack>
        )}
          
        {/* TAB 2 Contents */}
        {currentTabIndex === 1 && (
          <VStack sx={{ p: 3 }}>
            {props.props.challenges?.filter((challenge: any) => challenge.course_id === courseId).map((filterChallenge: any) => (
              <Box 
                sx={{
                  backgroundColor: "white", 
                  p: 3, 
                  width: "100px", 
                  borderRadius: "10px",
                  "&:hover": {
                    background: "purple",
                  }
                }}>
                <ChakraLink as={ReactRouterLink} 
                  type='button'
                  to="/challenges"   
                  sx={{width: "200px"}}
                  state={{ courseId: courseId, challengeDifficulty: filterChallenge?.difficulty_level, props}}
                >
                  <Typography 
                      sx={{ 
                        color: "black", 
                        textAlign: "center",
                        "&:hover": {
                          color: "white",
                        }, 
                      }}
                  >
                    <Text>{filterChallenge?.challenge_name}</Text>
                  </Typography>
                </ChakraLink> 
              </Box>
            ))} 
          </VStack>
        )}
      </Box>
        <ChakraLink 
          as={ReactRouterLink}
          className="button-19"
          type='button'
          to="/home"
          state={props}
        >      
          <Heading>Back</Heading>
        </ChakraLink>
    </Layoult>
  )
}
export default Chapter