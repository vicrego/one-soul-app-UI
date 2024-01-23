import React, { useEffect, useState } from 'react';
import { Link as ChakraLink, LinkProps, /*Button*/ Box, Flex, HStack, Heading, MenuItemOption, Stack, Text, useColorModeValue, ButtonGroup, extendTheme, VStack} from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import {getCourse} from '../../api/api';
import { getChapter } from '../../api/api';
import {getTopic} from '../../api/api';

//import Button from '@mui/material/Button';
import { ButtonProps, styled, CircularProgress } from '@mui/material';
//import { purple, blue, teal } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


const Body = () => {
  
  
  const [courses, setCourses] = useState<any[]>();
  const [chapters, setChapters] = useState<any[]>();
  const [topics, setTopics] = useState<any[]>();
  

  /*
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
  */

  useEffect(() => {

    const fetchData = async () => {
      try {
        //GET data from /courses API and set them
        const responseCourse = await getCourse();
        setCourses(responseCourse?.data.data);
        const responseChapter = await getChapter();
        setChapters(responseChapter?.data.data);
        const responseTopic = await getTopic();
        setTopics(responseTopic?.data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
/*
      try {
        //GET data from /courses API and set them
        
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    */
  }
    fetchData();
  }, []);

  let props = {
    courses,
    chapters,
    topics
  }

/*
  useEffect(() => {

    const fetchData = async () => {
      
    };
    fetchData();
  }, []);
*/


  //console.log('courses',courses)
  const [onLoaded, setLoaded] = useState<any[]>(false);

  return (  
    <>  
      <Flex 
        p={10} 
        justifyContent="center" 
        flexWrap={'wrap'} 
        gap={20}
        minHeight="100%" 
      >
        {courses && (
          <>
            {courses?.map((course) => (
              <ChakraLink as={ReactRouterLink} 
                type='button'
                to="/chapters"
                state={{courseTitle: course?.attributes?.title, props}}
                key={course.id}
              >
                <Card sx={{ maxWidth: 300 }} >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={`http://localhost:1337${course?.attributes?.image.data?.attributes?.url}`}
                      alt="course image"
                      onLoad={() => setLoaded(true)}
                    />
                    {onLoaded && (
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {course?.attributes?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles, with over 6,000
                          species, ranging across all continents except Antarctica
                        </Typography>
                      </CardContent>
                      )
                    } 
                  </CardActionArea>
                </Card>
              </ChakraLink>
            ))}
          </>
          )
        } 
      </Flex>
      {!onLoaded && (
        <CircularProgress />
      )}
    </>
  )
}

export default Body