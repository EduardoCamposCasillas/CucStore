import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES } from './../constants/theme';
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
  const [textInputValue, setTextInputValue] = useState('')

  const searchProduct = (text) => {
    const filteredProducts = productos.map(usuario => {
      return {...usuario, productos: usuario.productos.filter(producto => producto.nombre.toLowerCase().includes(text.toLowerCase()))}
    })

    setProductos(filteredProducts)
  }
  useFocusEffect(
    React.useCallback(() => {
      axios.get(config.apiUrl + '/api/productos').then((req) => {
        const allProductsData = req.data
        setProductos(allProductsData)
      }).catch(e => {setProductos(null)});
    }, [textInputValue])
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
              onChangeText={(text) => setTextInputValue(text)}
              value={textInputValue}
              style={styles.searchInput}
              placeholder='¿Que estás buscando?'
            />
          </View>
          <TouchableOpacity
            style={styles.btnIcon}
            onPress={() => searchProduct(textInputValue)}
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
          
          {productos ? productos.map(usuario => {
            const { nombres, apellidoPaterno, id: idUsuario, productos } = usuario
            const nombre = nombres.split(' ')[0]
            const nombreUsuario = nombre + ' ' + apellidoPaterno
            return (productos.map(producto => {
              return (<CardItem
              isActive={true}
              nombreProducto={producto?.nombre}
              descripcion={producto.descripcion}
              puntaje={producto.puntaje}
              precio={producto.precio}
              imgUrl={producto.imgUrl}
              categoria={producto.categoria[0]?.nombre}
              nombreMarca = {usuario.nombreMarca}
              nombreUsuario={nombreUsuario}
              idUsuario={idUsuario}
              key={producto.id}
              onPress={() =>
                navigation.navigate('DetailsProduct', {
                  telefono: usuario.telefonos[0],
                  nombreMarca: usuario.nombreMarca,
                  nombreProducto: producto.nombre,
                  descripcion: producto.descripcion,
                  puntaje: producto.puntaje,
                  precio: producto.precio,
                  imgUrl: producto.imgUrl,
                  
                  nombreUsuario: nombreUsuario,
                  idUsuario: idUsuario,
                })}
              />)
            }))
          }) : <Text>No hay productos para mostrar</Text>}
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