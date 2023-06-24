import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from './../context/AuthContext'
import { config } from './../config'

export default function useSellerProducts ({ activeTab, doSellerProductsRequest }) {
  const [sellerProducts, setSellerProducts] = useState()
  const { userToken } = useContext(AuthContext)
  const apiUrl = '/api/usuario/productos'

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
  }, [activeTab, doSellerProductsRequest])

  return { sellerProducts }
}
