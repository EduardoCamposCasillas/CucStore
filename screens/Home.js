import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants';
import HeaderTabs from '../components/HeaderTabs';
import CardItem from '../components/CardItem';
import { Divider } from 'react-native-elements';
import BottomTabs from '../components/BottomTabs';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


const Home = () => {
  const [productos, setProductos] = useState()
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('accessToken')
      if(value !== null) {
        console.log(value);
      }
    } catch(e) {
      console.error(e);
    }
  }
  getToken()
  useEffect(() => {
    axios.get('http://192.168.100.10:3000/api/productos').then((req) => {
      const allProductsData = req.data
      setProductos(allProductsData)
    })
  }, [])

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
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{
          flex: 1,
          padding: 15,
        }}>
        { productos && productos.map(usuario => {
          const {nombres, apellidoPaterno, id: idUsuario, productos} = usuario
          const nombre = nombres.split(' ')[0]
          console.log(nombre + ' ' + apellidoPaterno);
          productos.map(producto => {
            console.log(producto)
          })
        })}
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        </View>
      </ScrollView>
      <Divider width={1} />
      <View style={{backgroundColor: "white"}}>
      <BottomTabs />
      </View>

    </SafeAreaView>
  );
}

export default Home;