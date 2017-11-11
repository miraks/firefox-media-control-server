const emitter = require('./emitter')

const keyMap = {
  Play: 'toggle',
  Pause: 'toggle',
  Stop: 'toggle',
  Previous: 'prev',
  Next: 'next'
}

const write = (message) => {
  const data = JSON.stringify(message)
  const length = Buffer.from(new Uint32Array([data.length]).buffer)
  process.stdout.write(length)
  process.stdout.write(data)
}

emitter.on('key', (key) => {
  const message = { command: keyMap[key] }
  write(message)
})
