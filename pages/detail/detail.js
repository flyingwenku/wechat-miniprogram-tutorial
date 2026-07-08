// pages/detail/detail.js
const controlsData = require('../../data/controls.js')

Page({
  data: {
    control: null,
    categoryId: '',
    isFavorite: false,
    theme: 'light',
    activeTab: 0
  },

  onLoad(options) {
    const id = options.id
    this.findControl(id)
  },

  onShow() {
    const app = getApp()
    this.setData({
      theme: app.globalData.theme,
      isFavorite: app.isFavorite(this.data.control ? this.data.control.id : '')
    })
  },

  findControl(id) {
    for (const cat of controlsData.categories) {
      const control = cat.controls.find(c => c.id === id)
      if (control) {
        this.setData({
          control: control,
          categoryId: cat.id
        })
        // 记录浏览历史
        getApp().addHistory({
          id: control.id,
          name: control.name,
          category: cat.id
        })
        // 设置标题
        wx.setNavigationBarTitle({ title: control.name })
        return
      }
    }
  },

  onTabChange(e) {
    this.setData({ activeTab: e.currentTarget.dataset.tab })
  },

  onFavorite() {
    const isFav = getApp().toggleFavorite(this.data.control.id)
    this.setData({ isFavorite: isFav })
    wx.vibrateShort({ type: 'light' })
    wx.showToast({
      title: isFav ? '已收藏' : '已取消',
      icon: 'none'
    })
  },

  onShareAppMessage() {
    return {
      title: `${this.data.control.name} - 控件教程`,
      path: `/pages/detail/detail?id=${this.data.control.id}`
    }
  }
})
