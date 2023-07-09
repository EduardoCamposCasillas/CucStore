import { createContext, useState, useContext } from 'react'
import { Alert } from 'react-native'
import axios from 'axios'
import { AuthContext } from './../context/AuthContext'
import { config } from './../config'
import useCustomerProducts from '../hooks/useCustomerProducts'
import useSellerProducts from '../hooks/useSellerProducts'

export const ProductsContext = createContext()

export function ProductsProvider ({ children }) {
  const { user } = useContext(AuthContext)
  const [activeTab, setActiveTab] = useState(0)
  const [filteredProducts, setFilteredProducts] = useState(undefined)
  const [doCustomerProductsRequest, setDoCustomerProductsRequest] = useState(false)
  const [doSellerProductsRequest, setDoSellerProductsRequest] = useState(false)
  const { customerProducts } = useCustomerProducts({ activeTab, doCustomerProductsRequest })
  const { sellerProducts } = useSellerProducts({ activeTab, doSellerProductsRequest })

  const handleSwipe = (index) => {
    setActiveTab(index)
    if (index === 0) {
      setDoCustomerProductsRequest(!doCustomerProductsRequest)
    }
    if (index === 1) {
      setDoSellerProductsRequest(!doSellerProductsRequest)
    }
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
                Authorization: 'Bearer ' + user.userToken,
                'Content-Type': 'application/json'
              },
              data: {
                productId: productoId
              }
            }).then(response => {
              if (response.status === 204) {
                Alert.alert('¡Eliminado con exito!', 'El producto ha sido eliminado con exito')
                setDoSellerProductsRequest(!doSellerProductsRequest)
              }
            }).catch(e => Alert.alert('¡Error en el servidor!', 'Presentamos un error en el servidor porfavor intentelo mas tarde'))
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
        Authorization: 'Bearer ' + user.userToken,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      setDoSellerProductsRequest(!doSellerProductsRequest)
    }).catch(e => Alert.alert('¡Error en el servidor!', 'Presentamos un error en el servidor porfavor intentelo mas tarde'))
  }

  const handleAddProduct = (inputValues, selectedImage, selectedCategory) => {
    axios.post(config.apiUrl + '/api/usuario/productos', {
      nombre: inputValues.nombre,
      descripcion: inputValues.descripcion,
      precio: inputValues.precio,
      imgUrl: selectedImage,
      categoria: selectedCategory
    }, {
      headers: {
        Authorization: 'Bearer ' + user.userToken,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.status === 201) {
        Alert.alert('¡Registro exitoso!', 'El producto ha sido registrado con exito, sera redirigido a la ventana principal')
        setDoSellerProductsRequest(!doSellerProductsRequest)
      }
    }).catch(error => {
      if (error.response.status === 500) {
        Alert.alert('¡Error en el servidor!', 'Presentamos un error en el servidor porfavor intentelo mas tarde')
      }
    })
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
      activeTab,
      handleAddProduct
    }}>
        {children}
    </ProductsContext.Provider>
  )
}
