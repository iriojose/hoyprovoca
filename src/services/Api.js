import axios from 'axios';

export default () => {
    return axios.create({
        baseURL:'http://192.168.0.253:81',
        withCredentials:false,
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
        }
    });
};