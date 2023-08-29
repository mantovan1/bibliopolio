import axios from "axios";
import { network } from "../config/network";

async function login(email, pass) {
    try {
        const url = `${network.api}/user/login`;
        const data = {
            email: email,
            pass: pass,
        };

        const response = await axios.post(url, data);
        const responseData = await response.data;

        localStorage.setItem('@token', responseData.token);
        localStorage.setItem('@user', responseData.result);

        return responseData;
    } catch(err) {

    }
} 

export default Object.freeze({
    login,
})