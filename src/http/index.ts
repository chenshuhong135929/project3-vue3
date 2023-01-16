import axios from  'axios'
import UserDto from '../class/UserDto'


//查询
export const getList =(req:UserDto)=>{
    return axios.post("/api/user/list",req)
}
//新增
export const add =(req:{})=>{
    return axios.post("/api/user/add",req)
}
//修改
export const edit =(req:{})=>{
    return axios.post("/api/user/edit",req)
}

//删除
export const del =(ids:string)=>{
    console.log("/api/user/del?ids="+ids)
    return axios.post("/api/user/del?ids="+ids)
}



