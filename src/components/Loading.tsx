import React, { useEffect, useState } from 'react';
import Body from './Body/Body';
import { CircularProgress } from '@mui/material';
import { getChallenges, getChallengesChapter, getChallengesFree, getChapter, getCourse, getTopics } from '../api/api';
import { Image } from '@mui/icons-material';
import { Box } from '@chakra-ui/react';
import LoaderLogo from './common/LoaderLogo';


const Loading = () => {

  const [onLoaded, setLoaded] = useState(false); //THIS MUST BE SET TO FALSE
  const [categories, setCategories] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const getCourseRes = await getCourse();
        const courses = getCourseRes?.data;
        
        const getChapterRes = await getChapter();
        const chapters = getChapterRes?.data;
        
        const geTopicsRes = await getTopics();
        const topics = geTopicsRes?.data
        
        const getChallengesChapterRes = await getChallengesChapter();
        const challengesChapter = getChallengesChapterRes?.data;
        
        const getChallengesFreeRes = await getChallengesFree();
        const challengesFree = getChallengesFreeRes?.data;
        
        const getChallengesRes = await getChallenges();
        const challenges = getChallengesRes?.data;
        
        let categories = {courses: [...courses], chapters: [...chapters], topics: [...topics], challengesChapter: [...challengesChapter], challengesFree: [...challengesFree], challenges: [...challenges]};
        console.log("categories", categories)
        setCategories(categories);

        // Save count to local storage whenever it changes
        //localStorage.setItem('props', JSON.stringify(categories));
      
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchData();
  }, []);
    
  useEffect(() => {
    if(categories !== undefined){
      setLoaded(true);
    }
  });

  
  const centerElement = {
    margin: "auto",
    justifyContent: "center",
  };

  return (
    <>
      {!onLoaded ? (
        <LoaderLogo/>
        ) : (
          <Body props={categories} loading/>
        )
      }
    </>
  )
}

export default Loading