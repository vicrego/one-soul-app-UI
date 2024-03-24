import React, { useEffect, useState } from 'react';
import Body from './Body/Body';
import { getChapter, getCourse, getTopic, getChallengeLevel, getChallenge } from '../api/api';
import { CircularProgress } from '@mui/material';


const Loading = () => {

  const [courses, setCourses] = useState<any[]>();
  const [chapters, setChapters] = useState<any[]>();
  const [chaptersTopics, setChaptersTopics] = useState<any[]>();
  
  const [topics, setTopics] = useState<any[]>();
  const [challengeLevels, setChallengeLevels] = useState<any[]>();
  const [challenges, setChallenge] = useState<any[]>();

  const [onLoaded, setLoaded] = useState(false);
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        //GET data from /courses API and set them
        const responseCourse = await getCourse();
        setCourses(responseCourse?.data.data);
        
        const responseChapter = await getChapter();
        setChapters(responseChapter[0]?.data.data);
        setChaptersTopics(responseChapter[1]?.data.data);

        const responseTopic = await getTopic();
        setTopics(responseTopic?.data.data);

        const responseChallengeLevel = await getChallengeLevel();
        setChallengeLevels(responseChallengeLevel?.data.data);
        
        const responseChallenge = await getChallenge();
        setChallenge(responseChallenge?.data.data);       

      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
      fetchData();
  }, []);
  
  useEffect(() => {
    if(courses !== undefined){
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

  return (
    <>
      {onLoaded ? (
        <Body courses={courses} chapters={chapters} chaptersTopics={chaptersTopics} topics={topics} challengeLevels={challengeLevels} challenges={challenges} loading/>
      ) : (
        <CircularProgress style={centerElement} />
      )
      }
    </>
  )
}

export default Loading