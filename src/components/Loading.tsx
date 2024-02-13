import React, { useEffect, useState } from 'react';
import Body from './Body/Body';
import { getChapter, getCourse, getTopic } from '../api/api';
import Head from './Head/Head';
import NavBar from './Head/navigation/NavBar';



const Loading = () => {

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
        console.log('responseTopic',responseTopic)
        setTopics(responseTopic?.data.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }

  }
    fetchData();
  }, []);
  
  const [onLoaded, setLoaded] = useState<any[]>(false);
  console.log(courses);


  
  return (
    <>
      <Body courses={courses} chapters={chapters} topics={topics} loading/>
    </>
  )
}

export default Loading