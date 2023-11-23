import axios from './axiosConfig';


export async function getTopic() {
  try {
    const response = await axios.get('/topics?populate=*');
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}


export async function getCourse() {
  try {
    const response = await axios.get('/courses?populate=*');
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getChapter() {
  try {
    const response = await axios.get('/chapters?populate=*');
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}