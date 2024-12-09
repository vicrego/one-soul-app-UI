import { Box, Text } from '@chakra-ui/react'
import Layoult from '../Layoult/Layoult';
import { useLocation } from 'react-router-dom';

const About = () => {
  const location = useLocation();
  let props = location.state;
  console.log("about", props)

  const styleAbout = 
  {
    padding: "10% 10%",
  };

  return (
    <Layoult props={props.props} >  
      <Box style={styleAbout} >
        <Text><span style={{fontSize: "1.5rem", fontWeight: "bold"}}>Welcome to our One Soul Academy! </span>
        We help you to turn self-development into practical exercises.
        True learning comes from experience, here in One Soul Academy we designed to give you just that.
        With our app, you'll be able to explore a range of self-development exercises and put them into practice 
        in your everyday life. 
        Our exercises are designed to help you grow and learn, whether you're looking to 
        improve your career prospects, enhance your personal relationships, or simply find a greater sense of meaning 
        and purpose in your life. We believe that everyone has the potential to learn and grow, and our app is here 
        to help you tap into that potential. So whether you're just starting out on your self-development journey or 
        you're looking to take your skills to the next level, we're here to support you every step of the way.
        Thank you for choosing our app, and we look forward to helping you achieve your self-development goals!</Text>
      </Box>
    </Layoult>
  )
}

export default About