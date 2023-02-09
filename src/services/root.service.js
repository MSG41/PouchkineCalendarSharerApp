import axios from 'axios';
import { apiConfig } from './config/config.services';


//Here we create our default api instance by using axios.create. We pass our requestconfig from config.services. We assign our API instance to 'this.api'.
//In a production level app, you may have up to 4 or 5 different API configurations. For example for downloading or uploading, authenticated vs unauthenticated requests etc. 
class rootService {
    constructor() {
        //By using middleware like Axios, we get access to powerfull features like an interceptor. read more here: https://axios-http.com/docs/interceptors
        this.api = axios.create({...apiConfig})
    }
}

export default rootService;