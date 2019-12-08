import axios from 'axios';

export default () => {
    return axios.create({
        baseURL:'http://192.168.0.253:81/api',
        withCredentials:true,
        headers:{
            'x-access':{"password" : "123456", "user" : "admin"},
            Accept:'application/json',
            'Content-Type':'application/json'
        }
    });
};