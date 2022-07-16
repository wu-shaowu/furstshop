import axios from "axios";


// axios请求
const requests = axios.create({
    timeout:5000,
});

//响应拦截器--当服务器手动请求之后，做出响应（响应成功）会执行
requests.interceptors.response.use((res)=>{
    return res.data;
},(error)=>{
    return Promise.reject(new Error('false'));
})


export default requests