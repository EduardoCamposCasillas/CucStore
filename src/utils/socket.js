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

export function sendMessage (message) {
  socket.emit('newMessage', message)
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

export const parseMessage = (message) => {
  const messageParsered = {
    _id: message.id,
    createdAt: message.createdAt,
    text: message.texto,
    user: { _id: message.user.id, name: message.user.nombreMarca ?? message.user.nombreCompleto, avatar: message.user.imgUrl ?? 'https://placeimg.com/140/140/any' }
  }
  return messageParsered
}
