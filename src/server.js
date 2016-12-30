import { Server as WebSocketServer } from 'ws'
import emitter from './emitter'

const host = 'localhost'
const port = 37581

const keyMap = {
  Play: 'toggle',
  Pause: 'toggle',
  Stop: 'toggle',
  Previous: 'prev',
  Next: 'next'
}

module.exports = () => {
  let currentSocket = null
  const server = new WebSocketServer({ host, port })

  emitter.on('key', (key) => {
    if (!currentSocket) return
    const message = { command: keyMap[key] }
    currentSocket.send(JSON.stringify(message))
  })

  server.on('connection', (socket) => {
    if (currentSocket) currentSocket.close()

    currentSocket = socket

    socket.on('close', () => {
      if (currentSocket === socket) currentSocket = null
    })
  })
}
