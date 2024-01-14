import React, { useEffect, useState } from 'react';
import { Link as ChakraLink, LinkProps, /*Button*/ Box, Flex, HStack, Heading, MenuItemOption, Stack, Text, useColorModeValue, ButtonGroup, extendTheme, VStack} from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import { getChapter } from '../../../api/api';
import Button from '@mui/material/Button';
import { ButtonProps, styled } from '@mui/material';
import { purple, blue, teal } from '@mui/material/colors';


const Chapter = () => {

  const location = useLocation();
  const { courseTitle, props } = location.state;
  
  //const [chapters, setChapters] = useState<any[]>();
  
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
        //GET data from /courses API and set them
        const responseChapter = await getChapter();
        setChapters(responseChapter?.data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchData();
  }, []);

*/
  
  return (    
    <VStack 
      p={10} 
      style={{height: "100%"}} 
      gap={2}
    >
      {props.chapters?.filter(chapter => chapter.attributes.course.data.attributes.title === courseTitle).map(filterChapter => (
        <ChakraLink as={ReactRouterLink} 
          type='button'
          to="/topics"
          state={{courseTitle: courseTitle, chapterTitle: filterChapter?.attributes?.title, props: props}}
          key={filterChapter.id}
        >
          <ColorButton variant="contained" size="large">
            {filterChapter?.attributes?.title}
          </ColorButton>
        </ChakraLink>
      ))}      
    </VStack>
    
  )
}
export default Chapter