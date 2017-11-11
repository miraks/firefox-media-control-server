const dbus = require('dbus-native')
const emitter = require('./emitter')

const bus = dbus.sessionBus()
const service = bus.getService('org.gnome.SettingsDaemon.MediaKeys')

service.getInterface('/org/gnome/SettingsDaemon/MediaKeys', 'org.gnome.SettingsDaemon.MediaKeys', (error, intrface) => {
  if (error) throw error

  intrface.GrabMediaPlayerKeys('firefox-media-control', 0)
  intrface.addListener('MediaPlayerKeyPressed', (_, key) => {
    emitter.emit('key', key)
  })
})
