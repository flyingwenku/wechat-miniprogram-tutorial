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
      { id: 'camera', name: '摄像头', desc: '调用系统摄像头实时预览与拍照', simulator: '真机', status: 'planned' },
      { id: 'chooseMedia', name: '相册选择', desc: '从相册或拍摄选择图片/视频', simulator: '真机', status: 'planned' },
      { id: 'scanCode', name: '扫码', desc: '调起微信扫一扫识别二维码/条码', simulator: '真机', status: 'planned' },
      { id: 'recorder', name: '录音', desc: '使用 RecorderManager 录制并播放音频', simulator: '真机', status: 'planned' },
      { id: 'audio', name: '音频播放', desc: '使用 innerAudioContext 播放音频', simulator: '真机', status: 'planned' },
      { id: 'backgroundAudio', name: '背景音频', desc: '后台播放音频（音乐类小程序）', simulator: '真机', status: 'planned' }
    ]
  },
  {
    id: 'sensor',
    name: '运动传感器',
    icon: '🧭',
    desc: '陀螺仪、加速度、罗盘、设备方向等传感器',
    items: [
      { id: 'gyroscope', name: '陀螺仪', desc: '监听设备陀螺仪旋转角速度', simulator: '部分', status: 'planned' },
      { id: 'accelerometer', name: '加速度计', desc: '监听设备加速度变化', simulator: '部分', status: 'planned' },
      { id: 'compass', name: '罗盘', desc: '获取设备方向（罗盘）', simulator: '部分', status: 'planned' },
      { id: 'deviceMotion', name: '设备方向', desc: '监听设备方向变化', simulator: '部分', status: 'planned' }
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
