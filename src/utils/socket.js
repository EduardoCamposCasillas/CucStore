import { io } from 'socket.io-client'
import { config } from './../config'

/* eslint-disable no-var */
export var socket
var userId

export function connectSocket (Id) {
  userId = Id
  socket = io(`${config.apiUrl}`, {
    extraHeaders: {
      user: Id
    }
  })
}

export function disconnectSocket () {
  socket.disconnect()
}

export function createUserChat (to) {
  socket.emit('createUserChat', { usuario: userId, to })
}

export const parseChat = ({ chat, from, to }) => {
  const chatParsered = {
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
  }
  return chatParsered
}
