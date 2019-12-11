import axios from 'axios';
import header from './header';

export default () => {
    return axios.create({
        baseURL:'http://192.168.0.253:81/api/subgrupos',
        withCredentials:false,
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            "x-access-control":header
        }
    });
};