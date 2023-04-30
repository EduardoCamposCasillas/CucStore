import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, SIZES } from '../constants';
import HeaderTabs from '../components/HeaderTabs';
import CardItem from '../components/CardItem';
import { Divider } from 'react-native-elements';
import BottomTabs from '../components/BottomTabs';
import { useNavigation } from '@react-navigation/native';

import Ioniocons from "react-native-vector-icons/Ionicons";


const SellerScreen = () => {
  const navigation = useNavigation();

  const onAddProductPress = () => {
    navigation.navigate('AddProduct');
  }
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
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Mis Productos</Text>
          <TouchableOpacity
          style={styles.btnIcon}
          onPress={onAddProductPress}
        >
          <Ioniocons name="add" size={25} color={COLORS.white} />
        </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{
          flex: 1,
          padding: 15,
        }}>
          <CardItem />
          <CardItem />
        </View>
      </ScrollView>
      <Divider width={1} />
      <View style={{ backgroundColor: "white" }}>
        <BottomTabs />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  headerText: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    width: '50%',
    borderRadius: 10
  },
  viewContainer: {
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#FFDD83',
  },
  subText: {
    color: COLORS.gray,
    fontSize: SIZES.small,
    marginTop: 10,
    marginBottom: 10,
  },
  btnIcon: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default SellerScreen;