import { Link as ChakraLink, LinkProps, /*Button*/ Box, Flex, HStack, Heading, MenuItemOption, Stack, Text, useColorModeValue, ButtonGroup, extendTheme, VStack, Button} from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, useMediaQuery } from '@mui/material';
import Layoult from '../Layoult/Layoult';
import { useEffect, useMemo, useState } from 'react';
import { red, yellow } from '@mui/material/colors';
import Chapter from './content/Chapter';
import { useAuth } from '../../provider/authProvider';



const Body = (props: any) => {

  /*Check if props comes from Loading component. If it doesn't, 
  then it comes from Home Link, therefore useLocation is used to handle
  the props */ 
  

  const { userData } = useAuth();
  console.log("userData", userData);
  
  if(!props.loading === true){
    const location = useLocation();
    props = location.state;
  }
    
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMediumHeight = useMediaQuery('(max-height: 500px)');
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  return ( 
    <Layoult props={props.props} >  
      <Flex 
        p={10} 
        justifyContent="center" 
        flexWrap={'wrap'} 
        gap={20} 
        maxHeight="78vh"
        height={isMediumHeight ? "76vh" : "87vh"}
        overflowY={/*isMediumHeight ? "hidden" :*/ "auto"}
      >
        {props?.props.courses?.map((course: any, i: any) => (
          <Box
            width={isMediumHeight ? "180px" : "16rem"}     
          >
            <ChakraLink as={ReactRouterLink} 
              type='button'
              to="/chapters"  
              state={{courseId: course.course_id, props}}
              key={course.course_id}
            >
              <Card 
                sx={{ 
                  maxWidth: 300, 
                  backgroundColor: "#4a148c",     
                  "&:hover": {
                    background: "purple"
                  }, 
                }} >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    //image={`http://localhost:1337${course?.attributes?.image.data?.attributes?.url}`}
                    src={`./images-icons/${course.course_img}`}
                    alt="course image"
                    onLoad={() => setImageLoaded(true)}
                  />
                  <CardContent>
                      <Typography gutterBottom variant="h5" component="div" sx={{color: "white"}}>
                        <Text>{course.course_name}</Text>
                      </Typography>     
                    </CardContent>
                  {/*imageLoaded && (
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                      {course.course_name}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                      </Typography>
                      
                    </CardContent>
                  )*/} 
                </CardActionArea>
              </Card>
            </ChakraLink>
          </Box>
        ))}
      </Flex>
    </Layoult>
  )
}

export default Body