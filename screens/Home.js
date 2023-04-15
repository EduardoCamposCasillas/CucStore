import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../constants';
import HeaderTabs from '../components/HeaderTabs';
import CardItem from '../components/CardItem';


const Home = () => {
  return (
    <SafeAreaView 
    style={{
      backgroundColor: "#eee",
      flex: 1,
    }}>
      <View 
      style={{
        backgroundColor: "white",
        padding: 15,
      }}>
        <HeaderTabs />
        <CardItem />
      </View>
    </SafeAreaView>
  );
}

export default Home;