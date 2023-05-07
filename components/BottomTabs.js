import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Ioniocons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants";

const BottomTabs = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.tabsContainer}>

      <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
        <Icon icon="home" text="Inicio" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('ChatScreen') }}>
        <Icon icon="chatbox" text="Chat" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
        <Icon icon="person-circle" text="Cuenta" />
      </TouchableOpacity>
    </View>
  );
}

const Icon = (props) => (
  <View
  >
    <Ioniocons
      name={props.icon}
      size={25}
      color={COLORS.primary}
      style={{
        marginBottom: 3,
        alignSelf: 'center',
      }}
    />
    <Text style={{ fontWeight: 'bold' }}>{props.text}</Text>
  </View>

)

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    margin: 10,
    marginHorizontal: 30,
    justifyContent: 'space-between'
  }
});

export default BottomTabs;