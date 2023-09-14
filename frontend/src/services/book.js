import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

async function listBooks() {
    console.log(backendUrl);
    console.log('teste');
    try {
        const response = await axios.get(`${backendUrl}/book/list`);
        const data = await response.data;
        return data;
    } catch(error) {
        return 'Error:'+ error;
    };  
}

async function search(term) {
    try {
        const url = `${backendUrl}/book/search`;
        const response = await axios.get(`${url}/${term}`);
        const data = await response.data;
        return data;
    } catch(err) {
        return "Err" + err;
    }
}

async function uploadBook(form) {
    try {
        const url = `${backendUrl}/book/upload`;
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

async function download(format, bookId, title) {
    const downloadUrl = `${backendUrl}/book/download/${format}/${bookId}`;
    axios.get(downloadUrl, { responseType: 'blob' })
    .then(response => {
        const blobUrl = URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = title;
        link.click();
        URL.revokeObjectURL(blobUrl);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

export default Object.freeze({
    listBooks,
    search,
    uploadBook,
    download
})
