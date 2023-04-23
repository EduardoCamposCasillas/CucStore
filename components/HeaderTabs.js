import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Button } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { useNavigation, useRoute } from '@react-navigation/native';

import Ioniocons from "react-native-vector-icons/Ionicons";

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
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder='¿Que estás buscando?'
          />
        </View>
        <TouchableOpacity
          style={styles.btnIcon}
        >
          <Ioniocons name="search" size={25} />
        </TouchableOpacity>
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



const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
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
