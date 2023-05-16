import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from './../constants/index';
import { useNavigation, useRoute } from '@react-navigation/native';



export default function HeaderTabs() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Comprador');

  return (
    <View>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <HeaderButton
          name="Home"
          text="Comprador"
          btnColor={COLORS.primary}
          textColor="white"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          navigation={navigation}
        />

        <HeaderButton
          name="Seller"
          text="Vendedor"
          btnColor="white"
          textColor={COLORS.primary}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          navigation={navigation}

        />

      </View>
      
    </View>

  );
}

const HeaderButton = (props) => {
  const route = useRoute();
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(props.name);
  };

  const isActive = route.name === props.name;

  return (
    <TouchableOpacity
      style={{
        backgroundColor: isActive ? COLORS.primary : "white",
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 30,
      }}
      onPress={handlePress}
    >
      <Text
        style={{
          color: isActive ? "white" : COLORS.primary,
          fontSize: 15,
          fontWeight: "900",
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};
