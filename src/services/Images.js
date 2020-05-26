import axios from 'axios';
import variables from './variables_globales';

export default () => {
    return axios.create({
        baseURL:`${variables.imagen}/gallery`,
        withCredentials:false,
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            "x-access-control":variables.header
        }
    });
};