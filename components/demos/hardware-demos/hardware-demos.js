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
    simTimer: null
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
    },

    stopDemo() {
      const type = this.data.demo && this.data.demo.type
      if (type === 'sensor') this.stopSensor()
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
    }
  }
})
