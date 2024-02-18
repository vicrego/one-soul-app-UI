import { Link as ChakraLink, LinkProps, /*Button*/ Box, Flex, HStack, Heading, MenuItemOption, Stack, Text, useColorModeValue, ButtonGroup, extendTheme, VStack} from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
//import Button from '@mui/material/Button';
import { ButtonProps, styled, CircularProgress } from '@mui/material';
//import { purple, blue, teal } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Layoult from '../Layoult/Layoult';
import styles from './Body.module.css';

const Body = (props: any) => {
  
  /*Check if props comes from Loading component. If it doesn't, 
  then it comes from Home Link, therefore useLocation is used to handle
  the props */ 
  if(!props.loading){
  const location = useLocation();
  props = location.state;
  }

  
  return (  
    <Layoult props={props} >  
      <Flex 
        p={10} 
        justifyContent="center" 
        flexWrap={'wrap'} 
        gap={20}
        minHeight="100%" 
      >
        {props.courses && (
          <>
            {props.courses?.map((course) => (
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
                      //onLoad={() => setLoaded(true)}
                    />
                    {/*{onLoaded && (*/}
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {course?.attributes?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles, with over 6,000
                          species, ranging across all continents except Antarctica
                        </Typography>
                      </CardContent>
                    {/*  )
                    }*/} 
                  </CardActionArea>
                </Card>
              </ChakraLink>
            ))}
          </>
          )
        } 
      </Flex>
      {/*!onLoaded && (
        <CircularProgress />
      )*/}
    </Layoult>
  )
}

export default Body