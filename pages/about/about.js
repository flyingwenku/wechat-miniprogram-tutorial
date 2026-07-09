// pages/about/about.js
Page({
  data: {
    theme: 'light'
  },
  onShow() {
    this.setData({ theme: getApp().globalData.theme })
  },
  onCopyEmail() {
    wx.setClipboardData({ data: 'fredwuchn@qq.com' })
  }
})
