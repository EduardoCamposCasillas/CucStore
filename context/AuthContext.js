import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext();
import axios from "axios";
import { config } from "../config";

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [usuario, setUsuario] = useState()
  const [isActive, setIsActive] = useState()

  const updateUserInfo = (info) => {
    axios.put(config.apiUrl + '/api/usuario', {isActive: !isActive}, {
      headers: {
        Authorization: 'Bearer ' + userToken,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log('informacion actualizada');
      })
      .catch(e => console.error(e))

      setIsActive(!isActive)
  }
  const userInfo = () => {
    axios.get(config.apiUrl + '/api/usuario', {
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    })
      .then((response) => {
        const usuarioData = response.data[0];
        setUsuario(usuarioData);
        setIsActive(usuarioData.isActive)
      })
      .catch(e => console.error(e));
  }
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
    <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo, usuario, isActive, updateUserInfo }}>
      {children}
    </AuthContext.Provider>
  )
};