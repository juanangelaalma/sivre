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

  const fetcher = async (url, config) => {
    let headers = {
      ...config,
      url,
      headers: {
        "Content-Type": "application/json",
        ...config?.headers,
      },
    };

    try {
      axiosInterceptor(userData);
      let res = await axios.request(headers);
      return res;
    } catch (err) {
      throw err?.response;
    }
  };

  return fetcher;
};

export default useFetcher;
