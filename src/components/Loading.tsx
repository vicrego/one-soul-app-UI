import React, { useEffect, useState } from 'react';
import Body from './Body/Body';
import { getChapter, getCourse, getTopic } from '../api/api';
import { CircularProgress, createTheme } from '@mui/material';
import { yellow } from '@mui/material/colors';


const Loading = () => {

  const [courses, setCourses] = useState();
  const [chapters, setChapters] = useState<any[]>();
  const [topics, setTopics] = useState<any[]>();
  
  const [onLoaded, setLoaded] = useState(false);
  
  

  useEffect(() => {

    const fetchData = async () => {
      try {
        //GET data from /courses API and set them
        const responseCourse = await getCourse();
        setCourses(responseCourse?.data.data);
        const responseChapter = await getChapter();
        setChapters(responseChapter?.data.data);
        const responseTopic = await getTopic();
        console.log('responseTopic',responseTopic)
        setTopics(responseTopic?.data.data);
        console.log("her2")
      } catch (error) {
        console.error('Error fetching user:', error);
      }

  }
    fetchData();
  }, []);
  
  useEffect(() => {
    if(courses !== undefined){
      console.log("here")
      setLoaded(true);
    }
  });

  
  

  const centerElement = {
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh"
  };
  

  const primary = yellow[500];

  return (
    <>
      {onLoaded ? (
        <Body courses={courses} chapters={chapters} topics={topics} loading/>
      ) : (
        <CircularProgress style={centerElement} />
      )
      }
    </>
  )
}

export default Loading