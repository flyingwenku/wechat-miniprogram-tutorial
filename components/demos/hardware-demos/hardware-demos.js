// components/demos/hardware-demos/hardware-demos.js
const app = getApp()

Component({
  properties: {
    hardwareId: { type: String, value: '' },
    demo: { type: Object, value: null },
    theme: { type: String, value: 'light' },
    hardwareMode: { type: String, value: '' }
  },

  data: {
    running: false,
    sensor: { x: 0, y: 0, z: 0, direction: 0, accuracy: 0, alpha: 0, beta: 0, gamma: 0 },
    simTimer: null,
    mediaImg: '',
    scanResult: '',
    recState: 'idle',
    recDuration: 0,
    audioState: 'idle',
    audioProgress: 0,
    loc: '',
    net: '',
    wifi: ''
  },

  lifetimes: {
    attached() {
      if (!this.data.hardwareMode) {
        this.setData({ hardwareMode: app.getHardwareMode() })
      }
    },
    detached() {
      this.stopDemo()
    }
  },

  methods: {
    getMode() {
      return (this.data.hardwareMode || app.getHardwareMode() || 'simulate')
    },

    startDemo() {
      const type = this.data.demo && this.data.demo.type
      if (type === 'sensor') this.startSensor()
      else if (type === 'media') this.startMedia()
      else if (type === 'location') this.startLocation()
    },

    stopDemo() {
      const type = this.data.demo && this.data.demo.type
      if (type === 'sensor') this.stopSensor()
      else if (type === 'media') this.stopMedia()
      else if (type === 'location') this.stopLocation()
    },

    // ===== 传感器实时体验 =====
    startSensor() {
      if (this.data.running) return
      this.setData({ running: true })
      const id = this.data.hardwareId
      if (this.getMode() === 'real') {
        this.startRealSensor(id)
      } else {
        this.startSimSensor(id)
      }
    },

    stopSensor() {
      const id = this.data.hardwareId
      if (this.data.simTimer) {
        clearInterval(this.data.simTimer)
        this.setData({ simTimer: null })
      }
      this.stopRealSensor(id)
      this.setData({ running: false })
    },

    stopRealSensor(id) {
      if (id === 'gyroscope') wx.stopGyroscope()
      else if (id === 'accelerometer') wx.stopAccelerometer()
      else if (id === 'compass') wx.stopCompass()
      else if (id === 'deviceMotion') wx.stopDeviceMotionListening()
    },

    startRealSensor(id) {
      this.stopRealSensor(id) // 清旧监听，避免重复回调
      const cb = (res) => this.updateSensor(id, res)
      this._sensorCb = cb
      if (id === 'gyroscope') {
        wx.startGyroscope({ interval: 'normal' })
        wx.onGyroscopeChange(cb)
      } else if (id === 'accelerometer') {
        wx.startAccelerometer({ interval: 'normal' })
        wx.onAccelerometerChange(cb)
      } else if (id === 'compass') {
        wx.startCompass()
        wx.onCompassChange(cb)
      } else if (id === 'deviceMotion') {
        wx.startDeviceMotionListening({ interval: 'normal' })
        wx.onDeviceMotionChange(cb)
      }
    },

    updateSensor(id, res) {
      if (id === 'gyroscope' || id === 'accelerometer') {
        this.setData({ sensor: { x: +res.x.toFixed(3), y: +res.y.toFixed(3), z: +res.z.toFixed(3) } })
      } else if (id === 'compass') {
        this.setData({ sensor: { direction: +res.direction.toFixed(1), accuracy: res.accuracy } })
      } else if (id === 'deviceMotion') {
        this.setData({ sensor: { alpha: +res.alpha.toFixed(1), beta: +res.beta.toFixed(1), gamma: +res.gamma.toFixed(1) } })
      }
    },

    startSimSensor(id) {
      const base = Date.now()
      const timer = setInterval(() => {
        const t = (Date.now() - base) / 1000
        let s = {}
        if (id === 'gyroscope') {
          s = { x: +(Math.sin(t * 2) * 0.5).toFixed(3), y: +(Math.cos(t * 2) * 0.5).toFixed(3), z: +(Math.sin(t * 3) * 0.3).toFixed(3) }
        } else if (id === 'accelerometer') {
          s = { x: +(Math.sin(t * 2) * 0.4).toFixed(3), y: +(Math.cos(t * 2) * 0.4).toFixed(3), z: +(9.8 + Math.sin(t * 3) * 0.3).toFixed(3) }
        } else if (id === 'compass') {
          s = { direction: +((t * 30) % 360).toFixed(1), accuracy: 1 + Math.round(Math.abs(Math.sin(t)) * 2) }
        } else if (id === 'deviceMotion') {
          s = { alpha: +((t * 30) % 360).toFixed(1), beta: +(Math.sin(t * 2) * 30).toFixed(1), gamma: +(Math.cos(t * 2) * 30).toFixed(1) }
        }
        this.setData({ sensor: s })
      }, 120)
      this.setData({ simTimer: timer })
    },

    // ===== 影像与音频实时体验 =====
    startMedia() {
      const id = this.data.hardwareId
      if (id === 'recorder') this.setData({ recState: 'recording', recDuration: 0 })
    },

    stopMedia() {
      if (this.recTimer) { clearInterval(this.recTimer); this.recTimer = null }
      if (this.audioTimer) { clearInterval(this.audioTimer); this.audioTimer = null }
      if (this.mediaAudio) { this.mediaAudio.destroy(); this.mediaAudio = null }
      this.setData({ recState: 'idle', audioState: 'idle' })
    },

    takePhoto() {
      if (this.getMode() === 'real') {
        const ctx = wx.createCameraContext()
        ctx.takePhoto({
          quality: 'high',
          success: res => this.setData({ mediaImg: res.tempImagePath }),
          fail: () => wx.showToast({ title: '拍照失败', icon: 'none' })
        })
      } else {
        this.setData({ mediaImg: 'https://picsum.photos/300/200?random=' + Date.now() })
      }
    },

    chooseImg() {
      if (this.getMode() === 'real') {
        wx.chooseMedia({
          count: 1, mediaType: ['image'], sourceType: ['album', 'camera'],
          success: res => this.setData({ mediaImg: res.tempFiles[0].tempFilePath })
        })
      } else {
        this.setData({ mediaImg: 'https://picsum.photos/300/200?random=' + Date.now() })
      }
    },

    scan() {
      if (this.getMode() === 'real') {
        wx.scanCode({
          success: res => this.setData({ scanResult: res.result }),
          fail: () => wx.showToast({ title: '已取消', icon: 'none' })
        })
      } else {
        this.setData({ scanResult: 'https://example.com/sim-' + Math.floor(Math.random() * 1000) })
      }
    },

    startRec() {
      if (this.getMode() === 'real') {
        this.rec = wx.getRecorderManager()
        this.rec.start({ duration: 60000, format: 'mp3' })
      } else {
        this.recTimer = setInterval(() => this.setData({ recDuration: this.data.recDuration + 1 }), 1000)
      }
    },

    stopRec() {
      if (this.getMode() === 'real' && this.rec) {
        this.rec.onStop(res => {
          const a = wx.createInnerAudioContext()
          a.src = res.tempFilePath
          a.play()
        })
        this.rec.stop()
      }
      if (this.recTimer) { clearInterval(this.recTimer); this.recTimer = null }
      this.setData({ recState: 'idle' })
    },

    playAudio() {
      this.setData({ audioState: 'playing', audioProgress: 0 })
      if (this.getMode() === 'real') {
        this.mediaAudio = wx.createInnerAudioContext()
        this.mediaAudio.src = 'https://example.com/sample.mp3'
        this.mediaAudio.onTimeUpdate(() => {
          if (this.mediaAudio.duration) {
            this.setData({ audioProgress: Math.floor(this.mediaAudio.currentTime / this.mediaAudio.duration * 100) })
          }
        })
        this.mediaAudio.play()
      } else {
        this.audioTimer = setInterval(() => {
          const p = this.data.audioProgress + 5
          if (p >= 100) { clearInterval(this.audioTimer); this.audioTimer = null; this.setData({ audioProgress: 100, audioState: 'idle' }) }
          else this.setData({ audioProgress: p })
        }, 200)
      }
    },

    pauseAudio() {
      if (this.mediaAudio) this.mediaAudio.pause()
      if (this.audioTimer) { clearInterval(this.audioTimer); this.audioTimer = null }
      this.setData({ audioState: 'idle' })
    },

    playBg() {
      if (this.getMode() === 'real') {
        const bg = wx.getBackgroundAudioManager()
        bg.title = '示例音乐'
        bg.src = 'https://example.com/bg.mp3'
      } else {
        wx.showToast({ title: '模拟：已触发后台播放', icon: 'none' })
      }
    },

    // ===== 位置与网络实时体验 =====
    startLocation() {
      // 位置类为点击触发，无需持续监听
    },

    stopLocation() {
      this.setData({ loc: '', net: '', wifi: '' })
    },

    getLoc() {
      if (this.getMode() === 'real') {
        wx.getLocation({
          type: 'gcj02',
          success: res => this.setData({ loc: '经度 ' + res.longitude.toFixed(4) + '　纬度 ' + res.latitude.toFixed(4) })
        })
      } else {
        this.setData({ loc: '经度 113.3245　纬度 23.1068（模拟）' })
      }
    },

    getNet() {
      if (this.getMode() === 'real') {
        wx.getNetworkType({ success: res => this.setData({ net: res.networkType }) })
      } else {
        this.setData({ net: 'wifi（模拟）' })
      }
    },

    getWifi() {
      if (this.getMode() === 'real') {
        wx.startWifi()
        wx.getConnectedWifi({
          success: res => this.setData({ wifi: 'SSID: ' + res.wifi.SSID }),
          fail: () => wx.showToast({ title: '获取失败，请检查授权', icon: 'none' })
        })
      } else {
        const ssid = 'MockWiFi_' + Math.floor(Math.random() * 9000 + 1000)
        this.setData({ wifi: 'SSID: ' + ssid + '（模拟）' })
      }
    }
  }
})
