import React, { useState, useContext } from 'react';
import { View, SccrollView, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { io } from "socket.io-client";
import { AuthContext } from '../context/AuthContext';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyales';

import BottomTabs from '../components/BottomTabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { config } from '../config';
import { useEffect } from 'react';

const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/images/CUCEATS_LOGO.png'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/images/CUCEATS_LOGO.png'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/images/CUCEATS_LOGO.png'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assets/images/CUCEATS_LOGO.png'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/images/CUCEATS_LOGO.png'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

const socket = io(config.apiUrl + '/api/mensajes')

const MessagesScreen = ({ navigation }) => {
  const [messages, setMessages] = useState()
  const {userToken} = useContext(AuthContext)
  // useEffect(() => {
  //   socket.connect()

    
  //   socket.on('mensajes', (data) => {
  //     console.log(data)
  //   })
  //   return () => {
  //     console.log('desmontado');
  //     socket.disconnect()
  //   }
  // },[])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, }}>
      <Container>
        <FlatList
          data={Messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Card onPress={() => navigation.navigate('Chat', { userName: item.userName })}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={item.userImg} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.messageText}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
      <View style={{ backgroundColor: "white" }}>
        <BottomTabs />
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MessagesScreen;