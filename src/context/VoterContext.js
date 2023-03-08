import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../configs/api";
import useLocalStorage from "../hooks/useLocalStorage";

const VoterData = {
  username: null,
  password: null,
  isValid: false,
  error: null
}

const VoterContext = createContext(VoterData);

function useVoter() {
  return useContext(VoterContext);
}

function VoterProvider(props) {
  const [voterData, setVoterData] = useState(VoterData);
  const [voterDataStorage, setVoterDataStorage] = useLocalStorage("voterDataStorage", null);

  useEffect(() => {
    if (voterDataStorage) {
      setVoterData({
        username: voterDataStorage.username,
        password: voterDataStorage.password,
        isValid: true,
      });
    }
  }, [])

  const login = async ({ username, password }) => {
    try {
      const response = await axios.post(`${API_URL}/voters/login`, { username, password }, { "Content-Type": "application/json" })

      setVoterDataStorage({
        username: response.data.data.username,
        password: response.data.data.password,
      })

      setVoterData({
        username: response.data.data.username,
        password: response.data.data.password,
        isValid: true,
        error: null
      })
    } catch (err) {
      console.log(err.response.status)
      if (err.response.status === 401) {
        setVoterData({
          ...voterData,
          error: "Username atau password salah"
        })
      } else if(err.response.status === 400) {
        setVoterData({
          ...voterData,
          error: "Username atau password tidak boleh kosong"
        })
      } else {
        setVoterData({
          ...voterData,
          error: "Terjadi kesalahan"
        })
      }
    }
  }

  const logout = () => {
    setVoterDataStorage(null);
    setVoterData(VoterData);
  }

  return (
    <VoterContext.Provider value={{ voterData, login, logout }} {...props} />
  )
}

export { VoterProvider, useVoter }