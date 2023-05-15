import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext();
import axios from "axios";
import { config } from "../config";

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const storeToken = async(token) => {
    try{
      await AsyncStorage.setItem('accessToken', token)
    }catch(e){
      console.error(e)
    }
  }
  const login = (data) => {
    axios.post(config.apiUrl + '/api/auth/login', data)
    .then((response) => {
      console.log(response.status)
      if(response.status === 200){
        const token = response.data.token
        storeToken(token)
        setUserToken(token);
      }else{
        console.log('Manejar otros estados');
      }
    }).catch(e => console.error(e))
    
  };

  const logout = () => {
    setUserToken(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  )
};