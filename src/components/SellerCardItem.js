import { TouchableOpacity, Text, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS, SIZES } from '../constants/theme'
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react'
import { ProductsContext } from './../context/ProductsContext'
import CardItem from './CardItem'

export default function SellerCardItem ({ producto, isActive }) {
  const navigation = useNavigation()
  const { handleDeleteSellerProduct } = useContext(ProductsContext)
  const handleEditButton = () => {
    navigation.navigate('EditProduct', {
      productoId: producto.id,
      nombreProducto: producto.nombre,
      descripcion: producto.descripcion,
      puntaje: producto.puntaje,
      precio: producto.precio,
      imgUrl: producto.imgUrl,
      categoria: producto.categoria[0]?.nombre
    })
  }

  return (
        <View>
            <CardItem producto={producto} isActive={isActive}/>
            <View style={{ position: 'absolute', bottom: 5, right: 15, flexDirection: 'row' }}>
                <TouchableOpacity style={{ marginHorizontal: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={handleEditButton}>
                <MaterialCommunityIcons name='square-edit-outline' size={20} color={COLORS.tertiary} />
                <Text style={{ fontSize: SIZES.medium, marginHorizontal: 1 }}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => handleDeleteSellerProduct(producto.id)}>
                <MaterialCommunityIcons name='delete' size={20} color={'red'} />
                <Text style={{ fontSize: SIZES.medium, marginHorizontal: 1 }}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
  )
}
