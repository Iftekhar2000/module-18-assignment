import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1', // Update with your API base URL
});

export default api;
