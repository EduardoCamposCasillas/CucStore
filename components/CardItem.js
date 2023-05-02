import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES } from '../constants';
import ImageViewer from './ImageViewer';
import { useNavigation } from '@react-navigation/native';

import Ioniocons from "react-native-vector-icons/Ionicons";

const CardItem = ({ nombreProducto, descripcion, puntaje, precio, imgUrl, nombreUsuario, categoria , idUsuario, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardItem} onPress={onPress}>
      {/* Image  */}
      <View
        style={{ marginBottom: 10 }}
      >
        <ImageViewer
          selectedImage={imgUrl}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 200,
            borderRadius: 30,
          }}
        />
        <View
          style={styles.priceContainer}
        >
          <Text style={{ fontWeight: 'bold', fontSize: SIZES.medium, color: COLORS.white }}>${precio}</Text>
        </View>
        <View
          style={styles.starContainer}
        >
          <Text style={{ fontWeight: 'bold' }}>
            <Ioniocons name="star" size={15} color={COLORS.white} />
            <Ioniocons name="star" size={15} color={COLORS.white} />
            <Ioniocons name="star" size={15} color={COLORS.white} />
            <Ioniocons name="star" size={15} color={COLORS.white} />
            <Ioniocons name="star" size={15} color={COLORS.white} />
          </Text>
        </View>
      </View>
      {/* Item Info */}
      <Text style={styles.productText}>{nombreProducto}</Text>
      {/* Item rating */}

      <View
        style={{
          flexDirection: 'row',
          marginLeft: 10,
          justifyContent: 'space-between'
        }}
      >
        <Text><Ioniocons name="star" size={15} /> 4.5</Text>
        <Text style={styles.vendedorText}>{nombreUsuario}</Text>
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
  },
  cardItem: {
    marginBottom: 20,
  },
  priceContainer: {
    position: 'absolute',
    top: 30,
    height: 40,
    width: 100,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starContainer: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    right: 0,
    width: 140,
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  }

})

export default CardItem;