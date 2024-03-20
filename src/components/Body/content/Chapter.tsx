import React, { useEffect, useState } from 'react';
import { Link as ChakraLink, LinkProps, Box, Flex, HStack, Heading, MenuItemOption, Stack, Text, useColorModeValue, ButtonGroup, extendTheme, VStack} from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ButtonProps, styled, CircularProgress } from '@mui/material';
import { teal } from '@mui/material/colors';
import Layoult from '../../Layoult/Layoult';

  
const Chapter = () => {

  const location = useLocation();
  const { courseTitle, props } = location.state;
  
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    borderRadius: '1.5rem',
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
    '&:hover': {
      backgroundColor: teal[700],
    },
  }));
  /*
  const ChallengeButton = styled(Button)<ButtonProps>(({ theme }) => ({
    borderRadius: '5rem',
    height: "5rem",
    backgroundColor: "red",
    '&:hover': {
      backgroundColor: teal[700],
    }

  }));
*/

  const [onLoaded, setLoaded] = useState<any[]>(false);

  const [currentTabIndex, setCurrentTabIndex] = useState(0);
 
  const handleTabChange = (e, tabIndex) => {
    setCurrentTabIndex(tabIndex);
  };
  

  
  const StyledTab = styled(Tab)({
    "&.Mui-selected": {
      color: "#C0C0C0"
    }
  });
  
  console.log("props here", props)

  return ( 
    <Layoult props={props}>   
      <Box 
        p={10} 
        style={{height: "92vh"}} 
        gap={2}
      >
        <Tabs indicatorColor="secondary" value={currentTabIndex} onChange={handleTabChange}  centered>
          <StyledTab sx={{ color: '#FDE5B3' }} label="Chapters" />
          <StyledTab sx={{ color: '#FDE5B3' }} label="Challenge" />
        </Tabs>
        {currentTabIndex === 0 && (
          <VStack p={5}>
            {props.chapters?.filter(chapter => chapter.attributes.course.data.attributes.title === courseTitle).map(filterChapter => (
            <>
              <ChakraLink as={ReactRouterLink} 
                type='button'
                to="/topics"
                state={{courseTitle: courseTitle, chapterTitle: filterChapter?.attributes?.title, props}}
                key={filterChapter.id}
              >
                <ColorButton variant="contained" 
                  endIcon={
                    <img
                      rel="stylesheet"
                      src={`http://localhost:1337${filterChapter.attributes?.image.data?.attributes?.url}`}
                      type="css/style.css"
                      width={50}
                      onLoad={() => setLoaded(true)}
                  />}
                >
                  {onLoaded ? (
                    <>
                      {filterChapter?.attributes?.title}
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
            {props.challengeLevels?.filter(challengeLevel => challengeLevel.attributes.course.data.attributes.title === courseTitle).map(filterChallengeLevel => (
              <VStack >
                <ChakraLink as={ReactRouterLink} 
                  class="button-19" 
                  type='button'
                  to="/challenges"
                  state={{courseTitle: courseTitle, props}}
                >
                  {filterChallengeLevel?.attributes?.title}
                </ChakraLink> 
              </VStack>
            ))} 
          </VStack>
        )}
          
             
      </Box>
      <ChakraLink as={ReactRouterLink} 
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