import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES } from '../constants';
import ImageViewer from './ImageViewer';
import { useNavigation } from '@react-navigation/native';
import StarRatingDisplay from 'react-native-star-rating-widget';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CardItem = ({isActive ,nombreProducto, puntaje, precio, imgUrl, nombreUsuario, nombreMarca, onPress, showEditDeleteButtons, onEditPress, onDeletePress }) => {
  const [rating, setRating] = useState(puntaje)

  return (
    <View style={{opacity: isActive ? 1 : .4}} >
      <TouchableOpacity style={styles.cardItem} onPress={onPress}>
        {/* Image  */}
        <View
          style={{ marginBottom: 10,  borderRadius: 30,}}
        >
          <ImageViewer
            selectedImage={imgUrl}
            resizeMode="cover"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
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

            <Text >
              <StarRatingDisplay onChange={() => {}} rating={rating} starSize={25} starStyle={{ marginHorizontal: 0.5 }} />
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 10,
          justifyContent: 'space-between'
        }}
      >
        <Text style={styles.productText}>{nombreProducto}</Text>
        
        <Text style={styles.vendedorText}>{ nombreMarca ?? nombreUsuario}</Text>
        {showEditDeleteButtons && (
          <>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={onEditPress}>
              <MaterialCommunityIcons name='square-edit-outline' size={20} color={COLORS.tertiary} />
              <Text style={{ fontSize: SIZES.medium }}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={onDeletePress}>
              <MaterialCommunityIcons name='delete' size={20} color={'red'} />
              <Text style={{ fontSize: SIZES.medium }}>Eliminar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      {/*Modal */}
      
    </View>
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
    marginBottom: 0,
    marginTop: 10,
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
  },

})

export default CardItem;