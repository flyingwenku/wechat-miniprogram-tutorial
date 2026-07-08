// pages/detail/detail.js
const controlsData = require('../../data/controls.js')

Page({
  data: {
    control: null,
    categoryId: '',
    isFavorite: false,
    theme: 'light',
    activeTab: 0,
    loadError: false,
    debugInfo: ''
  },

  onLoad(options) {
    console.log('[detail] onLoad options:', JSON.stringify(options))
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
    console.log('[detail] findControl id:', id)
    console.log('[detail] controlsData.categories length:', controlsData.categories ? controlsData.categories.length : 'undefined')
    if (!id) {
      console.error('[detail] 未传入控件 id')
      this.setData({ loadError: true, debugInfo: '未传入 id 参数' })
      return
    }
    try {
      for (const cat of controlsData.categories) {
        if (!cat.controls) continue
        const control = cat.controls.find(c => c.id === id)
        if (control) {
          console.log('[detail] 找到控件:', control.name, '分类:', cat.id)
          this.setData({
            control: control,
            categoryId: cat.id,
            loadError: false,
            debugInfo: ''
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
      // 未找到控件
      console.error('[detail] 未找到控件 id:', id)
      this.setData({ loadError: true, debugInfo: '未找到 id=' + id })
      this.setData({ loadError: true })
    } catch (err) {
      console.error('[detail] findControl 异常:', err)
      this.setData({ loadError: true })
    }
  },

  onTabChange(e) {
    this.setData({ activeTab: Number(e.currentTarget.dataset.tab) })
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
      title: `${this.data.control.name} - 小程序开发教程`,
      path: `/pages/detail/detail?id=${this.data.control.id}`
    }
  },

  onRetry() {
    wx.switchTab({ url: '/pages/index/index' })
  }
})
