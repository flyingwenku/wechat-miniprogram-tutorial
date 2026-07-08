// pages/profile/profile.js
const controlsData = require('../../data/controls.js')

Page({
  data: {
    theme: 'light',
    totalCount: 0,
    favCount: 0,
    historyCount: 0
  },

  onShow() {
    const app = getApp()
    const totalCount = controlsData.categories.reduce((sum, cat) => sum + cat.controls.length, 0)
    this.setData({
      theme: app.globalData.theme,
      totalCount,
      favCount: app.globalData.favorites.length,
      historyCount: app.globalData.history.length
    })
  },

  onToggleTheme() {
    const app = getApp()
    const theme = app.toggleTheme()
    this.setData({ theme })
    wx.showToast({
      title: theme === 'dark' ? '深色模式' : '浅色模式',
      icon: 'none'
    })
  },

  goToFavorite() {
    wx.switchTab({ url: '/pages/favorite/favorite' })
  },

  goToHistory() {
    wx.navigateTo({ url: '/pages/history/history' })
  },

  goToAbout() {
    wx.navigateTo({ url: '/pages/about/about' })
  },

  onClearData() {
    wx.showModal({
      title: '清除数据',
      content: '确定要清除所有收藏和浏览历史吗？',
      confirmColor: '#FF3B30',
      success: (res) => {
        if (res.confirm) {
          const app = getApp()
          app.globalData.favorites = []
          app.clearHistory()
          wx.removeStorageSync('favorites')
          this.setData({ favCount: 0, historyCount: 0 })
          wx.showToast({ title: '已清除', icon: 'success' })
        }
      }
    })
  }
})
