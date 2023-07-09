import React, { useEffect, useState } from 'react'
import { View, FlatList, SafeAreaView, Text } from 'react-native'
import { COLORS } from './../constants/index'
import { getUserChats } from '../utils/socket'
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
  const [chats, setChats] = useState(null)
  useEffect(() => {
    const chatsReturned = getUserChats()
    setChats(chatsReturned)
  }, [])

  return (
    <SafeAreaView style={chats === null || chats === undefined ? { flex: 1, backgroundColor: COLORS.lightWhite, justifyContent: 'space-between' } : { flex: 1, backgroundColor: COLORS.lightWhite }}>
      {chats
        ? <Container>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card onPress={() => navigation.navigate('Chat', { id: item.id, from: item.from, to: item.to, messages: item.messages })}>
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={imageExample} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.to.nombreMarca ?? (item.to.nombreCompleto.split(' ')[0] + ' ' + (item.to.nombreCompleto?.split(' ')[2] || item.to.nombreCompleto.split(' ')[1]))}</UserName>
                  <PostTime style={{ textAlign: 'right' }}>{item.createdAt.split(' ')[4]}</PostTime>
                </UserInfoText>
                <MessageText >{item.messages[0] || 'No cuentas con mensajes todavia'}</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
    </Container>
        : <>
      <View></View>
      <Text style={{ textAlign: 'center' }}>No cuentas con chats</Text>
        </>}

      <View style={{ backgroundColor: 'white' }}>
        <BottomTabs />
      </View>
    </SafeAreaView>
  )
}

export default MessagesScreen
