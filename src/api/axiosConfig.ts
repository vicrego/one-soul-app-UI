
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
const instanceNeon = axios.create({
  //baseURL: 'http://localhost:5050/', //DEVELOPMENT 
  baseURL: 'https://one-soul-server.onrender.com/', //PRODUCTION
  timeout: 5000,
  //headers: {'X-Custom-Header': 'foobar'}
  
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // You can specify specific origins instead of '*'
  },
});



export default {/*instanceMongo,*/ instanceNeon};