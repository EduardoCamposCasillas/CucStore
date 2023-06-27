import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { config } from '../config'
import { Alert } from 'react-native'

export default function useCustomerProducts ({ activeTab, doCustomerProductsRequest }) {
  const [customerProducts, setCustomerProducts] = useState()
  const apiUrl = '/api/productos'

  const fetchData = useCallback(() => {
    const delay = 500 // Tiempo de espera deseado en milisegundos

    const timer = setTimeout(() => {
      axios
        .get(config.apiUrl + apiUrl)
        .then((req) => {
          const allProductsData = req.data
          setCustomerProducts(allProductsData)
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setCustomerProducts(null)
          }
          if (error.response.status === 500) {
            Alert.alert(
              '!Error en el servidor!',
              'Presentamos un error en el servidor por favor inténtelo más tarde'
            )
          }
        })
    }, delay)

    return () => clearTimeout(timer) // Limpiar el temporizador en caso de que se desmonte el componente antes de que se complete el tiempo de espera
  }, [doCustomerProductsRequest])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { customerProducts }
}
