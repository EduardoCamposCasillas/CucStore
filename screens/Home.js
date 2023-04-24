import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants';
import HeaderTabs from '../components/HeaderTabs';
import CardItem from '../components/CardItem';
import { Divider } from 'react-native-elements';
import BottomTabs from '../components/BottomTabs';
import { useState } from 'react';


const Home = () => {
  const [token, setToken] = useState(null)
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('accessToken')
      if(value !== null) {
        console.log(value);
      }
    } catch(e) {
      console.error(e);
    }
  }
  getToken()
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.lightWhite,
        flex: 1,
        
      }}>
      <View
        style={{
          backgroundColor: "white",
          padding: 15,
        }}>
        <HeaderTabs />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{
          flex: 1,
          padding: 15,
        }}>
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        </View>
      </ScrollView>
      <Divider width={1} />
      <View style={{backgroundColor: "white"}}>
      <BottomTabs />
      </View>

    </SafeAreaView>
  );
}

export default Home;