// pages/category/category.js
const controlsData = require('../../data/controls.js')

Page({
  data: {
    category: null,
    controls: [],
    theme: 'light'
  },

  onLoad(options) {
    const catId = options.id
    const category = controlsData.categories.find(c => c.id === catId)
    if (category) {
      this.setData({
        category: {
          id: category.id,
          name: category.name,
          icon: category.icon,
          color: category.color,
          description: category.description
        },
        controls: category.controls.map(c => ({
          id: c.id,
          name: c.name,
          desc: c.desc
        }))
      })
    }
  },

  onShow() {
    this.setData({ theme: getApp().globalData.theme })
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  }
})
