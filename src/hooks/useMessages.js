import { useState, useEffect } from 'react'
import { parseMessage, socket } from './../utils/socket'

export default function useMessages ({ chatRoom, from, to }) {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.emit('getChatMessages', { chatRoom, from, to })
    socket.on('getChatMessages', messagesData => {
      const parseredMessages = messagesData.map(message => {
        return parseMessage(message)
      })
      setMessages(parseredMessages)
    })

    socket.on('newMessage', newMessage => {
      const messageParsered = parseMessage(newMessage)
      setMessages(prevMessages => [...prevMessages, messageParsered])
    })
  }, [])

  return { messages }
}
