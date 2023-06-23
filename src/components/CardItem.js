import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS, SIZES } from './../constants/theme'
import ImageViewer from './../components/ImageViewer'
import StarRatingDisplay from 'react-native-star-rating-widget'

const CardItem = ({ isActive, producto, usuario, onPress }) => {
  const [rating, setRating] = useState(producto.puntaje)

  return (
    <View style={{ opacity: isActive ? 1 : 0.4 }} >
      <TouchableOpacity style={styles.cardItem} onPress={onPress}>
        {/* Image  */}
        <View
          style={{ marginBottom: 10, borderRadius: 30 }}
        >
          <ImageViewer
            selectedImage={producto.imgUrl}
            resizeMode="cover"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              width: '100%',
              height: 200,
              borderRadius: 30
            }}
          />
          <View
            style={styles.priceContainer}
          >
            <Text style={{ fontWeight: 'bold', fontSize: SIZES.medium, color: COLORS.white }}>${producto.precio}</Text>
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
          justifyContent: 'space-between',
          paddingVertical: 1
        }}
      >
      <Text style={styles.productText}>{producto.nombre}</Text>

      {usuario && <Text style={styles.vendedorText}>{ usuario[0] ?? usuario[1]}</Text>}

      </View>
      {/* Modal */}

    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1
  },
  productText: {
    fontWeight: 'bold',
    fontSize: SIZES.large
  },
  vendedorText: {
    fontWeight: 'bold',
    fontSize: SIZES.medium
  },
  cardItem: {
    marginBottom: 0,
    marginTop: 10
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
    justifyContent: 'center'
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
    justifyContent: 'center'
  }

})

export default CardItem
