import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

async function login(email, pass) {
    try {
        const url = `${backendUrl}/user/login`;
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
        return err.response;
    }
} 

async function register(name, email, pass) {
    try {
        const url = `${backendUrl}/user/signup`;
        const data = {
            name: name,
            email: email,
            pass: pass,
        };

        const response = await axios.post(url, data);
        return response;
    } catch(err) {
        return err.response;
    }
}

export default Object.freeze({
    login,
    register
})