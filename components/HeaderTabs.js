import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export default function HeaderTabs() {
  const [activeTab, setActiveTab] = useState("Comprador");
  return (
    <View style={{ flexDirection: "row", alignSelf: "center" }}>
      <HeaderButton
        text="Compardor"
        btnColor="Black"
        textColor="white"
        activeTab={activeTab}
        setActiveTab={setActiveTab}

      />
      <HeaderButton
        text="Vendedor"
        btnColor="white"
        textColor="black"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </View>
  );
}

const HeaderButton = (props) => (
  <TouchableOpacity
    style={{
      backgroundColor: props.activeTab === props.text ? "black" : "white",
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 30,
    }}
    onPress={() => props.setActiveTab(props.text)}
  >
    <Text style={{
      color: props.activeTab === props.text ? "white" : "black",
      fontSize: 15,
      fontWeight: "900"
    }}>
      {props.text}
    </Text>
  </TouchableOpacity>
);
