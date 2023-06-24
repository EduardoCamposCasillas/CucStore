import { AuthProvider } from './src/context/AuthContext'
import { ProductsProvider } from './src/context/ProductsContext'
import AppNav from './src/navigation/AppNav'

const App = () => {
  return (
    <AuthProvider>
      <ProductsProvider>
        <AppNav />
      </ProductsProvider>
    </AuthProvider>
  )
}
export default App
