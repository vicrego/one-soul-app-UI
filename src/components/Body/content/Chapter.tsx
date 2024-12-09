import { useState } from 'react';
import { Link as ChakraLink, Box, Heading, VStack} from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ButtonProps, styled, CircularProgress, useMediaQuery } from '@mui/material';
import { purple, teal } from '@mui/material/colors';
import Layoult from '../../Layoult/Layoult';

  
const Chapter = () => {

  //HERE ONLY CHAPTER IS BEING PASSED. I THINK I SHOULD PASS THE ENTIRE PROPS. THEREFORE
  //I NEED TO SORT OUT A WAY TO CREATE AN ARRAY WITH ALL CATEGORIES INTO ONE, AND PASS AS THE FULL PROP

  const location = useLocation();
  const {  courseName, props } = location.state;
  console.log("props", props.props)
  console.log("courseTitle", courseName)
  
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    borderRadius: '1rem',
    //color: theme.palette.getContrastText(teal[500]),
    backgroundColor: purple[900],
    '&:hover': {
      backgroundColor: purple[0],
    },
  }));

  const [onLoaded, setLoaded] = useState<any[]>(true); //THIS SHOULD BE FALSE ONCE WE HAVE THE IMAGE ICON FOR BUTTONS

  const [currentTabIndex, setCurrentTabIndex] = useState(0);
 
  const handleTabChange = (e, tabIndex: any) => {
    setCurrentTabIndex(tabIndex);
  };
    
  const StyledTab = styled(Tab)({
    "&.Mui-selected": {
      color: "#C0C0C0"
    }
  });

  const isSmallHeight = useMediaQuery('(max-height: 592px)');
  const isMediumHeight = useMediaQuery('(max-height: 789px)');


  return ( 
    <Layoult props={props}>   
      <Box 
        p={5} 
        gap={2}
        height={isSmallHeight ? "60vh" : "100vh"}
        maxHeight={isMediumHeight ? "75vh" : "80vh" }
      >

        <Tabs indicatorColor="secondary" value={currentTabIndex} onChange={handleTabChange}  centered>
          <StyledTab sx={{ color: '#FDE5B3' }} label="Chapters" />
          <StyledTab sx={{ color: '#FDE5B3' }} label="Challenge" />
        </Tabs>
        {currentTabIndex === 0 && (
          <VStack p={5}> 
            {props.props.chapters?.filter((chapter: any) => chapter.course_name === courseName).map((filterChapter: any) => (
            <>
              <ChakraLink as={ReactRouterLink} 
                type='button'
                to="/topics"
                state={{courseName: courseName, chapterName: filterChapter.chapter_name, props}}
                key={filterChapter.id}
              >
                <ColorButton variant="contained" 
                  endIcon={
                    <img
                      rel="stylesheet"
                      //src={`http://localhost:1337${filterChapter.attributes?.image.data?.attributes?.url}`}
                      type="css/style.css"
                      width={50}
                      onLoad={() => setLoaded(true)}
                  />}
                  //sx={{backgroundColor: "blue"}}
                > 
                  {onLoaded ? (
                    <>
                      {filterChapter?.chapter_name}
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
            {props.props.challenges?.filter((challenge: any) => challenge.course_name === courseName).map((filterChallenge: any) => (
              <VStack >
                <ChakraLink as={ReactRouterLink} 
                  className="button-83" 
                  type='button'
                  to="/challenges"
                  state={{courseName: courseName, challengeDifficulty: filterChallenge?.difficulty_level, props}}
                >
                  {filterChallenge?.challenge_name}
                </ChakraLink> 
              </VStack>
            ))} 
          </VStack>
        )}
      
             
      </Box>
        <ChakraLink as={ReactRouterLink}
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