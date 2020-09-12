const dbus = require('dbus-native')
const emitter = require('./emitter')

const bus = dbus.sessionBus()
const service = bus.getService('org.kde.kglobalaccel')

const mapping = {
  playpausemedia: 'toggle',
  previousmedia: 'prev',
  nextmedia: 'next'
}

service.getInterface('/component/mediacontrol', 'org.kde.kglobalaccel.Component', (error, intrface) => {
  if (error) throw error

  intrface.addListener('globalShortcutPressed', (_, key) => {
    const command = mapping[key]
    if (command) emitter.emit('command', command)
  })
})
