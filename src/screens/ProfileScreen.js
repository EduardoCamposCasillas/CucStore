import React, { useContext } from 'react'
import { View, StyleSheet, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple
} from 'react-native-paper'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { COLORS } from './../constants/index'
import { Divider } from 'react-native-elements'
import BottomTabs from './../components/BottomTabs'
import { AuthContext } from './../context/AuthContext'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

const ProfileScreen = () => {
  const { userInfo, user } = useContext(AuthContext)
  const navigation = useNavigation()
  const { logout } = useContext(AuthContext)

  // const getToken = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('accessToken')
  //     if (value !== null) {
  //       console.log(value)
  //     }
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  useFocusEffect(
    React.useCallback(() => {
      userInfo()
    }, [])
  )

  const onLogoutPress = () => {
    logout()
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
              <Avatar.Image
                source={{ uri: user.data && user.data?.imgUrl }}
                size={80}
              />
              <View style={{ marginLeft: 20 }}>
                <Title style={[styles.title, {
                  marginTop: 15,
                  marginBottom: 5
                }]}>{user.data && user.data?.nombreCompleto?.split(' ')[0] + ' ' + (user.data?.nombreCompleto?.split(' ')[2] || user.data?.nombreCompleto?.split(' ')[1])}</Title>

              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="phone" color="#777777" size={20} />
              {user.data && <Text style={{ color: '#777777', marginLeft: 20 }}>{user.data?.telefonos === null || user.data?.telefonos === undefined || user.data?.telefonos.length < 1 ? 'Agrega un telefono' : user.data.telefonos}</Text>}
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#777777" size={20} />
              <Text style={{ color: '#777777', marginLeft: 20 }}>{user.data && user.data?.correo}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="tag" color="#777777" size={20} />
              {user.data && <Text style={{ color: '#777777', marginLeft: 20 }}>{user.data?.nombreMarca === null || user.data?.nombreMarca === undefined ? 'Agrega el nombre de tu marca' : user.data.nombreMarca}</Text>
}
            </View>
          </View>

          <View style={styles.infoBoxWrapper}>
            <View style={styles.infoBox}>
              <Title>{user.data && user.data?.productos?.length}</Title>
              <Caption>Mis Productos en Venta</Caption>
            </View>
          </View>

          {/* Poner aqui menu wrapper para que no este pegado al bottom tabs */}

        </View>

      </ScrollView>

      {/* Para que este pegado al bottom tabs */}
      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => navigation.navigate('EditProfile')}>
          <View style={styles.menuItem}>
            <Icon name="account-edit" color={COLORS.primary} size={25} />
            <Text style={styles.menuItemText}>Editar Perfil</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => Alert.alert('Funcionalidad no disponible por el momento')}>
          <View style={styles.menuItem}>
            <Icon name="account-key" color={COLORS.primary} size={25} />
            <Text style={styles.menuItemText}>Cambiar Contraseña</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={onLogoutPress}>
          <View style={styles.menuItem}>
            <Icon name="logout" color={COLORS.primary} size={25} />
            <Text style={styles.menuItemText}>Cerrar Sesion</Text>
          </View>
        </TouchableRipple>
      </View>
      <Divider width={1} />
      <View style={{ backgroundColor: 'white' }}>
        <BottomTabs />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  menuWrapper: {
    marginTop: 10
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26
  }
})

export default ProfileScreen
