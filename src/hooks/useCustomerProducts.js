import { useState, useEffect } from 'react'
import axios from 'axios'
import { config } from '../config'

export default function useCustomerProducts ({ activeTab, doCustomerProductsRequest }) {
  const [customerProducts, setCustomerProducts] = useState()
  const apiUrl = '/api/productos'

  useEffect(() => {
    axios.get(config.apiUrl + apiUrl).then((req) => {
      const allProductsData = req.data
      setCustomerProducts(allProductsData)
    }).catch(e => { setCustomerProducts(null) })
  }, [doCustomerProductsRequest, activeTab])

  return { customerProducts }
}
