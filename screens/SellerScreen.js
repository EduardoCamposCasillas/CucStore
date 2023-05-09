import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, SIZES } from '../constants';
import HeaderTabs from '../components/HeaderTabs';
import CardItem from '../components/CardItem';
import { Divider } from 'react-native-elements';
import BottomTabs from '../components/BottomTabs';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Ioniocons from "react-native-vector-icons/Ionicons";
import React, { useState } from 'react';
import { config } from '../config';


const SellerScreen = () => {
  const [showEditDeleteButtons, setShowEditDeleteButtons] = useState(true);
  const navigation = useNavigation();
  const [userProducts, setUserProducts] = useState()
  const { userToken } = useContext(AuthContext);
  
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
    <SafeAreaView
      style={{
        backgroundColor: COLORS.lightWhite,
        flex: 1,

      }}>
      <View
        style={{
          backgroundColor: "white",
          padding: 15,
        }}>
        <HeaderTabs />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Mis Productos</Text>
          <TouchableOpacity
            style={styles.btnIcon}
            onPress={onAddProductPress}
          >
            <Ioniocons name="add" size={25} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{
          flex: 1,
          padding: 15,
        }}>
          {userProducts ? userProducts.map(producto => (
            <CardItem
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
      <Divider width={1} />
      <View style={{ backgroundColor: "white" }}>
        <BottomTabs />
      </View>

    </SafeAreaView>
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
    marginTop: SIZES.large,
    height: 50,
  },
  headerText: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    width: '50%',
    borderRadius: 10
  },
  viewContainer: {
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SellerScreen;