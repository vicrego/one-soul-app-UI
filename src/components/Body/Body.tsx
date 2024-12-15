import { Link as ChakraLink, LinkProps, /*Button*/ Box, Flex, HStack, Heading, MenuItemOption, Stack, Text, useColorModeValue, ButtonGroup, extendTheme, VStack, Button} from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, useMediaQuery } from '@mui/material';
import Layoult from '../Layoult/Layoult';
import { useEffect, useMemo, useState } from 'react';
import { yellow } from '@mui/material/colors';
import Chapter from './content/Chapter';



const Body = (props: any) => {

  //props.courses?.map((hey: any) => {console.log("hey",hey)})
  /*Check if props comes from Loading component. If it doesn't, 
  then it comes from Home Link, therefore useLocation is used to handle
  the props */ 



  if(!props.loading === true){
    const location = useLocation();
    props = location.state;
  }
    
  const [imageLoaded, setImageLoaded] = useState(false);


  //const isSmallWidth = useMediaQuery('(max-width: 393px)');
  const isMediumHeight = useMediaQuery('(max-height: 500px)');

  //const [message, setMessage] = useState("");
 
  const [propsTest, setPropsTest] = useState<any>();
/*
  useEffect(() => {
    // Retrieve count from local storage on component mount
    const storedCount = localStorage.getItem(props);
    if (props) {
      setCount(parseInt(storedCount));
    }
  }, []);
*/

/*
  useEffect(() => {
    const data = localStorage.getItem("props");
    const propsTest = data !== null ? JSON.parse(data) : null;
    setPropsTest(propsTest);
  }, [props])
*/
  //console.log("props",props.courses)
  // Fetching message from backend on mount
  /*useEffect(() => {
    fetch("http://localhost:5050")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  const [records, setRecords] = useState<any>([]);
*/

/*
  useEffect(() => {
    console.log("here")
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      console.log(records)
      setRecords(records);
    }
    getRecords();
    return;
  }, []);
*/
const [isComponentVisible, setIsComponentVisible] = useState(false);


  return ( 
    <Layoult props={props} >  
      <Flex 
        p={10} 
        justifyContent="center" 
        flexWrap={'wrap'} 
        gap={20} 
        maxHeight="78vh"
        height={isMediumHeight ? "76vh" : "87vh"}
        overflowY={/*isMediumHeight ? "hidden" :*/ "auto"}
      >
        {props?.props.courses?.map((course: any) => (
          <Box
            width={isMediumHeight ? "180px" : "16rem"}     
          >

            <ChakraLink as={ReactRouterLink} 
              type='button'
              to="/chapters"
              
              state={{courseName: course.course_name, props}}
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
                      <Typography gutterBottom variant="h5" component="div" sx={{color: "white", fontFamily: "mono"}}>
                      {course.course_name}
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