import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext();
import axios from "axios";

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
    axios.post('http://192.168.100.50:3000/api/auth/login', data)
    .then((response) => {
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