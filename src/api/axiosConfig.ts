
import axios from 'axios';

/*
const instanceMongo = axios.create({
  baseURL: 'http://localhost:5050/record',
  timeout: 5000,
  //headers: {'X-Custom-Header': 'foobar'}
  
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // You can specify specific origins instead of '*'
  },
});
*/

let url: string;
  
if(import.meta.env.VITE_ENV === "development"){
  url = `${import.meta.env.VITE_API_URL_DEVELOPMENT}/content`
} else {
  url = `${import.meta.env.VITE_API_URL_PRODUCTION}/content`
}

const instanceNeon = axios.create({
  baseURL: url,
  timeout: 5000,
  //headers: {'X-Custom-Header': 'foobar'}
  
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // You can specify specific origins instead of '*'
  },
});



export default {/*instanceMongo,*/ instanceNeon};