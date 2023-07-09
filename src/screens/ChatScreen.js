import React, { useState, useCallback, useEffect, useContext } from 'react'
import { View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import { COLORS } from './../constants/index'
import { AuthContext } from '../context/AuthContext'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { io } from 'socket.io-client'
import { config } from '../config'

const ChatScreen = () => {
  const { idUsuario } = useRoute().params
  const [messages, setMessages] = useState(null)
  const { userToken } = useContext(AuthContext)
  const socket = io(`${config.apiUrl}/api/usuario/chats/chat`, {
    extraHeaders: {
      authorization: userToken,
      userToChat: idUsuario
    }
  })

  useEffect(() => {
    socket.on('connect', () => { console.log('Socket ID:' + socket.id) })
    socket.on('chat', (messages) => {
      setMessages(messages.reverse())
    })

    socket.on('receiveMsg', (data) => {
      console.log('data')
    })
    return () => {
      socket.off('connect')
      socket.off('chat')
    }
  }, [])

  const onSend = useCallback((messages = []) => {
    socket.emit('sendMsg', messages)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
          name='send-circle'
          size={32}
          color={COLORS.primary}
          style={{ marginBottom: 5, marginRight: 5 }}
          />
        </View>
      </Send>
    )
  }

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: COLORS.tertiary
          },
          left: {
            backgroundColor: COLORS.primary
          }
        }}
        textStyle={{
          left: {
            color: COLORS.white
          },
          right: {
            color: COLORS.white
          }
        }}
        timeTextStyle={{
          left: {
            color: COLORS.white
          }
        }}

      />
    )
  }

  const scrollToBottomComponent = () => {
    return (
      <FontAwesome name="angle-double-down" size={22} color={COLORS.primary} />
    )
  }

  return (
    <>
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: userToken
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
    </>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// })

export default ChatScreen
