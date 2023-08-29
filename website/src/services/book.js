import { network } from "../config/network";
import axios from 'axios';

async function listBooks() {
    try {
        const response = await axios.get(`${network.api}/book/list`);
        const data = await response.data;
        return data;
    } catch(error) {
        return 'Error:'+ error;
    };  
}

async function search(term) {
    try {
        const url = `${network.api}/book/search`;
        const response = await axios.get(`${url}/${term}`);
        const data = await response.data;
        return data;
    } catch(err) {
        return "Err" + err;
    }
}

async function uploadBook(form) {
    try {
        const url = `${network.api}/book/upload`;
        const token = localStorage.getItem('@token');
        const config = {
            method: 'post',
            url: url, // Substitua pela URL real da sua rota
            headers: { 
            'x-access-token': token,
            'Content-Type': 'multipart/form-data'
            },
            data: form
        };
        
        // Fazendo a requisição Axios
        const response = await axios(config);
        const data = await response.data;
        return data;
    } catch(err) {
        return "Err: " + err;
    }
}

export default Object.freeze({
    listBooks,
    search,
    uploadBook
})