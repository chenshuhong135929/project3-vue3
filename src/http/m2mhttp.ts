import axios from  'axios'
const m2mService = axios.create();
m2mService.interceptors.request.use(
    config => {
      if (localStorage.getItem('Authorization')) {
          config.headers.Authorization = localStorage.getItem('Authorization');
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    });



export const userLogin =(username:string,password:string)=>{
    console.log("/api/m2micro-auth/sys/login")
    return m2mService({
        method: 'get',
        url: '/api/m2micro-auth/sys/login',
        params: {username:username,password:password}
      })
}