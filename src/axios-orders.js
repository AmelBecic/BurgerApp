import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://burger-builder-92e0d.firebaseio.com/'
});


export default instance;