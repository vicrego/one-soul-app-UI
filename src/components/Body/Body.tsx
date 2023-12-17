import React, { useEffect, useState } from 'react';
import { Link as ChakraLink, LinkProps, /*Button*/ Box, Flex, HStack, Heading, MenuItemOption, Stack, Text, useColorModeValue, ButtonGroup, extendTheme, VStack} from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import {getCourse} from '../../api/api';
import Button from '@mui/material/Button';
import { ButtonProps, styled, CircularProgress } from '@mui/material';
import { purple, blue, teal } from '@mui/material/colors';


const Body = () => {
  
  
  const [courses, setCourses] = useState<any[]>();

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    padding: '25px 0px',
    width: '150px',
    border: '1px solid',
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
        //GET data from /courses API and set them
        const responseCourse = await getCourse();
        setCourses(responseCourse?.data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchData();
  }, []);
  
  
  return (    
    <Flex 
      p={10} 
      justifyContent="center" 
      flexWrap={'wrap'} 
      gap={20} 
      minHeight="100%" 
    >
      {courses ? (
        <>
        {courses?.map((course, index) => (
          
            <ChakraLink as={ReactRouterLink} 
              type='button'
              to="/chapters"
              state={{courseTitle: course?.attributes?.title}}
            >
              <ColorButton variant="contained" size="large">{course?.attributes?.title}</ColorButton>
            </ChakraLink>
        ))}
        </>
        ) : (
          <CircularProgress />
        )
        }
    </Flex>
  )
}

export default Body