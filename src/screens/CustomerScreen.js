import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { COLORS, SIZES } from '../constants/theme'
import CardItem from '../components/CardItem'
import { useContext } from 'react'
import { ProductsContext } from './../context/ProductsContext'
import { useNavigation } from '@react-navigation/native'

import Ioniocons from 'react-native-vector-icons/Ionicons'

const CustomerScreen = () => {
  const navigation = useNavigation()
  const { customerProducts: productos, filteredProducts, searchCustomerProduct } = useContext(ProductsContext)

  return (
    <>
      <View
        style={{
          marginTop: 10,
          marginBottom: 5,
          marginHorizontal: 15,
          backgroundColor: COLORS.white,
          borderRadius: 30
        }}>

        <View style={styles.searchContainer}>
            <TextInput
              onChangeText={(text) => {
                searchCustomerProduct(text)
              }}
              placeholder='¿Que estás buscando?'
              style={{ width: '90%' }}
            />
          <TouchableOpacity
            style={styles.btnIcon}
          >
            <Ioniocons name="search" size={15} color={COLORS.white} />
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
                          usuario={[nombreMarca, nombreUsuario, idUsuario] }
                          key={producto.id}
                          onPress={() =>
                            navigation.navigate('DetailsProduct', {
                              telefono: usuario.telefonos,
                              nombreMarca: usuario.nombreMarca,
                              nombreProducto: producto.nombre,
                              descripcion: producto.descripcion,
                              puntaje: producto.puntaje,
                              precio: producto.precio,
                              imgUrl: producto.imgUrl,
                              categoria: producto.categoria,
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
                  telefono: usuario.telefonos,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: SIZES.xSmall,
    marginBottom: SIZES.xSmall,
    height: 25,
    paddingHorizontal: 10
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.medium,
    height: '100%'
  },
  btnIcon: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default CustomerScreen
