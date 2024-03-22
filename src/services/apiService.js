import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://timeapi.mininxd.my.id/',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const fetchData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const sendData = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
};

export default apiClient;