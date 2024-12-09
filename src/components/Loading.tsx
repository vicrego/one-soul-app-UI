import React, { useEffect, useState } from 'react';
import Body from './Body/Body';
//import { getChapter, getCourse, getTopic, getChallengeLevel, getChallenge } from '../api/api';
import { CircularProgress } from '@mui/material';
//import { getCourse } from '../api/api';
import { getChallenges, getChallengesChapter, getChallengesFree, getChapter, getCourse, getTopics } from '../api/api';


const Loading = () => {

  const [courses, setCourses] = useState<any>();
  const [chapters, setChapters] = useState<any>();
  const [chaptersTopics, setChaptersTopics] = useState<any[]>();
  const [challengesChapter, setChallengesChapter] = useState<any>();
  
  const [topics, setTopics] = useState<any[]>();
  const [challengeLevels, setChallengeLevels] = useState<any[]>();
  const [challenges, setChallenge] = useState<any[]>();

  const [onLoaded, setLoaded] = useState(false); //THIS MUST BE SET TO FALSE
  
  const [categories, setCategories] = useState<any>();
  /*
  const [records, setRecords] = useState([]);
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, []);
*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        //async function getRecords() {
        
        const getCourseRes = await getCourse();
        const courses = getCourseRes?.data;
        setCourses(courses);

        const getChapterRes = await getChapter();
        const chapters = getChapterRes?.data
        setChapters(chapters);

        const geTopicsRes = await getTopics();
        const topics = geTopicsRes?.data
        setChapters(topics);

        const getChallengesChapterRes = await getChallengesChapter();
        const challengesChapter = getChallengesChapterRes?.data;
        setChallengesChapter(challengesChapter);
        
        const getChallengesFreeRes = await getChallengesFree();
        const challengesFree = getChallengesFreeRes?.data;
        setChallengesChapter(challengesFree);
        
        const getChallengesRes = await getChallenges();
        const challenges = getChallengesRes?.data;
        setChallengesChapter(challenges);
        
        
        let categories = {courses: [...courses], chapters: [...chapters], topics: [...topics], challengesChapter: [...challengesChapter], challengesFree: [...challengesFree], challenges: [...challenges]};
        setCategories(categories);

      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchData();
  }, []);
    
//  useEffect(() => {
//    const fetchData = async () => {
//     try {
        //GET data from /courses API and set them
        //const responseCourse = await getCourse();
        //console.log(responseCourse)
        //setCourses(responseCourse);
        /*
        const responseChapter = await getChapter();
        setChapters(responseChapter[0]?.data.data);
        setChaptersTopics(responseChapter[1]?.data.data);

        const responseTopic = await getTopic();
        setTopics(responseTopic?.data.data);


        const responseChallengeLevel = await getChallengeLevel();
        setChallengeLevels(responseChallengeLevel?.data.data);
        console.log("responseChallengeLevel", responseChallengeLevel)
        
        
        const responseChallenge = await getChallenge();
        setChallenge(responseChallenge?.data.data);       
        */
/*      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
      fetchData();
  }, []);
  */
  useEffect(() => {
    if(categories !== undefined){
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
        <Body props={categories} loading/>
      ) : (
        <CircularProgress style={centerElement} />
      )
      }
    </>
  )
}

export default Loading