import { View, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native';


import { COLORS } from './constants';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Home from './screens/Home';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <RegisterScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
