import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements'
import Swiper from 'react-native-swiper';
import CustomerScreen from './CustomerScreen';
import SellerScreen from './SellerScreen';
import BottomTabs from '../components/BottomTabs';
import HeaderTabs from '../components/HeaderTabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../constants/theme';
import { useState } from 'react';


const HomeScreen = () => {

  const [activeTab, setActiveTab] = useState(0);

  const handleSwipe = (index) => {
    setActiveTab(index)
   
  };

  return (

    <SafeAreaView style={{
        backgroundColor: COLORS.lightWhite,
        flex: 1,
      }}>
        <HeaderTabs isActive={activeTab} />
        <Swiper  onIndexChanged={handleSwipe} loop={false} showsPagination={false}>
            <CustomerScreen />
            <SellerScreen />
        </Swiper>
        <Divider width={1} />
        <View style={{ backgroundColor: "white" }}>
            <BottomTabs />
        </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
