import { useState, useContext, useEffect } from 'react'
import { Alert } from 'react-native'
import axios from 'axios'
import { AuthContext } from './../context/AuthContext'
import { config } from './../config'

export default function useSellerProducts ({ activeTab }) {
  const [sellerProducts, setSellerProducts] = useState()
  const [doRequest, setDoRequest] = useState(false)
  const { userToken } = useContext(AuthContext)
  const apiUrl = '/api/usuario/productos'

  const handleDelete = (productoId) => {
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
                setDoRequest(!doRequest)
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
  useEffect(() => {
    axios.get(config.apiUrl + apiUrl, {
      headers: {
        Authorization: 'Bearer ' + userToken,
        'Content-Type': 'application/json'
      }
    }).then((req) => {
      const allUserProducts = req.data
      setSellerProducts(allUserProducts)
    }).catch(e => console.error(e))
  }, [activeTab, doRequest])

  return { sellerProducts, handleDelete, setDoRequest, doRequest }
}
