import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Text, View, Linking, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Alert } from 'react-native'
import StarRatingDisplay from 'react-native-star-rating-widget'
import { COLORS, SIZES } from './../constants/index'
import Ioniocons from 'react-native-vector-icons/Ionicons'
import ImageViewer from './../components/ImageViewer'
import WavyHeader from './../components/WavyHeader'
import { createUserChat } from './../utils/socket'

const ProductDetailsScreen = () => {
  const { user } = useContext(AuthContext)
  const navigation = useNavigation()
  const route = useRoute()
  const {
    nombreProducto,
    descripcion,
    puntaje,
    precio,
    imgUrl,
    nombreUsuario,
    categoria,
    telefono,
    idUsuario,
    nombreMarca
  } = route.params

  const [rating, setRating] = useState(puntaje)

  const handlePhoneButton = () => {
    if (!telefono || telefono === 'undefined' || telefono === '') {
      Alert.alert('Error!', 'Este usuario no cuenta con telefono de contacto')
      return
    }
    const phoneNuber = telefono
    const url = `tel:${phoneNuber}`

    Linking.openURL(url).catch((e) => {
      Alert.alert('Error!', 'Error al intenar realizar la llamada, intentelo mas tarde')
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <WavyHeader
          customStyles={styles.svgCurve}
          customHeight={90}
          customTop={80}
          customBgColor={'#CE5959'}
          customWavePattern={'M0,32L18.5,48C36.9,64,74,96,111,90.7C147.7,85,185,43,222,64C258.5,85,295,171,332,224C369.2,277,406,299,443,288C480,277,517,235,554,192C590.8,149,628,107,665,96C701.5,85,738,107,775,133.3C812.3,160,849,192,886,192C923.1,192,960,160,997,133.3C1033.8,107,1071,85,1108,112C1144.6,139,1182,213,1218,229.3C1255.4,245,1292,203,1329,186.7C1366.2,171,1403,181,1422,186.7L1440,192L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z'}
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Home')
          }}>
            <Ioniocons name='arrow-back' size={25} color={'white'} />
          </TouchableOpacity>
          <Text
            style={styles.headerText}
          >Detalles del Producto</Text>
        </View>
        <View style={styles.viewContainer}>
          <Text style={styles.textTitle}>{nombreProducto}</Text>
          <View style={styles.imageViewerContainer}>
            <ImageViewer
              selectedImage={imgUrl}
            />
          </View>
          <Text >
              <StarRatingDisplay onChange={() => {}} rating={rating} starSize={25} starStyle={{ marginHorizontal: 0.5 }} />
          </Text>
          <Text style={styles.textTitle}>Descripción del producto</Text>
          <Text style={styles.textStyle}>{descripcion}</Text>
          <Text style={styles.textTitle}>Categoria</Text>
          {categoria.map(categoria => <Text key={categoria.id} style={styles.textStyle}>{categoria.nombre}</Text>)}
          <Text style={styles.textTitle}>Precio</Text>
          <Text style={styles.priceStyle}>{precio} $</Text>
          <Text style={styles.textTitle}>Vendedor</Text>
          <Text style={styles.textStyle}>{ nombreMarca ?? nombreUsuario}</Text>

        </View>
      </ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginBottom: 20 }}>
        <TouchableOpacity style={styles.btnIcon} onPress={handlePhoneButton}>
          <Ioniocons name="call" size={25} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnIcon} onPress={() => {
          createUserChat(idUsuario)
          navigation.navigate('ChatScreen', { screen: 'Mensajes' })
          setTimeout(() => {
            navigation.navigate('ChatScreen', { screen: 'Chat', params: { from: user.userId, to: idUsuario, nombreMarca, nombreUsuario } })
          }, 100)
        }}>
          <Ioniocons name="chatbox" size={25} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1'
  },
  headerContainer: {
    marginTop: 50,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerText: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  },
  viewContainer: {
    paddingTop: 70,
    paddingRight: 10,
    paddingLeft: 10
  },
  textTitle: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: COLORS.tertiary,
    justifyContent: 'flex-start',
    textAlign: 'left',
    marginTop: 10
  },
  textStyle: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: 'black',
    justifyContent: 'flex-start',
    textAlign: 'left'
  },
  priceStyle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: 'black',
    justifyContent: 'flex-start',
    textAlign: 'left'
  },
  subText: {
    color: COLORS.gray,
    fontSize: SIZES.small,
    marginTop: 10,
    marginBottom: 10
  },
  button: {
    backgroundColor: COLORS.primary,
    marginTop: 20,
    marginBottom: 20,
    width: '80%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10
  },
  buttonText: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.white,
    paddingRight: 10
  },
  logo: {
    marginBottom: 40,
    width: '80%',
    height: 100
  },
  btnIcon: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    height: 50,
    width: 100,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  imageViewerContainer: {
    flex: 1,
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 10

  }
})

export default ProductDetailsScreen
