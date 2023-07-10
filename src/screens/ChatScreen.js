import React, { useCallback, useContext } from 'react'
import { View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import { COLORS } from './../constants/index'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import useMessages from './../hooks/useMessages'
import { sendMessage } from '../utils/socket'
import { AuthContext } from '../context/AuthContext'
const ChatScreen = () => {
  const { user } = useContext(AuthContext)
  const { id, from, to } = useRoute().params
  const { messages } = useMessages({ chatRoom: id, from: user.userId, to })

  const onSend = useCallback(([message]) => {
    const parseMessage = {
      chat: id,
      text: message.text,
      user: message.user._id
    }
    sendMessage(parseMessage)
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
      messages={messages.reverse()}
      onSend={message => onSend(message)}
      user={{
        _id: user.userId
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
