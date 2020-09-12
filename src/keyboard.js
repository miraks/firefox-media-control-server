const ioHook = require('iohook')
const emitter = require('./emitter')

const mapping = {
  65329: 'toggle',
  65300: 'toggle',
  65302: 'prev',
  65303: 'next'
}

ioHook.on('keydown', ({ rawcode }) => {
  const command = mapping[rawcode]
  if (command) emitter.emit('command', command)
})

ioHook.start()
