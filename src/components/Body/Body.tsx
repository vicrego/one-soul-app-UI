import { Link as ChakraLink, LinkProps, /*Button*/ Box, Flex, HStack, Heading, MenuItemOption, Stack, Text, useColorModeValue, ButtonGroup, extendTheme, VStack, useDisclosure} from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, Modal, useMediaQuery } from '@mui/material';
import Layoult from '../Layoult/Layoult';
import { useEffect, useMemo, useState } from 'react';
import { red, yellow } from '@mui/material/colors';
import Chapter from './content/Chapter';
import { useAuth } from '../../provider/authProvider';
import axios from 'axios';




const Body = (props: any) => {

  /*Check if props comes from Loading component. If it doesn't, 
  then it comes from Home Link, therefore useLocation is used to handle
  the props */ 
  
  const {userData} = useAuth() as { userData: { data?: { username?: string, email?: string } } };
  
  if(!props.loading === true){
    const location = useLocation();
    props = location.state;
  }
    
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMediumHeight = useMediaQuery('(max-height: 500px)');
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  const [open, setOpen] = useState(false);
  
  let getFirstimeEntryUrl: string;
  let firstimeEntryUrl: string;
  
  if(import.meta.env.VITE_ENV === "development"){
    getFirstimeEntryUrl = `${import.meta.env.VITE_API_URL_DEVELOPMENT}/user/getFirstTimeEntry`;
    firstimeEntryUrl = `${import.meta.env.VITE_API_URL_DEVELOPMENT}/user/firstTimeEntry`;
  } else {
    getFirstimeEntryUrl = `${import.meta.env.VITE_API_URL_PRODUCTION}/user/getFirstTimeEntry`;
    firstimeEntryUrl = `${import.meta.env.VITE_API_URL_PRODUCTION}/user/firstTimeEntry`;
  }

  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: getFirstimeEntryUrl
    }).then((res) => {
      if(res.data.firstTimeEntry){
        axios({
          method: "POST",
          withCredentials: true,
          url: firstimeEntryUrl
        }).then((res) => {
          setOpen(true);    
        }).catch(err => {
          console.log("err", err);
        });
      } 
    }).catch(err => {
      console.log("err", err);
    });
    
  }, [])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: 'white',
    color: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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
        <Modal
          open={open}
          //onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Welcome, {userData?.data?.username}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Your journey shall begin!
            </Typography>
            <Flex>
              <Button variant="contained" sx={{marginLeft: "auto"}} 
                onClick={() => {
                  setOpen(false);
                  //setFirstTimeEntry(false); 
                }}
              >
                I'm Ready!
              </Button>
            </Flex>
          </Box>
        </Modal>
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