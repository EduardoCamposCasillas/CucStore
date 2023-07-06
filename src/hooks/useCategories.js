import { useState, useEffect } from 'react'
import axios from 'axios'
import { config } from '../config'

export default function useCategories () {
  const [categorias, setCategorias] = useState()

  useEffect(() => {
    axios.get(config.apiUrl + '/api/categorias').then(categorias => {
      const data = []
      const categoriasData = categorias.data
      categoriasData.map(categoria => (
        data.push({ key: categoria.id, value: categoria.nombre })
      ))
      setCategorias(data)
    })
  }, [])

  return { categorias }
}
