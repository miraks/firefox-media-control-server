const emitter = require('./emitter')

const write = (message) => {
  const data = JSON.stringify(message)
  const length = Buffer.from(new Uint32Array([data.length]).buffer)
  process.stdout.write(length)
  process.stdout.write(data)
}

emitter.on('command', (command) => {
  const message = { command }
  write(message)
})

process.stdin.on('readable', () => {
  const data = process.stdin.read(4)
  if (data === null) process.exit()
})
