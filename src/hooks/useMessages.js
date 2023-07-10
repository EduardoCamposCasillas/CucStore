import { useState, useEffect } from 'react'
import { socket } from '../utils/socket'

export default function useMessages () {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.emit('getChatMessages')
    socket.on('getChatMessages', messagesData => {
      console.log(messagesData)

      setMessages(messagesData)
    })

    socket.on('newMessage', newMessage => {
      console.log(newMessage)
    })
  }, [])

  return { messages }
}
