import React from "react";
import { View, Text } from "react-native-web";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../screens/Home';
import ProfileScreen from "../screens/ProfileScreen";
import SellerScreen from "../screens/SellerScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Seller" component={SellerScreen} />
    </Tab.Navigator>
  );
};

export default AppStack;