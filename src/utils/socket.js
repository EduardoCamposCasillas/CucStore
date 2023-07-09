import { io } from 'socket.io-client'
import { config } from './../config'

/* eslint-disable no-var */
var socket
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

export function getUserChats () {
  const userChats = []
  socket.emit('getUserChats')
  socket.on('chatRooms', (chats) => {
    if (chats) {
      chats.forEach(chat => {
        const from = chat.participantes.find(participante => participante.id === userId)
        const to = chat.participantes.find(participante => participante.id !== userId)

        userChats.push({
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
    }
  })
  return userChats
}

export function joinRoom (room) {
  socket.emit('joinRoom', room)
}

export function getMessages (room) {
  const messages = []
  socket.emit('getMessages', room)
  socket.on('messages', (messagesData) => {
    messagesData.forEach(message => {
      messages.push(message)
    })
  })
  socket.on('message', (message) => {
    console.log(message)
    messages.unshift(message)
  })
  return messages
}
export function sendMessages (message) {
  socket.emit('message', message)
}
