import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import { COLORS } from './../constants/index'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import useMessages from './../hooks/useMessages'
import { sendMessage } from '../utils/socket'
const ChatScreen = () => {
  const { id, from, to } = useRoute().params
  const { messages } = useMessages()

  const onSend = useCallback((message) => {
    sendMessage(message)
    console.log('mensaje enviado')
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
      onSend={message => onSend(message)}
      user={{
        _id: from
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
