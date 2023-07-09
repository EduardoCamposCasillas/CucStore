import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from './../context/AuthContext'
import { config } from './../config'
import { Alert } from 'react-native'

export default function useSellerProducts ({ activeTab, doSellerProductsRequest }) {
  const [sellerProducts, setSellerProducts] = useState()
  const { user } = useContext(AuthContext)
  const apiUrl = '/api/usuario/productos'

  useEffect(() => {
    if (user.userToken) {
      axios.get(config.apiUrl + apiUrl, {
        headers: {
          Authorization: 'Bearer ' + user.userToken,
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        const allUserProducts = res.data
        if (res.status === 200) {
          setSellerProducts(allUserProducts)
        }
        if (res.status === 204) {
          setSellerProducts(null)
        }
      }).catch(e => {
        Alert.alert('¡Error en el servidor!', 'Presentamos un error en el servidor porfavor intentelo mas tarde')
      })
    }
  }, [doSellerProductsRequest, user.userToken])

  return { sellerProducts }
}
