import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS } from '../constants';
import { Divider } from 'react-native-elements';
import BottomTabs from '../components/BottomTabs';
import { AuthContext } from '../context/AuthContext';




const ProfileScreen = () => {
  const { logout } = useContext(AuthContext);
  const onLogoutPress = () => {
    logout();
  };
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
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{
          flex: 1,
          padding: 15,
        }}>
          <TouchableOpacity onPress={onLogoutPress}>
              <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Divider width={1} />
      <View style={{ backgroundColor: "white" }}>
        <BottomTabs />
      </View>

    </SafeAreaView>
  );
}

export default ProfileScreen;