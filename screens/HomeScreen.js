import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES } from '../constants';
import HeaderTabs from '../components/HeaderTabs';
import CardItem from '../components/CardItem';
import { Divider } from 'react-native-elements';
import BottomTabs from '../components/BottomTabs';
import { useState } from 'react';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import Ioniocons from "react-native-vector-icons/Ionicons";
import { config } from '../config';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [productos, setProductos] = useState();
  const navigation = useNavigation();

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('accessToken')
      if (value !== null) {
        console.log(value);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      axios.get(config.apiUrl + '/api/productos').then((req) => {
        const allProductsData = req.data
        setProductos(allProductsData)
      });
    }, [])
  );

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
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder='¿Que estás buscando?'
            />
          </View>
          <TouchableOpacity
            style={styles.btnIcon}
          >
            <Ioniocons name="search" size={25} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{
          flex: 1,
          padding: 15,
        }}>
          {productos && productos.map(usuario => {
            const { nombres, apellidoPaterno, id: idUsuario, productos } = usuario
            const nombre = nombres.split(' ')[0]
            const nombreUsuario = nombre + ' ' + apellidoPaterno
            return (productos.map(producto => {
              return (<CardItem
              nombreProducto={producto.nombre}
              descripcion={producto.descripcion}
              puntaje={producto.puntaje}
              precio={producto.precio}
              imgUrl={producto.imgUrl}
              categoria={producto.categoria[0].nombre}
              nombreUsuario={nombreUsuario}
              idUsuario={idUsuario}
              key={producto.id}
              onPress={() =>
                navigation.navigate('DetailsProduct', {
                  nombreProducto: producto.nombre,
                  descripcion: producto.descripcion,
                  puntaje: producto.puntaje,
                  precio: producto.precio,
                  imgUrl: producto.imgUrl,
                  categoria: producto.categoria[0].nombre,
                  nombreUsuario: nombreUsuario,
                  idUsuario: idUsuario,
                })}
              />)
            }))
          })}
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
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  btnIcon: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  }
});


export default HomeScreen;