import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from './../constants/index';
import { useNavigation, useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';

export default function HeaderTabs({ handleSwipe, isActive }) {
  return (
    <View style={{ flexDirection: 'row', alignSelf: 'center', paddingTop: 10 }}>
      <HeaderButton
        name="Home"
        text="Comprador"
        btnColor={COLORS.primary}
        textColor="white"
        isActive={isActive === 0}
      />

      <HeaderButton
        name="Seller"
        text="Vendedor"
        btnColor="white"
        textColor={COLORS.primary}
        isActive={isActive === 1}
       
      />
    </View>
  );
}

const HeaderButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: props.isActive ? COLORS.primary : 'white',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 30,
      }}
    >
      <Text
        style={{
          color: props.isActive ? 'white' : COLORS.primary,
          fontSize: 15,
          fontWeight: '900',
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};
