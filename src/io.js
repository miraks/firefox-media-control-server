const emitter = require('./emitter')

const keyMap = {
  playpausemedia: 'toggle',
  previousmedia: 'prev',
  nextmedia: 'next'
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

process.stdin.on('readable', () => {
  const data = process.stdin.read(4)
  if (data === null) process.exit()
})
