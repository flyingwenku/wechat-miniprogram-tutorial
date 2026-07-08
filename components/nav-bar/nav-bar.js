// components/nav-bar/nav-bar.js
Component({
  properties: {
    title: { type: String, value: '' },
    showBack: { type: Boolean, value: false },
    bgColor: { type: String, value: '#ffffff' },
    textColor: { type: String, value: '#1a1a1a' }
  },

  data: {
    statusBarHeight: 0,
    navBarHeight: 0,
    menuButtonWidth: 0
  },

  lifetimes: {
    attached() {
      const app = getApp()
      this.setData({
        statusBarHeight: app.globalData.statusBarHeight,
        navBarHeight: app.globalData.navBarHeight,
        menuButtonWidth: app.globalData.menuButton ? app.globalData.menuButton.width : 87
      })
    }
  },

  methods: {
    onBack() {
      const pages = getCurrentPages()
      if (pages.length > 1) {
        wx.navigateBack()
      } else {
        wx.switchTab({ url: '/pages/index/index' })
      }
    }
  }
})
