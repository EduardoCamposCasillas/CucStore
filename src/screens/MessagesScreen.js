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
  const { userToken, userId } = useContext(AuthContext)
  const socket = io(`${config.apiUrl}/api/usuario/chats`, {
    extraHeaders: {
      authorization: userToken
    }
  })
  const [chats, setChats] = useState(null)

  useEffect(() => {
    socket.on('connect', () => {})
    socket.on('chatRooms', (chats) => {
      if (chats) {
        const parseredChats = chats.map(chat => {
          const from = chat.participantes.find(participante => participante.id === userId)
          const to = chat.participantes.find(participante => participante.id !== userId)

          return ({
            id: chat.id,
            createdAt: chat.createdAt,
            messages: chat.messages,
            from: {
              id: from.id,
              imgUrl: from.imgUrl,
              nombreCompleto: from.nombreCompleto,
              nombreMarca: from.nombreMarca || null,
              chats: from.chats
            },
            to: {
              id: to.id,
              imgUrl: to.imgUrl,
              nombreCompleto: to.nombreCompleto,
              nombreMarca: to.nombreMarca || null,
              chats: to.chats
            }
          })
        })
        setChats(parseredChats)
      } else {
        setChats(null)
      }
    })

    return () => {
      socket.off('connect')
      socket.off('chatRooms')
    }
  }, [])

  return (
    <SafeAreaView style={chats === null ? { flex: 1, backgroundColor: COLORS.lightWhite, justifyContent: 'space-between' } : { flex: 1, backgroundColor: COLORS.lightWhite }}>

      {chats
        ? <Container>
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
                  <UserName>{item.to.nombreMarca ?? (item.to.nombreCompleto?.split(' ')[0] + ' ' + (item.to.nombreCompleto?.split(' ')[2] || item.to.nombreCompleto?.split(' ')[1]))}</UserName>
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
