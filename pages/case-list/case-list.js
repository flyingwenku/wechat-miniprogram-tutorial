// pages/case-list/case-list.js
const casesData = require('../../data/cases.js')

Page({
  data: {
    cases: [],
    theme: 'light'
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    const app = getApp()
    this.setData({ theme: app.globalData.theme })
  },

  loadData() {
    const cases = casesData.cases.map(c => ({
      id: c.id,
      name: c.name,
      icon: c.icon,
      color: c.color,
      desc: c.desc,
      tags: c.tags
    }))
    this.setData({ cases })
  },

  goToCaseDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/case-detail/case-detail?id=' + id })
  }
})
