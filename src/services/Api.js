import axios from 'axios';
import header from './header';
//`{" password " : "123456" , " user " : "admin"}`

export default () => {
    return axios.create({
        baseURL:'http://192.168.0.253:81',
        withCredentials:false,
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            "x-access-control":`{" password " : "123456" , " user " : "admin"}`
        }
    });
};