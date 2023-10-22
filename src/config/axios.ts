import axios from "axios";
const basicAuth = 'Basic ' + 'Y2doaXVyZWFAYWx0YW1ldHJpY3MuY29tOnBhc3M=';
const instance = axios.create({
  baseURL: 'https://ak.contentcubed.com/api',
});

instance.defaults.headers.common['Authorization'] = `${basicAuth}`;

export default instance;