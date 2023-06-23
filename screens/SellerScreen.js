import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, SIZES } from '../constants';
import HeaderTabs from './../components/HeaderTabs';
import CardItem from './../components/CardItem';
import { Divider } from 'react-native-elements';
import BottomTabs from './../components/BottomTabs';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from './../context/AuthContext';
import Ioniocons from "react-native-vector-icons/Ionicons";
import React, { useState } from 'react';
import { config } from './../config';
import { Caption } from 'react-native-paper';


const SellerScreen = () => {
  const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(true);
  const navigation = useNavigation();
  const [userProducts, setUserProducts] = useState()
  const { userToken, isActive, updateUserInfo } = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(isActive)
  const [showBox, setShowBox] = useState(true);


  const showConfirmDialog = (productoId) => {
    return Alert.alert(
      "¿Estas Seguro?",
      "Estas seguro de querer eliminar este producto?",
      [
        // The "Yes" button
        {
          text: "Si",
          onPress: () => {
           axios.delete(config.apiUrl + '/api/usuario/productos', {
            headers: {
              Authorization: 'Bearer ' + userToken,
              'Content-Type': 'application/json'
            },
            data: {
              productId: productoId,
            }
           }).then(response => {
            if(response.status === 204){
              navigation.navigate('Home')
              return
            }
          }).catch(e => console.log(e))
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  const onAddProductPress = () => {
    navigation.navigate('AddProduct');
  }

  useFocusEffect(
    React.useCallback(() => {
      axios.get(config.apiUrl + '/api/usuario/productos', {
        headers: {
          'Authorization': 'Bearer ' + userToken,
          'Content-Type': 'application/json'
        }
      }).then((req) => {
        const allUserProducts = req.data
        setUserProducts(allUserProducts)
      }).catch(e => console.error(e))
    },[])
  )

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Mis Productos</Text>
        <View style={{flexDirection:'row', alignContent: 'center' }}>
          <Caption style={{ marginRight: 5, color: isActive ? '#4CAF50' : '#9E9E9E' }}>{isActive ? 'Activo' : 'Inactivo'}</Caption>
          <Switch
            trackColor={{false: '#9E9E9E', true: '#4CAF50'}}
            thumbColor={isActive ? '#FFFFFF' : '#FFFFFF'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {updateUserInfo()}
          }
            value={isActive}
            style={{height: 25, transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }], marginRight: 15}}
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{
          flex: 1,
          padding: 15,
          paddingTop: 0,
        }}>
          {userProducts ? userProducts.map(producto => (
            <CardItem
              isActive={isActive}
              nombreProducto={producto.nombre}
              precio={producto.precio}
              puntaje={producto.puntaje}
              imgUrl={producto.imgUrl}
              key={producto.id}
              showEditDeleteButtons={showEditDeleteButtons}
              onEditPress={() =>
                navigation.navigate('EditProduct', {
                  productoId: producto.id,
                  nombreProducto: producto.nombre,
                  descripcion: producto.descripcion,
                  puntaje: producto.puntaje,
                  precio: producto.precio,
                  imgUrl: producto.imgUrl,
                  categoria: producto.categoria[0]?.nombre
                })}
              onDeletePress={() => showConfirmDialog(producto.id)}
            />
          )): <Text>No cuentas con productos</Text>}
        </View>
      </ScrollView>
      
        <TouchableOpacity
              style={styles.btnIcon}
              onPress={onAddProductPress}
            >
              <Ioniocons name="add" size={40} color={COLORS.white} />
        </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: "row",
    marginTop: SIZES.small,
    height: 50,
  },
  headerText: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    width: '43%',
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
    backgroundColor: '#FFDD83',
  },
  subText: {
    color: COLORS.gray,
    fontSize: SIZES.small,
    marginTop: 10,
    marginBottom: 10,
  },
  btnIcon: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 19
  },
});

export default SellerScreen;