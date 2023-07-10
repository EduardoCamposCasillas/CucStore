import { useEffect, useState, useContext } from 'react'
import { parseChat, socket } from './../utils/socket'
import { AuthContext } from './../context/AuthContext'
export default function useChats () {
  const [chats, setChats] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    socket.emit('getUserChats')
    socket.on('chatRooms', (chatsData) => {
      if (chatsData) {
        const userChats = chatsData.map(chat => {
          const from = chat.participantes.find(participante => participante.id === user.userId)
          const to = chat.participantes.find(participante => participante.id !== user.userId)
          return parseChat({ chat, from, to })
        })

        setChats(userChats)
      }
    })

    socket.on('newChat', chat => {
      const from = chat.participantes.find(participante => participante.id === user.userId)
      const to = chat.participantes.find(participante => participante.id !== user.userId)
      const parseredChat = parseChat({ chat, from, to })
      setChats(prevChats => [...prevChats, parseredChat])
    })
  }, [])
  return { chats }
}
