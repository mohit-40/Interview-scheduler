import axios from "axios";

let BASE_URL = "http://localhost:8800/api";
if(process.env.NODE_ENV ==="production"){
	BASE_URL = "https://interview-scheduler7.herokuapp.com/api";
}

export const publicRequest = axios.create({ baseURL: BASE_URL })