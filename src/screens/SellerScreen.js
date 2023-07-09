import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native'
import { COLORS, SIZES } from '../constants'
import SellerCardItem from '../components/SellerCardItem'
import { useNavigation } from '@react-navigation/native'
import React, { useContext } from 'react'
import { AuthContext } from './../context/AuthContext'
import { ProductsContext } from './../context/ProductsContext'
import Ioniocons from 'react-native-vector-icons/Ionicons'

import { Caption } from 'react-native-paper'

const SellerScreen = () => {
  const navigation = useNavigation()
  const { user, updateUserInfo } = useContext(AuthContext)
  const { sellerProducts: productos, handleDelete } = useContext(ProductsContext)
  const onAddProductPress = () => {
    navigation.navigate('AddProduct')
  }

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Mis Productos</Text>
        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
          <Caption style={{ color: user.isActive ? '#4CAF50' : '#9E9E9E' }}>{user.isActive ? 'Activo' : 'Inactivo'}</Caption>
          <Switch
            trackColor={{ false: '#9E9E9E', true: '#4CAF50' }}
            thumbColor={user.isActive ? '#FFFFFF' : '#FFFFFF'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => { updateUserInfo() }
          }
            value={user.isActive}
            style={{ height: 25, transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{
          flex: 1,
          padding: 15,
          paddingTop: 0
        }}>
          {productos
            ? productos.map(producto => (
            <SellerCardItem
              handleDelete={handleDelete}
              isActive={user.isActive}
              producto={producto}
              key={producto.id}
            />
            ))
            : <Text>No cuentas con productos</Text>}
        </View>
      </ScrollView>

        <TouchableOpacity
              style={styles.btnIcon}
              onPress={onAddProductPress}
            >
              <Ioniocons name="add" size={40} color={COLORS.white} />
        </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1'
  },
  headerContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: SIZES.small,
    height: 50,
    width: '100%'
  },
  headerText: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'left',
    width: '43%'
  },
  // viewContainer: {
  //   paddingTop: 500,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#FFDD83'
  },
  subText: {
    color: COLORS.gray,
    fontSize: SIZES.small,
    marginTop: 10,
    marginBottom: 10
  },
  btnIcon: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 19
  }
})

export default SellerScreen
