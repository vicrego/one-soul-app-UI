import axios from './axiosConfig';

export async function getCourse() {
  try {
    const response = await axios.instanceNeon.get('/courses');
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getChapter() {
  try {
    const response = await axios.instanceNeon.get('/chapters');
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getTopics() {
  try {
    const response = await axios.instanceNeon.get('/topics');
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getChallengesChapter() {
  try {
    const response = await axios.instanceNeon.get('/challenges_chapter');
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getChallengesFree() {
  try {
    const response = await axios.instanceNeon.get('/challenges_free');
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getChallenges() {
  try {
    const response = await axios.instanceNeon.get('/challenges');
    return response;
  } catch (error) {
    console.error(error);
  }
}


/*

export async function getChapter() {
  try {
    const response = await axios.get('/chapters?populate=*');
    const responseImage = await axios.get('/chapters?populate[topics][populate]=*');
    const responseArray = [response, responseImage];
    
    //console.log("responseArray", responseArray);
    return responseArray;
  } catch (error) {
    console.error(error);
  }
}
*/
