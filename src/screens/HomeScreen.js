import { View } from 'react-native'
import { Divider } from 'react-native-elements'
import Swiper from 'react-native-swiper'
import CustomerScreen from './CustomerScreen'
import SellerScreen from './SellerScreen'
import BottomTabs from './../components/BottomTabs'
import HeaderTabs from './../components/HeaderTabs'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from './../constants/theme'
import { useContext } from 'react'
import { ProductsContext } from '../context/ProductsContext'

const HomeScreen = () => {
  const { handleSwipe } = useContext(ProductsContext)
  return (

    <SafeAreaView style={{
      backgroundColor: COLORS.lightWhite,
      flex: 1
    }}>
        <HeaderTabs />

        <Swiper
        onIndexChanged={handleSwipe}
        loop={false}
        showsPagination={false}
        showsHorizontalScrollIndicator={true}
        scrollsToTop={true} >
          <CustomerScreen />
          <SellerScreen />
         </Swiper>
        <Divider width={1} />
        <View style={{ backgroundColor: 'white' }}>
            <BottomTabs />
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen
