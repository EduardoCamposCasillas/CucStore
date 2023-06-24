import { createContext, useState, useContext } from 'react'
import { Alert } from 'react-native'
import axios from 'axios'
import { AuthContext } from './../context/AuthContext'
import { config } from './../config'
import useCustomerProducts from '../hooks/useCustomerProducts'
import useSellerProducts from '../hooks/useSellerProducts'

export const ProductsContext = createContext()

export function ProductsProvider ({ children }) {
  const { userToken } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState(0)
  const [filteredProducts, setFilteredProducts] = useState(undefined)
  const [doCustomerProductsRequest, setDoCustomerProductsRequest] = useState(false)
  const [doSellerProductsRequest, setDoSellerProductsRequest] = useState(false)
  const { customerProducts } = useCustomerProducts({ activeTab, doCustomerProductsRequest })
  const { sellerProducts } = useSellerProducts({ activeTab, doSellerProductsRequest })

  const handleSwipe = (index) => {
    setActiveTab(index)
  }

  const searchCustomerProduct = (text) => {
    if (text === '') {
      setFilteredProducts(undefined)
      setDoCustomerProductsRequest(!doCustomerProductsRequest)
      return
    }

    const arrayFilteredProducts = customerProducts.map(usuario => {
      return {
        ...usuario,
        productos: usuario.productos.filter(producto => {
          const productName = producto.nombre.toLowerCase()
          const searchText = text.toLowerCase()
          return productName.startsWith(searchText)
        })
      }
    })

    setFilteredProducts(arrayFilteredProducts)
  }

  const handleDeleteSellerProduct = (productoId) => {
    return Alert.alert(
      '¿Estas Seguro?',
      'Estas seguro de querer eliminar este producto?',
      [
        // The "Yes" button
        {
          text: 'Si',
          onPress: () => {
            axios.delete(config.apiUrl + '/api/usuario/productos', {
              headers: {
                Authorization: 'Bearer ' + userToken,
                'Content-Type': 'application/json'
              },
              data: {
                productId: productoId
              }
            }).then(response => {
              if (response.status === 204) {
                setDoSellerProductsRequest(!doSellerProductsRequest)
              }
            }).catch(e => console.log(e))
          }
        },
        {
          text: 'No'
        }
      ]
    )
  }
  const handleEditSellerProduct = (inputValues, productoId, selectedImage, selectedCategory) => {
    axios.put(config.apiUrl + '/api/usuario/productos', {
      productId: productoId,
      nombre: inputValues?.nombre,
      descripcion: inputValues?.descripcion,
      precio: inputValues?.precio,
      imgUrl: selectedImage,
      categoria: selectedCategory
    }, {
      headers: {
        Authorization: 'Bearer ' + userToken,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.status === 200) {
        setDoSellerProductsRequest(!doSellerProductsRequest)
        return true
      } else {
        console.log('modal de error en el servidor intentar mas tarde')
      }
    }).catch(e => console.log(e))
  }
  return (
    <ProductsContext.Provider value={{
      customerProducts,
      sellerProducts,
      handleSwipe,
      searchCustomerProduct,
      filteredProducts,
      handleDeleteSellerProduct,
      handleEditSellerProduct,
      activeTab
    }}>
        {children}
    </ProductsContext.Provider>
  )
}
