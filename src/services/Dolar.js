import axios from 'axios';

export default () => {
    return axios.create({
        baseURL:`https://cors-anywhere.herokuapp.com/https://localbitcoins.com/buy-bitcoins-online`,
        withCredentials:false,
        headers:{
            'Access-Control-Allow-Origin': '*',
            Accept:'application/json',
            'Content-Type':'application/json',
        }
    });
};