import { useState, useEffect } from 'react'
import axios from 'axios'

import { config } from '../config'
export default function useCustomerProducts ({ activeTab }) {
  const [filteredProducts, setFilteredProducts] = useState(undefined)
  const [doProductsRequest, setDoProductsRequest] = useState(false)
  const [customerProducts, setCustomerProducts] = useState()

  const apiUrl = '/api/productos'

  const searchProduct = (text) => {
    console.log(text)
    if (text === '') {
      setFilteredProducts(undefined)
      setDoProductsRequest(!doProductsRequest)
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

  useEffect(() => {
    axios.get(config.apiUrl + apiUrl).then((req) => {
      const allProductsData = req.data
      setCustomerProducts(allProductsData)
    }).catch(e => { setCustomerProducts(null) })
  }, [doProductsRequest, activeTab])

  return { customerProducts, searchProduct, filteredProducts, setDoProductsRequest, doProductsRequest }
}
