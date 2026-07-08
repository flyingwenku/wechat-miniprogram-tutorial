// pages/hardware/hardware.js
const hardwareData = require('../../data/hardware.js')

Page({
  data: {
    theme: 'light',
    hardwareMode: 'simulate', // simulate 模拟 / real 真机
    totalCount: 0,
    categories: []
  },

  onShow() {
    const app = getApp()
    const totalCount = hardwareData.categories.reduce((sum, cat) => sum + cat.items.length, 0)
    const simMap = { '支持': 'support', '部分': 'partial', '真机': 'device', '不支持': 'unsupported' }
    const categories = hardwareData.categories.map(cat => ({
      ...cat,
      items: cat.items.map(it => ({ ...it, simClass: simMap[it.simulator] || 'unsupported' }))
    }))
    this.setData({
      theme: app.globalData.theme,
      hardwareMode: app.getHardwareMode(),
      totalCount,
      categories
    })
  },

  // 点击硬件能力项 -> 跳转硬件详情页
  onTapItem(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/hardware-detail/hardware-detail?id=' + id })
  },

  // 跳转到控件学习 Tab
  goControl() {
    wx.switchTab({ url: '/pages/index/index' })
  },

  // 跳转到案例 Tab
  goCases() {
    wx.switchTab({ url: '/pages/case-list/case-list' })
  }
})
