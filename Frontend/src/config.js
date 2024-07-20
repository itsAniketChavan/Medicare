// export const BASE_URL = "https://medicare-hg0q.onrender.com/api/v1";
// export const BASE_URL = "http://localhost:5000/api/v1";
// export const token = localStorage.getItem('token')

const BASE_URL1 = "https://medicare-hg0q.onrender.com/api/v1";
const LOCAL_BASE_URL =  "http://localhost:5000/api/v1";

export const BASE_URL = window.location.hostname === "localhost" ? LOCAL_BASE_URL : BASE_URL1;
export const token = localStorage.getItem('token');
