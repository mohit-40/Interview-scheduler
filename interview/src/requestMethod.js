import axios from "axios";

let BASE_URL = "http://localhost:8800/api";
if(process.env.NODE_ENV ==="production"){
	BASE_URL = "https://interviewscheduler.cyclic.app/api";
}

export const publicRequest = axios.create({ baseURL: BASE_URL })