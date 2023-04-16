import { View, Text, SafeAreaView, StyleSheet } from 'react-native';


import { COLORS } from './constants';

import LoginScreen from './screens/LoginScreen';
import Home from './screens/Home';

const App = () => {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
