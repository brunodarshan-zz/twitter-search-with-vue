import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:2000',
  headers: {'Access-Control-Allow-Origin': true},
  proxy: {
    host: '168.228.185.51',
    port: 8080
  }
})

export default instance
