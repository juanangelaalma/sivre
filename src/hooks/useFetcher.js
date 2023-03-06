import axios from "axios";
import { API_URL } from "../configs/api";
import useLocalStorage from "../hooks/useLocalStorage";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common["Accept"] = "application/json";

const axiosInterceptor = (userData) => {
  axios.interceptors.request.use((config) => {
    if (userData.token) {
      config.headers.Authorization = `Bearer ${userData.token}`;
    }
    return config;
  });
};

const useFetcher = () => {
  const [userData, setUserData] = useLocalStorage("userData");

  const fetcher = async (url, config, body) => {
    let configs = {
      ...config,
      url,
      headers: {
        ...config?.headers,
      },
      data: body,
    };

    try {
      axiosInterceptor(userData);
      let res = await axios.request(configs);
      return res;
    } catch (err) {
      throw err?.response;
    }
  };

  return fetcher;
};

export default useFetcher;
