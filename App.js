import { View, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native';


import { COLORS } from './constants';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Home from './screens/Home';
import SellerScreen from './screens/SellerScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <SellerScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
