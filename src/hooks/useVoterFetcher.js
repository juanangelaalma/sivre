import axios from "axios";
import { API_URL } from "../configs/api";
import useLocalStorage from "./useLocalStorage";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common["Accept"] = "application/json";

const generateBody = (body, voterData) => {
  if(voterData.isValid) {
    return {
      ...body,
      voter: {
        "username": voterData.username,
        "password": voterData.password,
      }
    }
  }
  return body;
}

const useVoterFetcher = () => {
  const [voterDataStorage, setVoterDataStorage] = useLocalStorage("voterData");

  const voterFetcher = async (url, config, body) => {
    let configs = {
      ...config,
      url,
      headers: {
        ...config?.headers,
      },
      data: generateBody(body, voterDataStorage),
    }

    try {
      const res = await axios.request(configs);
      return res;
    } catch (err) {
      throw err?.response;
    }
  }

  return voterFetcher;
}

export default useVoterFetcher;