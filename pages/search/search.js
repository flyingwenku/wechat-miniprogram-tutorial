// pages/search/search.js
const controlsData = require('../../data/controls.js')

Page({
  data: {
    keyword: '',
    results: [],
    allControls: [],
    searched: false,
    theme: 'light'
  },

  onLoad() {
    const allControls = []
    controlsData.categories.forEach(cat => {
      cat.controls.forEach(c => {
        allControls.push({
          id: c.id,
          name: c.name,
          desc: c.desc,
          categoryName: cat.name,
          categoryId: cat.id,
          categoryIcon: cat.icon
        })
      })
    })
    this.setData({ allControls })
  },

  onShow() {
    this.setData({ theme: getApp().globalData.theme })
  },

  onInput(e) {
    this.setData({ keyword: e.detail.value })
    this.search()
  },

  onClear() {
    this.setData({ keyword: '', results: [], searched: false })
  },

  search() {
    const kw = this.data.keyword.trim().toLowerCase()
    if (!kw) {
      this.setData({ results: [], searched: false })
      return
    }
    const results = this.data.allControls.filter(c =>
      c.name.toLowerCase().includes(kw) ||
      c.desc.toLowerCase().includes(kw) ||
      c.categoryName.toLowerCase().includes(kw)
    )
    this.setData({ results, searched: true })
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  }
})
