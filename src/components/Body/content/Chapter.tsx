import React, { useEffect, useState } from 'react';
import { Link as ChakraLink, LinkProps, /*Button*/ Box, Flex, HStack, Heading, MenuItemOption, Stack, Text, useColorModeValue, ButtonGroup, extendTheme, VStack} from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import { getChapter } from '../../../api/api';
import Button from '@mui/material/Button';
import { ButtonProps, styled, CircularProgress } from '@mui/material';
import { purple, blue, teal } from '@mui/material/colors';
import Icon from '@mui/material/Icon';


const Chapter = () => {

  const location = useLocation();
  const { courseTitle, props } = location.state;
  console.log("courseTitle",courseTitle);
  console.log("props",props);
  
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    borderRadius: '1.5rem',
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
    '&:hover': {
      backgroundColor: teal[700],
    },
  }));
  
  const [onLoaded, setLoaded] = useState<any[]>(false);

  
  return (    
    <VStack 
      p={10} 
      style={{height: "100%"}} 
      gap={2}
    >
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
    
  )
}
export default Chapter