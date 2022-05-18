import { default as axiosBase } from 'axios';

const axios = axiosBase.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    //'Access-Control-Allow-Origin': '*',
  },
});

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
});

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/refresh`,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem('token', response.data.accessToken);
        return axios.request(originalRequest);
      } catch {
        //
      }
    }
    throw error;
  }
);

export { axios };
