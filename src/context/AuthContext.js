import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { config } from './../config'
import { Alert } from 'react-native'
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [usuario, setUsuario] = useState()
  const [isActive, setIsActive] = useState(true)

  const updateUserInfo = (info) => {
    axios.put(config.apiUrl + '/api/usuario', { isActive: !isActive }, {
      headers: {
        Authorization: 'Bearer ' + userToken,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {

      })
      .catch(error => {
        if (error.response.status === 500) {
          Alert.alert('¡Error en el servidor!', 'Presentamos un error en el servidor porfavor intentelo mas tarde')
        }
        if (error.response.status === 404) {
          Alert.alert('¡Usuario no encontrado!', 'Usuario no encontrado, porfavor intentelo mas tarde')
        }
      })

    setIsActive(!isActive)
  }
  const userInfo = () => {
    axios.get(config.apiUrl + '/api/usuario', {
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    })
      .then((response) => {
        const usuarioData = response.data[0]
        setUsuario(usuarioData)
        setIsActive(usuarioData.isActive)
      })
      .catch(error => {
        if (error.response.status === 500) {
          Alert.alert('¡Error en el servidor!', 'Presentamos un error en el servidor porfavor intentelo mas tarde')
        }
        if (error.response.status === 404) {
          Alert.alert('¡Usuario no encontrado!', 'Usuario no encontrado, porfavor intentelo mas tarde')
        }
      })
  }
  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('accessToken', token)
    } catch (e) {
      console.error('here:', e)
    }
  }
  const login = (data) => {
    setIsLoading(true)
    axios.post(config.apiUrl + '/api/auth/login', data)
      .then((response) => {
        if (response.status === 200) {
          setIsLoading(false)
          const token = response.data.token
          const userId = response.data.userId
          setUserId(userId)
          storeToken(token)
          setUserToken(token)
        }
      }).catch(error => {
        if (error.response.status === 401) {
          Alert.alert('¡Contraseña erronea!', 'Contraseña erronea, verifique la información.')
        }
        if (error.response.status === 404) {
          Alert.alert('¡Usuario no encontrado!', 'Usuario no encontrado, registrese o verifique el correo.')
        }
        if (error.response.status === 500) {
          Alert.alert('¡Error en el servidor!', 'Presentamos un error en el servidor porfavor intentelo mas tarde')
        }
      })
  }

  const logout = () => {
    setIsLoading(true)
    setUserToken(null)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken, userId, userInfo, usuario, isActive, updateUserInfo }}>
      {children}
    </AuthContext.Provider>
  )
}
