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
    axis: { x: 0, y: 0, z: 0 }, // 三轴进度条百分比 0-100
    simTimer: null,
    mediaImg: '',
    scanResult: '',
    recState: 'idle', // idle | recording | recorded
    recDuration: 0,
    recFile: '',
    recPlaying: false,
    recProgress: 0,
    audioState: 'idle',
    audioProgress: 0,
    bgState: 'idle', // idle | playing
    vibState: 'idle', // idle | vibrating
    loc: '',
    net: '',
    wifi: '',
    sys: '',
    battery: '',
    bright: '',
    clip: '',
    ble: '',
    fileContent: '',
    nfcState: ''
  },

  lifetimes: {
    attached() {
      this._alive = true
      if (!this.data.hardwareMode) {
        this.setData({ hardwareMode: app.getHardwareMode() })
      }
    },
    detached() {
      this._alive = false
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
      else if (type === 'device') this.startDevice()
      else if (type === 'haptic') this.startHaptic()
      else if (type === 'storage') this.startStorage()
      else if (type === 'nfc') this.startNfc()
    },

    stopDemo() {
      const type = this.data.demo && this.data.demo.type
      if (type === 'sensor') this.stopSensor()
      else if (type === 'media') this.stopMedia()
      else if (type === 'location') this.stopLocation()
      else if (type === 'device') this.stopDevice()
      else if (type === 'haptic') this.stopHaptic()
      else if (type === 'storage') this.stopStorage()
      else if (type === 'nfc') this.stopNfc()
    },

    // ===== 传感器：三轴进度条 + 指南针 + 轻微平滑 =====
    startSensor() {
      if (this.data.running) return
      this.setData({ running: true, axis: { x: 0, y: 0, z: 0 } })
      this._ema = null
      const id = this.data.hardwareId
      if (this.getMode() === 'real') this.startRealSensor(id)
      else this.startSimSensor(id)
    },

    stopSensor() {
      const id = this.data.hardwareId
      if (this.data.simTimer) { clearInterval(this.data.simTimer); this.setData({ simTimer: null }) }
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
      if (id === 'gyroscope') { wx.startGyroscope({ interval: 'normal' }); wx.onGyroscopeChange(cb) }
      else if (id === 'accelerometer') { wx.startAccelerometer({ interval: 'normal' }); wx.onAccelerometerChange(cb) }
      else if (id === 'compass') { wx.startCompass(); wx.onCompassChange(cb) }
      else if (id === 'deviceMotion') { wx.startDeviceMotionListening({ interval: 'normal' }); wx.onDeviceMotionChange(cb) }
    },

    // 将传感器数值映射为进度条百分比，并做轻微指数平滑，减少"乱跳"观感
    updateSensor(id, res) {
      const k = 0.35 // 平滑系数，越小越平滑
      const ema = this._ema || {}
      const smooth = (key, val) => {
        const prev = ema[key]
        const next = (prev === undefined) ? val : prev + (val - prev) * k
        ema[key] = next
        return next
      }
      const toPct = (v, min, max) => Math.max(0, Math.min(100, (v - min) / (max - min) * 100))
      if (id === 'gyroscope' || id === 'accelerometer') {
        const x = smooth('x', res.x), y = smooth('y', res.y), z = smooth('z', res.z)
        const min = (id === 'accelerometer') ? -20 : -5
        const max = (id === 'accelerometer') ? 20 : 5
        this.setData({
          sensor: { x: +x.toFixed(3), y: +y.toFixed(3), z: +z.toFixed(3) },
          axis: { x: +toPct(x, min, max).toFixed(1), y: +toPct(y, min, max).toFixed(1), z: +toPct(z, min, max).toFixed(1) }
        })
        this._ema = ema
      } else if (id === 'compass') {
        this.setData({ sensor: { direction: +res.direction.toFixed(1), accuracy: res.accuracy } })
      } else if (id === 'deviceMotion') {
        const alpha = smooth('alpha', res.alpha), beta = smooth('beta', res.beta), gamma = smooth('gamma', res.gamma)
        this.setData({
          sensor: { alpha: +alpha.toFixed(1), beta: +beta.toFixed(1), gamma: +gamma.toFixed(1) },
          axis: { x: +toPct(alpha, -180, 180).toFixed(1), y: +toPct(beta, -180, 180).toFixed(1), z: +toPct(gamma, -180, 180).toFixed(1) }
        })
        this._ema = ema
      }
    },

    startSimSensor(id) {
      const base = Date.now()
      const timer = setInterval(() => {
        const t = (Date.now() - base) / 1000
        let s = {}, axis = {}
        if (id === 'gyroscope') {
          s = { x: +(Math.sin(t * 2) * 0.5).toFixed(3), y: +(Math.cos(t * 2) * 0.5).toFixed(3), z: +(Math.sin(t * 3) * 0.3).toFixed(3) }
          axis = { x: 50 + Math.sin(t * 2) * 25, y: 50 + Math.cos(t * 2) * 25, z: 50 + Math.sin(t * 3) * 15 }
        } else if (id === 'accelerometer') {
          s = { x: +(Math.sin(t * 2) * 0.4).toFixed(3), y: +(Math.cos(t * 2) * 0.4).toFixed(3), z: +(9.8 + Math.sin(t * 3) * 0.3).toFixed(3) }
          axis = { x: 50 + Math.sin(t * 2) * 10, y: 50 + Math.cos(t * 2) * 10, z: 74 + Math.sin(t * 3) * 5 }
        } else if (id === 'compass') {
          s = { direction: +((t * 30) % 360).toFixed(1), accuracy: 1 + Math.round(Math.abs(Math.sin(t)) * 2) }
        } else if (id === 'deviceMotion') {
          s = { alpha: +((t * 30) % 360).toFixed(1), beta: +(Math.sin(t * 2) * 30).toFixed(1), gamma: +(Math.cos(t * 2) * 30).toFixed(1) }
          axis = { x: ((t * 30) % 360) / 3.6, y: 50 + Math.sin(t * 2) * 28, z: 50 + Math.cos(t * 2) * 28 }
        }
        if (id === 'compass') this.setData({ sensor: s })
        else this.setData({ sensor: s, axis })
      }, 120)
      this.setData({ simTimer: timer })
    },

    // ===== 影像与音频 =====
    startMedia() { /* 媒体类各子项独立触发，无需统一启动 */ },

    stopMedia() {
      if (this.recTimer) { clearInterval(this.recTimer); this.recTimer = null }
      if (this.recPlayCtx) { this.recPlayCtx.destroy(); this.recPlayCtx = null }
      if (this.audioCtx) { this.audioCtx.destroy(); this.audioCtx = null }
      if (this.bg) { try { this.bg.stop() } catch (e) {} this.bg = null }
      if (this.audioTimer) { clearInterval(this.audioTimer); this.audioTimer = null }
      if (this.rec && this.data.recState === 'recording') { try { this.rec.stop() } catch (e) {} }
      this.setData({
        recState: 'idle', recPlaying: false, recProgress: 0, recDuration: 0, recFile: '',
        audioState: 'idle', audioProgress: 0, bgState: 'idle', vibState: 'idle'
      })
    },

    takePhoto() {
      if (this.getMode() === 'real') {
        const ctx = wx.createCameraContext()
        ctx.takePhoto({ quality: 'high', success: res => this.setData({ mediaImg: res.tempImagePath }), fail: () => wx.showToast({ title: '拍照失败', icon: 'none' }) })
      } else {
        this.setData({ mediaImg: 'https://picsum.photos/300/200?random=' + Date.now() })
      }
    },

    chooseImg() {
      if (this.getMode() === 'real') {
        wx.chooseMedia({ count: 1, mediaType: ['image'], sourceType: ['album', 'camera'], success: res => this.setData({ mediaImg: res.tempFiles[0].tempFilePath }) })
      } else {
        this.setData({ mediaImg: 'https://picsum.photos/300/200?random=' + Date.now() })
      }
    },

    scan() {
      if (this.getMode() === 'real') {
        wx.scanCode({ success: res => this.setData({ scanResult: res.result }), fail: () => wx.showToast({ title: '已取消', icon: 'none' }) })
      } else {
        this.setData({ scanResult: 'https://example.com/sim-' + Math.floor(Math.random() * 1000) })
      }
    },

    // --- 录音：录 → 自动回放（形成录制+播放闭环）---
    startRec() {
      const mode = this.getMode()
      if (this.recPlayCtx) { this.recPlayCtx.destroy(); this.recPlayCtx = null }
      if (this.recTimer) { clearInterval(this.recTimer); this.recTimer = null }
      this.setData({ recState: 'recording', recDuration: 0, recFile: '', recPlaying: false, recProgress: 0 })
      if (mode === 'real') {
        if (!this.rec) this.rec = wx.getRecorderManager()
        if (!this._recBound) {
          this.rec.onStop(res => {
            if (!this._alive) return
            if (res && res.tempFilePath) this._playRecFile(res.tempFilePath)
            else wx.showToast({ title: '录音失败', icon: 'none' })
          })
          this.rec.onError(() => wx.showToast({ title: '录音出错，请检查麦克风授权', icon: 'none' }))
          this._recBound = true
        }
        this.rec.start({ duration: 60000, format: 'mp3', sampleRate: 44100, numberOfChannels: 1, encodeBitRate: 192000 })
        this.recTimer = setInterval(() => this.setData({ recDuration: this.data.recDuration + 1 }), 1000)
      } else {
        // 模拟：计时 3 秒后自动进入"已录制"状态
        this.recTimer = setInterval(() => {
          const d = this.data.recDuration + 1
          this.setData({ recDuration: d })
          if (d >= 3) this.stopRec()
        }, 1000)
      }
    },

    stopRec() {
      if (this.getMode() === 'real' && this.rec) {
        this.rec.stop() // onStop 中自动回放，给出声音反馈
      }
      if (this.recTimer) { clearInterval(this.recTimer); this.recTimer = null }
      if (this.getMode() !== 'real') {
        this.setData({ recState: 'recorded', recFile: 'sim' })
      }
    },

    _playRecFile(filePath) {
      if (!this._alive) return
      if (this.recPlayCtx) { this.recPlayCtx.destroy(); this.recPlayCtx = null }
      this.setData({ recState: 'recorded', recFile: filePath, recPlaying: true, recProgress: 0 })
      const a = wx.createInnerAudioContext()
      a.src = filePath
      a.obeyMuteSwitch = false
      a.onTimeUpdate(() => { if (a.duration) this.setData({ recProgress: Math.floor(a.currentTime / a.duration * 100) }) })
      a.onEnded(() => this.setData({ recPlaying: false, recProgress: 100 }))
      a.play()
      this.recPlayCtx = a
    },

    playRec() {
      if (this.getMode() !== 'real') {
        this.setData({ recPlaying: true, recProgress: 0 })
        if (this.recTimer) clearInterval(this.recTimer)
        this.recTimer = setInterval(() => {
          const p = this.data.recProgress + 10
          if (p >= 100) { clearInterval(this.recTimer); this.recTimer = null; this.setData({ recProgress: 100, recPlaying: false }) }
          else this.setData({ recProgress: p })
        }, 200)
        return
      }
      if (this.recFile && this.recFile !== 'sim') this._playRecFile(this.recFile)
    },

    pauseRec() {
      if (this.recPlayCtx) this.recPlayCtx.pause()
      if (this.recTimer) { clearInterval(this.recTimer); this.recTimer = null }
      this.setData({ recPlaying: false })
    },

    // 将代码包内的本地音频安全加载到用户目录，确保真机 InnerAudioContext 一定能播
    _ensureLocalAudio() {
      if (this._localAudioPath) return Promise.resolve(this._localAudioPath)
      return new Promise((resolve) => {
        const fs = wx.getFileSystemManager()
        const dest = wx.env.USER_DATA_PATH + '/sample.wav'
        fs.readFile({
          filePath: 'audio/sample.wav', // 相对代码根目录的包内文件
          success: (res) => {
            fs.writeFile({
              filePath: dest,
              data: res.data,
              success: () => { this._localAudioPath = dest; resolve(dest) },
              fail: () => resolve('audio/sample.wav')
            })
          },
          fail: () => resolve('audio/sample.wav')
        })
      })
    },

    // --- 音频播放（InnerAudioContext）：使用本地打包示例，真机必出声 ---
    async playAudio() {
      this.setData({ audioState: 'playing', audioProgress: 0 })
      if (this.getMode() === 'real') {
        if (this.audioCtx) this.audioCtx.destroy()
        const src = await this._ensureLocalAudio()
        const a = wx.createInnerAudioContext()
        a.src = src
        a.obeyMuteSwitch = false
        a.onTimeUpdate(() => { if (a.duration) this.setData({ audioProgress: Math.floor(a.currentTime / a.duration * 100) }) })
        a.onEnded(() => this.setData({ audioState: 'idle', audioProgress: 100 }))
        a.onError(() => wx.showToast({ title: '音频加载失败', icon: 'none' }))
        a.play()
        this.audioCtx = a
      } else {
        if (this.audioTimer) clearInterval(this.audioTimer)
        this.audioTimer = setInterval(() => {
          const p = this.data.audioProgress + 5
          if (p >= 100) { clearInterval(this.audioTimer); this.audioTimer = null; this.setData({ audioProgress: 100, audioState: 'idle' }) }
          else this.setData({ audioProgress: p })
        }, 150)
      }
    },

    pauseAudio() {
      if (this.audioCtx) this.audioCtx.pause()
      if (this.audioTimer) { clearInterval(this.audioTimer); this.audioTimer = null }
      this.setData({ audioState: 'idle' })
    },

    // --- 背景音频：本地示例 + 停止/关闭 ---
    async playBg() {
      if (this.getMode() === 'real') {
        const src = await this._ensureLocalAudio()
        const bg = wx.getBackgroundAudioManager()
        bg.title = '示例音乐'
        bg.singer = '小程序开发教程'
        bg.src = src
        bg.obeyMuteSwitch = false
        bg.onError(() => wx.showToast({ title: '背景音频加载失败', icon: 'none' }))
        bg.onStop(() => this.setData({ bgState: 'idle' }))
        bg.onEnded(() => this.setData({ bgState: 'idle' }))
        this.bg = bg
        this.setData({ bgState: 'playing' })
      } else {
        wx.showToast({ title: '模拟：已触发后台播放', icon: 'none' })
        this.setData({ bgState: 'playing' })
      }
    },

    stopBg() {
      if (this.getMode() === 'real' && this.bg) {
        try { this.bg.stop() } catch (e) {}
        this.bg = null
      }
      this.setData({ bgState: 'idle' })
    },

    // ===== 位置与网络 =====
    startLocation() {},
    stopLocation() { this.setData({ loc: '', net: '', wifi: '' }) },
    getLoc() {
      if (this.getMode() === 'real') {
        wx.getLocation({ type: 'gcj02', success: res => this.setData({ loc: '经度 ' + res.longitude.toFixed(4) + '　纬度 ' + res.latitude.toFixed(4) }) })
      } else { this.setData({ loc: '经度 113.3245　纬度 23.1068（模拟）' }) }
    },
    getNet() {
      if (this.getMode() === 'real') { wx.getNetworkType({ success: res => this.setData({ net: res.networkType }) }) }
      else { this.setData({ net: 'wifi（模拟）' }) }
    },
    getWifi() {
      if (this.getMode() === 'real') {
        wx.startWifi()
        wx.getConnectedWifi({ success: res => this.setData({ wifi: 'SSID: ' + res.wifi.SSID }), fail: () => wx.showToast({ title: '获取失败，请检查授权', icon: 'none' }) })
      } else { this.setData({ wifi: 'SSID: MockWiFi_' + Math.floor(Math.random() * 9000 + 1000) + '（模拟）' }) }
    },

    // ===== 设备信息 =====
    startDevice() {},
    stopDevice() { this.setData({ sys: '', battery: '', bright: '', clip: '' }) },
    getSys() {
      if (this.getMode() === 'real') {
        const d = wx.getDeviceInfo(); const w = wx.getWindowInfo()
        this.setData({ sys: d.brand + ' ' + d.model + ' / ' + d.system + ' / 屏高 ' + w.screenHeight })
      } else { this.setData({ sys: 'Apple iPhone / iOS 16 / 屏高 844（模拟）' }) }
    },
    getBattery() {
      if (this.getMode() === 'real') {
        const b = wx.getBatteryInfoSync()
        this.setData({ battery: '电量 ' + b.level + '%　' + (b.isCharging ? '充电中' : '未充电') })
      } else { this.setData({ battery: '电量 88%　未充电（模拟）' }) }
    },
    getBright() {
      if (this.getMode() === 'real') { wx.getScreenBrightness({ success: res => this.setData({ bright: '亮度 ' + res.value }) }) }
      else { this.setData({ bright: '亮度 0.5（模拟）' }) }
    },
    setBright() {
      if (this.getMode() === 'real') { wx.setScreenBrightness({ value: 0.8 }) }
      else { wx.showToast({ title: '模拟：亮度已设为 0.8', icon: 'none' }) }
    },
    setClip() {
      if (this.getMode() === 'real') { wx.setClipboardData({ data: '小程序开发教程' }) }
      else { this.setData({ clip: '已写入：小程序开发教程（模拟）' }) }
    },
    getClip() {
      if (this.getMode() === 'real') { wx.getClipboardData({ success: res => this.setData({ clip: '剪贴板: ' + res.data }) }) }
      else { this.setData({ clip: '剪贴板: 小程序开发教程（模拟）' }) }
    },

    // ===== 触感与外设 =====
    startHaptic() {},
    stopHaptic() { this.setData({ ble: '', vibState: 'idle' }) },
    vib() {
      this.setData({ vibState: 'vibrating' })
      setTimeout(() => { if (this.data.vibState === 'vibrating') this.setData({ vibState: 'idle' }) }, 700)
      if (this.getMode() === 'real') {
        // vibrateShort 过短不易察觉；失败则降级重试，最后用 vibrateLong 给明确反馈
        wx.vibrateShort({
          type: 'medium',
          fail: () => { wx.vibrateShort({ fail: () => wx.vibrateLong({ fail: () => wx.showToast({ title: '设备不支持振动', icon: 'none' }) }) }) }
        })
      } else {
        wx.showToast({ title: '模拟：触发振动', icon: 'none' })
      }
    },
    auth() {
      if (this.getMode() === 'real') {
        wx.startSoterAuthentication({ requestAuthModes: ['fingerPrint'], challenge: 'demo-challenge', success: () => wx.showToast({ title: '认证成功' }), fail: () => wx.showToast({ title: '认证失败', icon: 'none' }) })
      } else { wx.showToast({ title: '模拟：认证通过', icon: 'none' }) }
    },
    scanBle() {
      if (this.getMode() === 'real') {
        wx.openBluetoothAdapter()
        wx.startBluetoothDevicesDiscovery({ services: [] })
        wx.onBluetoothDeviceFound(res => { this.setData({ ble: '发现 ' + res.devices.length + ' 个蓝牙设备' }) })
      } else { this.setData({ ble: '发现 3 个蓝牙设备（模拟）' }) }
    },
    call() {
      if (this.getMode() === 'real') { wx.makePhoneCall({ phoneNumber: '10086' }) }
      else { wx.showToast({ title: '模拟：调起拨号 10086', icon: 'none' }) }
    },

    // ===== 本地存储 =====
    startStorage() {},
    stopStorage() { this.setData({ fileContent: '' }) },
    writeFile() {
      if (this.getMode() === 'real') {
        const fs = wx.getFileSystemManager(); const path = wx.env.USER_DATA_PATH + '/demo.txt'
        fs.writeFile({ filePath: path, data: 'Hello MiniProgram', success: () => wx.showToast({ title: '写入成功' }) })
      } else { wx.showToast({ title: '模拟：写入成功', icon: 'none' }) }
    },
    readFile() {
      if (this.getMode() === 'real') {
        const fs = wx.getFileSystemManager(); const path = wx.env.USER_DATA_PATH + '/demo.txt'
        fs.readFile({ filePath: path, encoding: 'utf8', success: res => this.setData({ fileContent: res.data }) })
      } else { this.setData({ fileContent: 'Hello MiniProgram（模拟）' }) }
    },
    saveImg() {
      if (this.getMode() === 'real') {
        wx.downloadFile({ url: 'https://example.com/sample.png', success: r => { wx.saveImageToPhotosAlbum({ filePath: r.tempFilePath }) } })
      } else { wx.showToast({ title: '模拟：已保存', icon: 'none' }) }
    },

    // ===== 近场通信 =====
    startNfc() {},
    stopNfc() { this.setData({ nfcState: '' }) },
    initNfc() {
      if (this.getMode() === 'real') {
        wx.getHCEState({ success: () => { wx.startHCE({ aid_list: ['F222222222'] }); this.setData({ nfcState: 'HCE 已启动' }) }, fail: () => wx.showToast({ title: '设备不支持', icon: 'none' }) })
      } else { this.setData({ nfcState: '模拟器不支持 NFC，需真机（部分 Android）' }) }
    }
  }
})
