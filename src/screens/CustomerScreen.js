import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { COLORS, SIZES } from '../constants/theme'
import CardItem from '../components/CardItem'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import Ioniocons from 'react-native-vector-icons/Ionicons'

const CustomerScreen = ({ productos, filteredProducts, searchProduct }) => {
  const navigation = useNavigation()

  return (
    <>
      <View
        style={{
          backgroundColor: 'white'
        }}>

        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              onChangeText={(text) => {
                searchProduct(text)
              }}
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
          paddingHorizontal: 15
        }}>

          {filteredProducts === undefined
            ? productos
              ? productos?.map(usuario => {
                const { id: idUsuario, productos, nombreCompleto, nombreMarca } = usuario
                const nombreUsuario = nombreCompleto?.split(' ')[0] + ' ' + nombreCompleto?.split(' ')[2]
                return (productos?.map(producto => {
                  return (<CardItem
                          isActive={true}
                          producto={producto}
                          // nombreProducto={producto?.nombre}
                          // descripcion={producto.descripcion}
                          // puntaje={producto.puntaje}
                          // precio={producto.precio}
                          // imgUrl={producto.imgUrl}
                          // categoria={producto.categoria[0]?.nombre}

                          usuario={[nombreMarca, nombreUsuario, idUsuario] }
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

                              nombreUsuario,
                              idUsuario
                            })}
                          />)
                }))
              })
              : <Text>No hay productos para mostrar</Text>
            : filteredProducts && filteredProducts?.map(usuario => {
              const { nombreCompleto, id: idUsuario, productos, nombreMarca } = usuario
              const nombreUsuario = nombreCompleto?.split(' ')[0] + nombreCompleto?.split(' ')[2]
              return (productos?.map(producto => {
                return (<CardItem
              isActive={true}
              producto={producto}
              usuario={[nombreMarca, nombreUsuario, idUsuario] }
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

                  nombreUsuario,
                  idUsuario
                })}
              />)
              }))
            })}
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: SIZES.large,
    height: 50,
    paddingHorizontal: 15
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: 'red',
    marginRight: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.medium,
    height: '100%'
  },
  searchInput: {
    width: '100%',
    height: '100%',
    paddingHorizontal: SIZES.medium,
    padding: 1,
    backgroundColor: 'white'
  },
  btnIcon: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CustomerScreen
