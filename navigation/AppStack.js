import React from 'react';
import { View, Text } from "react-native-web";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from "../screens/ProfileScreen";
import SellerScreen from "../screens/SellerScreen";
import AddProductScreen from "../screens/AddProductScreen";
import EditProductScreen from '../screens/EditProductScreen';
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ChatScreen from "../screens/ChatScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MessageStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Mensajes" component={MessagesScreen} />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route}) =>({
          title: route.params.userName,
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
}

const AppStack = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="ChatScreen" component={MessageStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="EditProfile" component={EditProfileScreen} />
      <Tab.Screen name="Seller" component={SellerScreen} />
      <Tab.Screen name="AddProduct" component={AddProductScreen} />
      <Tab.Screen name="EditProduct" component={EditProductScreen} />
      <Tab.Screen name="DetailsProduct" component={ProductDetailsScreen} />
    </Tab.Navigator>
  );
};

export default AppStack;