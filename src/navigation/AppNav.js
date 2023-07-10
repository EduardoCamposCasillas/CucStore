import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { View, ActivityIndicator } from 'react-native'
import { COLORS } from '../constants'
import AuthStack from './AuthStack'
import AppStack from './AppStack'
import { AuthContext } from './../context/AuthContext'

const AppNav = () => {
  const { isLoading, user } = useContext(AuthContext)

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={COLORS.primary} />
      </View>
    )
  }

  return (
    <NavigationContainer>
      {user.userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default AppNav
