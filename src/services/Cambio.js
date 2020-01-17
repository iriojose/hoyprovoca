import axios from 'axios';
import header from './header';
import extension from './cambio';

export default () => {
    return axios.create({
        baseURL:`http://${extension}/api/cambio`,
        withCredentials:false,
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            "x-access-control":header
        }
    });
};