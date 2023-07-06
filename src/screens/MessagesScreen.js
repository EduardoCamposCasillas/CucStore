import React, { useState, useContext, useEffect } from 'react'
import { io } from 'socket.io-client'
import { config } from '../config'
import { View, FlatList, SafeAreaView, Text } from 'react-native'
import { COLORS } from './../constants/index'
import { AuthContext } from './../context/AuthContext'
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
  TextSection
} from '../styles/MessageStyales'
import BottomTabs from '../components/BottomTabs'
const imageExample = require('./../../assets/images/CUCEATS_LOGO.png')

const MessagesScreen = ({ navigation }) => {
  const { userToken } = useContext(AuthContext)
  const socket = io(`${config.apiUrl}/api/usuario/chats`, {
    extraHeaders: {
      authorization: userToken
    }
  })
  const [chats, setChats] = useState(null)

  useEffect(() => {
    socket.on('connect', () => {})
    socket.on('chatRooms', (chats) => {
      setChats(chats)
    })

    return () => {
      socket.off('connect')
      socket.off('chatRooms')
    }
  }, [])

  return (
    <SafeAreaView style={chats === null ? { flex: 1, backgroundColor: COLORS.lightWhite, justifyContent: 'space-between' } : { flex: 1, backgroundColor: COLORS.lightWhite }}>

      {chats &&
      <Container>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card onPress={() => navigation.navigate('Chat', { receiverId: item.id })}>
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={imageExample} />
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
    </Container>}
    {!chats &&
    <>
      <View></View>
      <Text style={{ textAlign: 'center' }}>No cuentas con chats</Text>
    </>
    }
      <View style={{ backgroundColor: 'white' }}>
        <BottomTabs />
      </View>
    </SafeAreaView>
  )
}

export default MessagesScreen
