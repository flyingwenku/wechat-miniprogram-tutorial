// data/hardware.js
// 硬件能力教程数据（骨架）
// simulator: 模拟器可用情况 -> 支持 / 部分 / 真机 / 不支持
// status: 开发状态 -> planned（规划中）/ ready（已完成）
const categories = [
  {
    id: 'media',
    name: '影像与音频',
    icon: '🎥',
    desc: '摄像头、相册、扫码、录音、播放等媒体硬件能力',
    items: [
      {
        id: 'camera', name: '摄像头', desc: '调用系统摄像头实时预览与拍照', simulator: '真机', status: 'ready',
        props: [
          { name: 'device-position', type: 'string', default: 'back', desc: '摄像头朝向：front(前)/back(后)' },
          { name: 'flash', type: 'string', default: 'auto', desc: '闪光灯：auto/on/off' },
          { name: 'bindscancode', type: 'event', default: '-', desc: '摄像头内扫码成功事件' },
          { name: 'binderror', type: 'event', default: '-', desc: '摄像头错误事件' }
        ],
        code: {
          wxml: `<camera class="hw-camera" device-position="back" flash="off" binderror="onCameraError"></camera>
<button bindtap="takePhoto">拍照</button>
<image wx:if="{{photo}}" src="{{photo}}" mode="widthFix" class="hw-photo"></image>`,
          js: `Page({
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: res => this.setData({ photo: res.tempImagePath })
    })
  },
  onCameraError() { wx.showToast({ title: '摄像头不可用', icon: 'none' }) }
})`
        },
        tips: [
          'camera 是原生组件，层级最高，默认覆盖在其他组件之上，需用 cover-view 覆盖。',
          '仅真机有效，模拟器无法预览画面；首次使用需用户授权摄像头。',
          '拍照通过 wx.createCameraContext().takePhoto() 获取临时文件路径。'
        ],
        demo: { type: 'media' }
      },
      {
        id: 'chooseMedia', name: '相册选择', desc: '从相册或拍摄选择图片/视频', simulator: '真机', status: 'ready',
        props: [
          { name: 'count', type: 'number', default: '9', desc: '最多可选素材数量' },
          { name: 'mediaType', type: 'array', default: "['image','video']", desc: '文件类型：image/video' },
          { name: 'sourceType', type: 'array', default: "['album','camera']", desc: '来源：相册/拍摄' },
          { name: 'sizeType', type: 'array', default: "['original','compressed']", desc: '图片尺寸' }
        ],
        code: {
          wxml: `<button bindtap="chooseImg">选择图片</button>
<image wx:if="{{img}}" src="{{img}}" mode="widthFix" class="hw-photo"></image>`,
          js: `Page({
  chooseImg() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: res => this.setData({ img: res.tempFiles[0].tempFilePath })
    })
  }
})`
        },
        tips: [
          'wx.chooseMedia 是新接口，替代已废弃的 wx.chooseImage / wx.chooseVideo。',
          '返回 res.tempFiles，每项含 tempFilePath(临时路径) 与 size/duration 等元信息。',
          '临时文件仅本次会话有效，长期保存需先 wx.saveImageToPhotosAlbum 或上传服务器。'
        ],
        demo: { type: 'media' }
      },
      {
        id: 'scanCode', name: '扫码', desc: '调起微信扫一扫识别二维码/条码', simulator: '真机', status: 'ready',
        props: [
          { name: 'onlyFromCamera', type: 'boolean', default: 'false', desc: '是否只允许相机扫码（不允许从相册选图）' },
          { name: 'scanType', type: 'array', default: "['qrCode','barCode']", desc: '扫码类型' }
        ],
        code: {
          wxml: `<button bindtap="scan">扫码</button>
<text wx:if="{{result}}" class="hw-result">结果：{{result}}</text>`,
          js: `Page({
  scan() {
    wx.scanCode({
      success: res => this.setData({ result: res.result }),
      fail: () => wx.showToast({ title: '已取消', icon: 'none' })
    })
  }
})`
        },
        tips: [
          '扫码结果在 res.result（字符串），res.scanType 表示识别的类型。',
          '需在 app.json 的 requiredPrivateInfos 声明 scanCode 才可在真机正常调用。',
          '模拟器无法调用相机扫码，需真机预览体验。'
        ],
        demo: { type: 'media' }
      },
      {
        id: 'recorder', name: '录音', desc: '使用 RecorderManager 录制并播放音频', simulator: '真机', status: 'ready',
        props: [
          { name: 'duration', type: 'number', default: '60000', desc: '录音时长上限(ms)' },
          { name: 'sampleRate', type: 'number', default: '8000', desc: '采样率' },
          { name: 'numberOfChannels', type: 'number', default: '1', desc: '声道数' },
          { name: 'encodeBitRate', type: 'number', default: '48000', desc: '编码码率' },
          { name: 'format', type: 'string', default: 'mp3', desc: '音频格式：mp3/aac/wav' }
        ],
        code: {
          wxml: `<button bindtap="startRec">开始录音</button>
<button bindtap="stopRec">停止并播放</button>`,
          js: `Page({
  onLoad() { this.rec = wx.getRecorderManager() },
  startRec() {
    this.rec.start({ duration: 60000, format: 'mp3' })
  },
  stopRec() {
    this.rec.onStop(res => {
      const audio = wx.createInnerAudioContext()
      audio.src = res.tempFilePath
      audio.play()
    })
    this.rec.stop()
  }
})`
        },
        tips: [
          '通过 wx.getRecorderManager() 获取全局录音管理器，start/stop 控制录音。',
          '录音需在真机并授权 scope.record；首次调用会弹授权框。',
          '停止后 onStop 回调返回 tempFilePath，可直接交给 innerAudioContext 播放。'
        ],
        demo: { type: 'media' }
      },
      {
        id: 'audio', name: '音频播放', desc: '使用 innerAudioContext 播放音频', simulator: '真机', status: 'ready',
        props: [
          { name: 'src', type: 'string', default: '-', desc: '音频资源地址（网络或临时路径）' },
          { name: 'autoplay', type: 'boolean', default: 'false', desc: '是否自动播放' },
          { name: 'loop', type: 'boolean', default: 'false', desc: '是否循环播放' },
          { name: 'obeyMuteSwitch', type: 'boolean', default: 'true', desc: '是否遵循静音开关' }
        ],
        code: {
          wxml: `<button bindtap="play">播放音频</button>
<button bindtap="pause">暂停</button>`,
          js: `Page({
  onLoad() {
    this.audio = wx.createInnerAudioContext()
    this.audio.src = 'https://example.com/sample.mp3' // 请替换为有效音频地址
  },
  play() { this.audio.play() },
  pause() { this.audio.pause() }
})`
        },
        tips: [
          'wx.createInnerAudioContext() 创建实例，设置 src 后调用 play() 播放。',
          '注意 obeyMuteSwitch：为 true 时静音模式下不发声，体验不符合预期可设为 false。',
          '页面卸载时建议调用 destroy() 释放资源，避免后台持续播放。'
        ],
        demo: { type: 'media' }
      },
      {
        id: 'backgroundAudio', name: '背景音频', desc: '后台播放音频（音乐类小程序）', simulator: '真机', status: 'ready',
        props: [
          { name: 'title', type: 'string', default: '-', desc: '音频标题（必填，锁屏显示）' },
          { name: 'src', type: 'string', default: '-', desc: '音频资源地址' },
          { name: 'coverImgUrl', type: 'string', default: '-', desc: '封面图地址' }
        ],
        code: {
          wxml: `<button bindtap="playBg">后台播放</button>`,
          js: `Page({
  playBg() {
    const bg = wx.getBackgroundAudioManager()
    bg.title = '示例音乐'
    bg.src = 'https://example.com/bg.mp3' // 请替换为有效音频地址
  }
})`
        },
        tips: [
          'wx.getBackgroundAudioManager() 支持退出小程序后继续播放（需配网络音频）。',
          'title 为必填项，否则 iOS 上可能无法正常后台播放。',
          '需在 app.json 配置 requiredPrivateInfos 含背景音频相关声明。'
        ],
        demo: { type: 'media' }
      }
    ]
  },
  {
    id: 'sensor',
    name: '运动传感器',
    icon: '🧭',
    desc: '陀螺仪、加速度、罗盘、设备方向等传感器',
    items: [
      {
        id: 'gyroscope', name: '陀螺仪', desc: '监听设备陀螺仪旋转角速度', simulator: '部分', status: 'ready',
        props: [
          { name: 'interval', type: 'string', default: 'normal', desc: '采样间隔：game(20ms)/ui(60ms)/normal(200ms)' },
          { name: 'onGyroscopeChange', type: 'callback', default: '-', desc: '监听陀螺仪数据变化，回调返回 {x,y,z}（角速度，单位 rad/s）' },
          { name: 'stopGyroscope', type: 'function', default: '-', desc: '停止监听并释放陀螺仪资源' }
        ],
        code: {
          wxml: `<view class="hw-readout">
  <text>x: {{gyro.x}}</text>
  <text>y: {{gyro.y}}</text>
  <text>z: {{gyro.z}}</text>
</view>
<button bindtap="startGyro">开始监听</button>
<button bindtap="stopGyro">停止</button>`,
          js: `Page({
  data: { gyro: { x: 0, y: 0, z: 0 } },
  startGyro() {
    wx.startGyroscope({ interval: 'normal' })
    wx.onGyroscopeChange(res => this.setData({ gyro: res }))
  },
  stopGyro() {
    wx.stopGyroscope()
  },
  onUnload() { wx.stopGyroscope() }
})`
        },
        tips: [
          '陀螺仪返回的是角速度（单位 rad/s），包含重力影响，需自行积分才能得到角度。',
          '示例需在真机运行以观察真实数据；开发者工具模拟器仅部分支持，可能返回 0。',
          '调用 onGyroscopeChange 后务必在 onUnload 中调用 stopGyroscope 释放监听，避免内存泄漏。'
        ],
        demo: { type: 'sensor' }
      },
      {
        id: 'accelerometer', name: '加速度计', desc: '监听设备加速度变化', simulator: '部分', status: 'ready',
        props: [
          { name: 'interval', type: 'string', default: 'normal', desc: '采样间隔：game/ui/normal' },
          { name: 'onAccelerometerChange', type: 'callback', default: '-', desc: '回调返回 {x,y,z}（重力加速度，单位 m/s²，含重力）' },
          { name: 'stopAccelerometer', type: 'function', default: '-', desc: '停止监听加速度计' }
        ],
        code: {
          wxml: `<view class="hw-readout">
  <text>x: {{acc.x}}</text>
  <text>y: {{acc.y}}</text>
  <text>z: {{acc.z}}</text>
</view>
<button bindtap="startAcc">开始监听</button>
<button bindtap="stopAcc">停止</button>`,
          js: `Page({
  data: { acc: { x: 0, y: 0, z: 0 } },
  startAcc() {
    wx.startAccelerometer({ interval: 'normal' })
    wx.onAccelerometerChange(res => this.setData({ acc: res }))
  },
  stopAcc() { wx.stopAccelerometer() },
  onUnload() { wx.stopAccelerometer() }
})`
        },
        tips: [
          '加速度计返回包含重力（约 9.8m/s²）的合加速度，静止平放时 z≈9.8。',
          '要得到「线性加速度」需减去重力分量，可借助设备方向 API 做坐标变换。',
          '模拟器部分支持，真机效果最佳；离开页面记得 stopAccelerometer。'
        ],
        demo: { type: 'sensor' }
      },
      {
        id: 'compass', name: '罗盘', desc: '获取设备方向（罗盘）', simulator: '部分', status: 'ready',
        props: [
          { name: 'onCompassChange', type: 'callback', default: '-', desc: '回调返回 {direction(0-360), accuracy}' },
          { name: 'startCompass', type: 'function', default: '-', desc: '开始监听罗盘数据' },
          { name: 'stopCompass', type: 'function', default: '-', desc: '停止监听罗盘' }
        ],
        code: {
          wxml: `<view class="hw-readout">
  <text>方向角: {{compass.direction}}°</text>
  <text>精度: {{compass.accuracy}}</text>
</view>
<button bindtap="startCompass">开始监听</button>
<button bindtap="stopCompass">停止</button>`,
          js: `Page({
  data: { compass: { direction: 0, accuracy: 0 } },
  startCompass() {
    wx.startCompass()
    wx.onCompassChange(res => this.setData({ compass: res }))
  },
  stopCompass() { wx.stopCompass() },
  onUnload() { wx.stopCompass() }
})`
        },
        tips: [
          'direction 为设备与正北方向的夹角（0-360°，顺时针），需真机校准磁场干扰。',
          'accuracy 越低越准确，金属或磁场环境会导致读数漂移。',
          'iOS 调用前需用户授权 scope.userLocation；模拟器通常返回固定值。'
        ],
        demo: { type: 'sensor' }
      },
      {
        id: 'deviceMotion', name: '设备方向', desc: '监听设备方向变化', simulator: '部分', status: 'ready',
        props: [
          { name: 'interval', type: 'string', default: 'normal', desc: '采样间隔：game/ui/normal' },
          { name: 'onDeviceMotionChange', type: 'callback', default: '-', desc: '回调返回 {alpha,beta,gamma}（设备方向角，单位 deg）' },
          { name: 'stopDeviceMotionListening', type: 'function', default: '-', desc: '停止监听设备方向' }
        ],
        code: {
          wxml: `<view class="hw-readout">
  <text>alpha: {{motion.alpha}}</text>
  <text>beta: {{motion.beta}}</text>
  <text>gamma: {{motion.gamma}}</text>
</view>
<button bindtap="startMotion">开始监听</button>
<button bindtap="stopMotion">停止</button>`,
          js: `Page({
  data: { motion: { alpha: 0, beta: 0, gamma: 0 } },
  startMotion() {
    wx.startDeviceMotionListening({ interval: 'normal' })
    wx.onDeviceMotionChange(res => this.setData({ motion: res }))
  },
  stopMotion() { wx.stopDeviceMotionListening() },
  onUnload() { wx.stopDeviceMotionListening() }
})`
        },
        tips: [
          'alpha 绕 Z 轴旋转角、beta 绕 X 轴前后倾、gamma 绕 Y 轴左右倾，单位均为度。',
          '与陀螺仪（角速度）不同，设备方向直接给出角度，更适合做体感交互。',
          '模拟器部分支持；离开页面记得 stopDeviceMotionListening 释放资源。'
        ],
        demo: { type: 'sensor' }
      }
    ]
  },
  {
    id: 'location',
    name: '位置与网络',
    icon: '📍',
    desc: '定位、网络状态、WiFi 信息',
    items: [
      { id: 'getLocation', name: '获取位置', desc: '获取当前经纬度与地址', simulator: '真机', status: 'planned' },
      { id: 'network', name: '网络状态', desc: '监听网络类型变化', simulator: '支持', status: 'planned' },
      { id: 'wifi', name: 'WiFi 信息', desc: '获取已连接 WiFi 信息', simulator: '真机', status: 'planned' }
    ]
  },
  {
    id: 'device',
    name: '设备信息',
    icon: '📱',
    desc: '系统信息、电量、屏幕亮度、剪贴板',
    items: [
      { id: 'systemInfo', name: '系统信息', desc: '获取设备/系统/微信信息', simulator: '支持', status: 'planned' },
      { id: 'battery', name: '电量', desc: '获取设备电量', simulator: '支持', status: 'planned' },
      { id: 'screenBrightness', name: '屏幕亮度', desc: '获取/设置屏幕亮度', simulator: '真机', status: 'planned' },
      { id: 'clipboard', name: '剪贴板', desc: '读写系统剪贴板', simulator: '支持', status: 'planned' }
    ]
  },
  {
    id: 'haptic',
    name: '触感与外设',
    icon: '📳',
    desc: '振动、生物识别、蓝牙、拨打电话',
    items: [
      { id: 'vibrate', name: '振动', desc: '触发设备振动反馈', simulator: '真机', status: 'planned' },
      { id: 'soter', name: '生物识别', desc: '指纹/人脸 SOTER 认证', simulator: '真机', status: 'planned' },
      { id: 'bluetooth', name: '蓝牙', desc: '低功耗蓝牙连接与通信', simulator: '真机', status: 'planned' },
      { id: 'makePhoneCall', name: '拨打电话', desc: '调起系统拨号界面', simulator: '真机', status: 'planned' }
    ]
  },
  {
    id: 'storage',
    name: '本地存储',
    icon: '💾',
    desc: '文件系统、保存媒体到相册',
    items: [
      { id: 'fileSystem', name: '文件系统', desc: '读写本地文件', simulator: '支持', status: 'planned' },
      { id: 'saveImage', name: '保存媒体', desc: '保存图片/视频到相册', simulator: '真机', status: 'planned' }
    ]
  },
  {
    id: 'nfc',
    name: '近场通信',
    icon: '📶',
    desc: 'NFC 读写（需特定机型支持）',
    items: [
      { id: 'nfc', name: 'NFC', desc: 'HCE 与 NFC 标签读写', simulator: '不支持', status: 'planned' }
    ]
  }
]

module.exports = { categories }
