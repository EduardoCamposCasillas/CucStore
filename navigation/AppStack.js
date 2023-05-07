import React from "react";
import { View, Text } from "react-native-web";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from "../screens/ProfileScreen";
import SellerScreen from "../screens/SellerScreen";
import AddProductScreen from "../screens/AddProductScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AddProduct = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
    </Stack.Navigator>
  );
}

const AppStack = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="EditProfile" component={EditProfileScreen} />
      <Tab.Screen name="Seller" component={SellerScreen} />
      <Tab.Screen name="AddProduct" component={AddProductScreen} />
      <Tab.Screen name="DetailsProduct" component={ProductDetailsScreen} />
    </Tab.Navigator>
  );
};

export default AppStack;