// pages/favorite/favorite.js
const controlsData = require('../../data/controls.js')

Page({
  data: {
    favorites: [],
    theme: 'light'
  },

  onShow() {
    this.setData({ theme: getApp().globalData.theme })
    this.loadFavorites()
  },

  loadFavorites() {
    const app = getApp()
    const favIds = app.globalData.favorites
    const favorites = []
    controlsData.categories.forEach(cat => {
      cat.controls.forEach(c => {
        if (favIds.includes(c.id)) {
          favorites.push({
            id: c.id,
            name: c.name,
            desc: c.desc,
            categoryName: cat.name,
            categoryIcon: cat.icon
          })
        }
      })
    })
    this.setData({ favorites })
  },

  goToDetail(e) {
    wx.navigateTo({ url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}` })
  },

  onUnfavorite(e) {
    const id = e.currentTarget.dataset.id
    getApp().toggleFavorite(id)
    this.loadFavorites()
    wx.showToast({ title: '已取消收藏', icon: 'none' })
  }
})
