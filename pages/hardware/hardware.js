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
    this.setData({
      theme: app.globalData.theme,
      hardwareMode: app.getHardwareMode(),
      totalCount,
      categories: hardwareData.categories
    })
  },

  // 点击硬件能力项（详情页后续开发，目前提示规划中）
  onTapItem(e) {
    const name = e.currentTarget.dataset.name
    wx.showToast({ title: name + ' · 开发中', icon: 'none' })
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
