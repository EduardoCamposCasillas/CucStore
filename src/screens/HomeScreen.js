import { useState } from 'react'
import { View } from 'react-native'
import { Divider } from 'react-native-elements'
import Swiper from 'react-native-swiper'
import CustomerScreen from './CustomerScreen'
import SellerScreen from './SellerScreen'
import BottomTabs from './../components/BottomTabs'
import HeaderTabs from './../components/HeaderTabs'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from './../constants/theme'
import useCustomerProducts from '../hooks/useCustomerProducts'
import useSellerProducts from './../hooks/useSellerProducts'

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState(0)
  const { customerProducts, filteredProducts, searchProduct } = useCustomerProducts({ activeTab })
  const { sellerProducts, handleDelete } = useSellerProducts({ activeTab })

  const handleSwipe = (index) => {
    setActiveTab(index)
  }

  return (

    <SafeAreaView style={{
      backgroundColor: COLORS.lightWhite,
      flex: 1
    }}>
        <HeaderTabs isActive={activeTab} />

        <Swiper onIndexChanged={handleSwipe} loop={false} showsPagination={false}>
          <CustomerScreen productos={customerProducts} filteredProducts={filteredProducts} searchProduct={searchProduct} />
          <SellerScreen productos={sellerProducts} handleDelete={handleDelete} />
         </Swiper>
        <Divider width={1} />
        <View style={{ backgroundColor: 'white' }}>
            <BottomTabs />
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen
