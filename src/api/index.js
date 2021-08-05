import axios from 'axios';
///we Can also create the instance of axios by /// const api=axios.create({baseURL:'http://localhost:8000'})
const url='https://litebook-india.herokuapp.com';
const API=axios.create({baseURL:url});
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('memoriesuserprofile'))
    {
        req.headers.Authorization=`Mytoken ${JSON.parse(localStorage.getItem('memoriesuserprofile')).token}`
    }
    return req
})
const url1='https://litebook-india.herokuapp.com/users'
export const fetch_data= async (lng)=>{return await axios.get(`${url}/api/post/?skip=${lng}`);}

export const createpost=(newpost)=>API.post('/api/post',newpost);

export const updatePost=(id,updatedata)=>API.patch(`/api/post/${id}`,updatedata);

export const deletePost=(id)=>API.delete(`/api/post/${id}`);

export const likePost=(id)=>API.patch(`/api/post/${id}/like`)

export const signin=(data)=>axios.post(`${url1}/signin`,data);
export const signup=(data)=>axios.post(`${url1}/signup`,data);
export const confirmmail=(token)=>axios.get(`${url1}/auth/confirm/${token}`);
export const forgetpasscode=(data)=>axios.post(`${url1}/reset/passcode`,data);
export const changepasscode=(data)=>axios.post(`${url1}/reset/changepassword`,data);