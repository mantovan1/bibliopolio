import axios from "axios"
import { network } from "../config/network"

async function add(bookId) {
    try {
        const url = `${network.api}/favorite/${bookId}`;
        const token = localStorage.getItem('@token')
        const config = {
            method: 'get',
            url: url,
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            }
        }

        const response = await axios(config);
        const data = await response.data;
        return data;
    } catch(err) {
        return "Error: " + err;
    }
}

async function remove(bookId) {
    try {
        const url = `${network.api}/favorite/remove/${bookId}`;
        const token = localStorage.getItem('@token')
        const config = {
            method: 'get',
            url: url,
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            }
        }

        const response = await axios(config);
        const data = await response.data;
        return data;
    } catch(err) {
        return "Error: " + err;
    }
}

async function getListFavorites() {
    try {
        const url = `${network.api}/favorite`;
        const token = localStorage.getItem('@token')
        const config = {
            method: 'get',
            url: url,
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            }
        }

        const response = await axios(config);
        const data = await response.data;
        return data;
    } catch(err) {
        return "Error: " + err;
    }
}

async function check(bookId) {
    try {
        const url = `${network.api}/favorite/check/${bookId}`;
        const token = localStorage.getItem('@token');
        const config = {
            method: 'get',
            url: url,
            headers: {
                'x-access-token': token
            }
        }

        const response = await axios(config);
        return response;
    } catch(err) {
        return err.response;
    }
}

export default Object.freeze({
    add,
    remove,
    getListFavorites,
    check
})