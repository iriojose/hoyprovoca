import axios from 'axios';

export default () => {
    return axios.create({
        baseURL:`https://somossistemas.com/proxy/https://localbitcoins.com/buy-bitcoins-online`,
        withCredentials:false,
        headers:{
            'Access-Control-Allow-Origin': '*',
            Accept:'application/json',
            'Content-Type':'application/json',
        }
    });
};