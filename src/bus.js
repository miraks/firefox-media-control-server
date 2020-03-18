const dbus = require('dbus-native')
const emitter = require('./emitter')

const bus = dbus.sessionBus()
const service = bus.getService('org.kde.kglobalaccel')

service.getInterface('/component/mediacontrol', 'org.kde.kglobalaccel.Component', (error, intrface) => {
  if (error) throw error

  intrface.addListener('globalShortcutPressed', (_, key) => {
    emitter.emit('key', key)
  })
})
