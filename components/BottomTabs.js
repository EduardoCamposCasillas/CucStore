import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Ioniocons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants";

const BottomTabs = () => {
  return (
    <View style={styles.tabsContainer}>
      <Icon icon="home" text="Inicio" />
      <Icon icon="chatbox" text="Chat" />
      <Icon icon="person-circle" text="Cuenta" />
    </View>
  );
}

const Icon = (props) => (
  <View
  
  >
    <Ioniocons
      name={props.icon}
      size={25}
      style={{
        marginBottom: 3,
        alignSelf: 'center',
      }}
    />
    <Text>{props.text}</Text>
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