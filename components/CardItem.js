import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES } from '../constants';

import Ioniocons from "react-native-vector-icons/Ionicons"

const Hamburguesa = require('../assets/images/Hamburguesa.jpg');

const CardItem = () => {
  return (
    <TouchableOpacity
      style={{
        marginBottom: 20
      }}
    >
      {/* Image  */}
      <View
        style={{ marginBottom: 10 }}
      >
        <Image
          source={Hamburguesa}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 200,
            borderRadius: 30
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: 50,
            width: 100,
            backgroundColor: 'white',
            borderTopRightRadius: 30,
            borderBottomLeftRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            ...styles.shadow
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>$50</Text>
        </View>
      </View>
      {/* Item Info */}
      <Text style={styles.productText}>Nombre del Producto</Text>
      {/* Item rating */}

      <View
        style={{
          flexDirection: 'row',
          marginLeft: 10,
          justifyContent: 'space-between'
        }}
      >
        <Text><Ioniocons name="star" size={15} /> 4.5</Text>
        <Text style={styles.vendedorText}>Nombre del Vendedor </Text>
      </View>
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  productText: {
    fontWeight: 'bold',
    fontSize: SIZES.large,
  },
  vendedorText: {
    fontWeight: 'bold',
    fontSize: SIZES.medium,
  }

})

export default CardItem;