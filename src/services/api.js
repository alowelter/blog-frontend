import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://backend.blog.local',
  baseURL: 'http://localhost',
  withCredentials: true,
  headers: {
    withCredentials: true,    
    'content-type': 'application/json',
    'Accept': 'application/json',
  }
});
api.interceptors.request.use(function (config) {
  let token = localStorage.getItem('access_token')
  if (token) config.headers['Authorization'] = 'Bearer ' + token;
  return config;  
});
api.interceptors.request.use(async (config) => {
  return config;
});
api.interceptors.response.use(async (response) => {
  return response;
}, async (error) => {
  return error;
}
);

export { api };

