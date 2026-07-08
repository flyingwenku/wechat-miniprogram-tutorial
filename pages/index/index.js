// pages/index/index.js
const controlsData = require('../../data/controls.js')

Page({
  data: {
    categories: [],
    recentList: [],
    totalCount: 0,
    theme: 'light',
    loading: true
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    const app = getApp()
    this.setData({ theme: app.globalData.theme })
    this.loadRecent()
  },

  loadData() {
    const categories = controlsData.categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      color: cat.color,
      description: cat.description,
      count: cat.controls.length
    }))
    const totalCount = controlsData.categories.reduce((sum, cat) => sum + cat.controls.length, 0)
    this.setData({ categories, totalCount, loading: false })
  },

  loadRecent() {
    const app = getApp()
    const history = app.globalData.history.slice(0, 6)
    this.setData({ recentList: history })
  },

  goToCategory(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/category/category?id=${id}` })
  },

  goToSearch() {
    wx.navigateTo({ url: '/pages/search/search' })
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/detail/detail?id=' + id })
  },

  goToQuiz() {
    wx.navigateTo({ url: '/pages/quiz/quiz' })
  }
})
