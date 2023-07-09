import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { config } from './../config'
import { Alert } from 'react-native'
import { connectSocket, disconnectSocket } from '../utils/socket'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    userToken: null,
    userId: null,
    isActive: true,
    data: null
  })
  const updateUserInfo = (info) => {
    axios.put(config.apiUrl + '/api/usuario', { isActive: !user.isActive }, {
      headers: {
        Authorization: 'Bearer ' + user.userToken,
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

    setUser({ ...user, isActive: !user.isActive })
  }
  const userInfo = () => {
    axios.get(config.apiUrl + '/api/usuario', {
      headers: {
        Authorization: 'Bearer ' + user.userToken
      }
    })
      .then((response) => {
        const usuarioData = response.data[0]
        setUser({ ...user, data: usuarioData, isActive: usuarioData.isActive })
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
          const userToken = response.data.token
          const userId = response.data.userId
          setUser({ ...user, userId, userToken })
          storeToken(userToken)
          connectSocket(userId)
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
    setUser({ ...user, userToken: null })
    disconnectSocket()
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, user, userInfo, updateUserInfo }}>
      {children}
    </AuthContext.Provider>
  )
}
