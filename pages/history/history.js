// pages/history/history.js
const util = require('../../utils/util.js')

Page({
  data: {
    historyList: [],
    theme: 'light'
  },

  onShow() {
    this.setData({ theme: getApp().globalData.theme })
    this.loadHistory()
  },

  loadHistory() {
    const app = getApp()
    const list = app.globalData.history.map(h => ({
      ...h,
      timeText: util.formatTime(h.time)
    }))
    this.setData({ historyList: list })
  },

  goToDetail(e) {
    wx.navigateTo({ url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}` })
  },

  onClear() {
    wx.showModal({
      title: '提示',
      content: '确定要清空浏览历史吗？',
      success: (res) => {
        if (res.confirm) {
          getApp().clearHistory()
          this.setData({ historyList: [] })
          wx.showToast({ title: '已清空', icon: 'success' })
        }
      }
    })
  }
})
