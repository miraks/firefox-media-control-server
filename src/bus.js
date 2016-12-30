import dbus from 'dbus-native'
import emitter from './emitter'

module.exports = () => {
  const bus = dbus.sessionBus()
  const service = bus.getService('org.gnome.SettingsDaemon')

  service.getInterface('/org/gnome/SettingsDaemon/MediaKeys', 'org.gnome.SettingsDaemon.MediaKeys', (error, intrface) => {
    if (error) throw error

    intrface.GrabMediaPlayerKeys('firefox-media-control', 0)
    intrface.addListener('MediaPlayerKeyPressed', (app, key) => {
      emitter.emit('key', key)
    })
  })
}
