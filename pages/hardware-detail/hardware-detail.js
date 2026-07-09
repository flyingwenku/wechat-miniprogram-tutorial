// pages/hardware-detail/hardware-detail.js
const hardwareData = require('../../data/hardware.js')

Page({
  data: {
    hardware: null,
    categoryId: '',
    activeTab: 0,
    loadError: false,
    debugInfo: '',
    theme: 'light',
    hardwareMode: 'simulate'
  },

  onLoad(options) {
    console.log('[hw-detail] onLoad options:', JSON.stringify(options))
    this.findHardware(options.id)
  },

  onShow() {
    const app = getApp()
    this.setData({
      theme: app.globalData.theme,
      hardwareMode: app.getHardwareMode()
    })
  },

  findHardware(id) {
    console.log('[hw-detail] findHardware id:', id)
    if (!id) {
      this.setData({ loadError: true, debugInfo: '未传入 id 参数' })
      return
    }
    try {
      for (const cat of hardwareData.categories) {
        if (!cat.items) continue
        const hw = cat.items.find(h => h.id === id)
        if (hw) {
          console.log('[hw-detail] 找到设备能力:', hw.name, '分类:', cat.id)
          this.setData({ hardware: hw, categoryId: cat.id, loadError: false, debugInfo: '' })
          wx.setNavigationBarTitle({ title: hw.name })
          return
        }
      }
      console.error('[hw-detail] 未找到设备能力 id:', id)
      this.setData({ loadError: true, debugInfo: '未找到 id=' + id })
    } catch (err) {
      console.error('[hw-detail] findHardware 异常:', err)
      this.setData({ loadError: true, debugInfo: String(err) })
    }
  },

  onTabChange(e) {
    this.setData({ activeTab: Number(e.currentTarget.dataset.tab) })
  },

  onShareAppMessage() {
    const hw = this.data.hardware
    return {
      title: (hw ? hw.name : '设备能力') + ' - 小程序开发教程',
      path: '/pages/hardware-detail/hardware-detail?id=' + (hw ? hw.id : '')
    }
  },

  onRetry() {
    wx.switchTab({ url: '/pages/hardware/hardware' })
  }
})
